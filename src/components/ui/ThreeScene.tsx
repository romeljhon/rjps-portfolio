'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Stars, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows,
  KeyboardControls,
  useKeyboardControls,
  Text,
  Float,
  OrbitControls
} from '@react-three/drei'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import * as THREE from 'three'

const PROJECTS_DATA = [
  { title: 'Kazupay ERP', color: '#7c3aed', position: [-15, 1, -15] },
  { title: 'RentSnap', color: '#0ea5e9', position: [0, 1, -25] },
  { title: 'Project Flow', color: '#10b981', position: [15, 1, -15] },
  { title: 'Chrono Blog', color: '#f59e0b', position: [-25, 1, 0] },
  { title: 'FaceID Secure', color: '#ef4444', position: [25, 1, 0] },
]

// --- Player (Free Explorer) ---
function Player({ targetPosition, onStep, onClearTarget }: { targetPosition: THREE.Vector3 | null, onStep: (pos: THREE.Vector3, rot: number) => void, onClearTarget: () => void }) {
  const [ref, api] = useBox(() => ({ 
    mass: 1, 
    position: [0, 2, 10], 
    rotation: [0, 0, 0],
    fixedRotation: true,
    material: { friction: 1.5, restitution: 0 },
    args: [0.6, 1.8, 0.6]
  }))
  
  const velocity = useRef([0, 0, 0])
  const pos = useRef([0, 0, 0])
  const lastStepTime = useRef(0)
  const lastSide = useRef(true) 
  
  const [isGreeting, setIsGreeting] = React.useState(false)

  // Subscribe to state updates
  React.useEffect(() => {
    const unsubVel = api.velocity.subscribe((v) => (velocity.current = v))
    const unsubPos = api.position.subscribe((p) => (pos.current = p))
    return () => { unsubVel(); unsubPos() }
  }, [api.velocity, api.position])

  // Animation states for limbs
  const limbL = useRef<THREE.Group>(null!)
  const limbR = useRef<THREE.Group>(null!)
  const legL = useRef<THREE.Group>(null!)
  const legR = useRef<THREE.Group>(null!)
  const characterRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const speed = 50
    const movement = new THREE.Vector3()
    
    // Tap to move logic
    const isMoving = !isGreeting && targetPosition && new THREE.Vector3(pos.current[0], 0, pos.current[2]).distanceTo(new THREE.Vector3(targetPosition.x, 0, targetPosition.z)) > 1.0

    if (isGreeting) {
      // Look at camera when greeting
      const camPos = state.camera.position.clone()
      camPos.y = 0
      const charPos = new THREE.Vector3(pos.current[0], 0, pos.current[2])
      const dir = new THREE.Vector3().subVectors(camPos, charPos)
      const targetRotation = Math.atan2(dir.x, dir.z)
      const qB = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), targetRotation)
      characterRef.current.quaternion.slerp(qB, 0.1)
      
      api.velocity.set(0, velocity.current[1], 0)
    } else if (isMoving && targetPosition) {
      movement.set(targetPosition.x - pos.current[0], 0, targetPosition.z - pos.current[2])
      movement.normalize().multiplyScalar(speed)
      api.velocity.set(movement.x, velocity.current[1], movement.z)

      // Character Rotation (Look at Target)
      const targetRotation = Math.atan2(movement.x, movement.z)
      const qB = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), targetRotation)
      characterRef.current.quaternion.slerp(qB, 0.2)
      
      // Walking Animation (Faster for speed 50)
      const t = state.clock.getElapsedTime() * 15
      const swing = Math.sin(t) * 0.8
      limbL.current.rotation.x = swing
      limbR.current.rotation.x = -swing
      legL.current.rotation.x = -swing
      legR.current.rotation.x = swing
      
      // Trigger realistic alternating footsteps
      if (Math.abs(swing) > 0.75 && state.clock.getElapsedTime() - lastStepTime.current > 0.2) {
        const offset = new THREE.Vector3(lastSide.current ? -0.3 : 0.3, 0, 0)
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), targetRotation)
        
        const footPos = new THREE.Vector3(pos.current[0], 0.05, pos.current[2]).add(offset)
        onStep(footPos, targetRotation)
        
        lastSide.current = !lastSide.current
        lastStepTime.current = state.clock.getElapsedTime()
      }

      // Body Bobbing
      characterRef.current.position.y = -0.9 + Math.abs(Math.sin(t)) * 0.05
    } else {
      // Stop moving
      api.velocity.set(0, velocity.current[1], 0)
      
      // Idle Animation (Return to grounded zero)
      limbL.current.rotation.x = THREE.MathUtils.lerp(limbL.current.rotation.x, 0, 0.1)
      limbR.current.rotation.x = THREE.MathUtils.lerp(limbR.current.rotation.x, 0, 0.1)
      legL.current.rotation.x = THREE.MathUtils.lerp(legL.current.rotation.x, 0, 0.1)
      legR.current.rotation.x = THREE.MathUtils.lerp(legR.current.rotation.x, 0, 0.1)
      characterRef.current.position.y = THREE.MathUtils.lerp(characterRef.current.position.y, -0.9, 0.1)
    }

    // Update OrbitControls target
    // @ts-ignore
    const controls = state.controls as any
    if (controls) {
      controls.target.set(pos.current[0], pos.current[1], pos.current[2])
    }
  })

  const handleInteraction = (e: any) => {
    e.stopPropagation()
    setIsGreeting(true)
    onClearTarget()
    setTimeout(() => setIsGreeting(false), 5000)
  }

  return (
    <group ref={ref as any} onClick={handleInteraction}>
      {isGreeting && (
        <group position={[0, 2.5, 0]}>
          <Text
            fontSize={0.25}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
          >
            Hi! I'm Romel Jhon Salvaleon
          </Text>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[2.2, 0.6]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.6} />
          </mesh>
        </group>
      )}
      <group ref={characterRef} position={[0, -0.95, 0]}>
        {/* Torso / Shirt */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[0.6, 1, 0.4]} />
          <meshStandardMaterial color="#0072ff" /> {/* Blue Shirt */}
        </mesh>
        
        {/* Backpack */}
        <mesh position={[0, 1.2, -0.25]} castShadow>
          <boxGeometry args={[0.5, 0.7, 0.2]} />
          <meshStandardMaterial color="#5d4037" /> {/* Brown Backpack */}
        </mesh>

        {/* Head */}
        <group position={[0, 1.8, 0.05]}>
          <mesh castShadow>
            <boxGeometry args={[0.45, 0.45, 0.45]} />
            <meshStandardMaterial color="#ffdbac" /> {/* Skin Tone */}
          </mesh>
          {/* Eyes */}
          <mesh position={[0.12, 0.05, 0.22]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="white" />
          </mesh>
          <mesh position={[-0.12, 0.05, 0.22]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="white" />
          </mesh>
          {/* Cap */}
          <mesh position={[0, 0.2, 0.05]}>
            <boxGeometry args={[0.48, 0.15, 0.48]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[0, 0.15, 0.25]}>
            <boxGeometry args={[0.4, 0.05, 0.3]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>

        {/* Arms */}
        <group ref={limbL} position={[-0.45, 1.4, 0]}>
          <mesh position={[0, -0.4, 0]} castShadow>
            <boxGeometry args={[0.2, 0.8, 0.2]} />
            <meshStandardMaterial color="#ffdbac" />
          </mesh>
          {/* Sleeve */}
          <mesh position={[0, -0.15, 0]} castShadow>
            <boxGeometry args={[0.22, 0.3, 0.22]} />
            <meshStandardMaterial color="#0072ff" />
          </mesh>
        </group>
        <group ref={limbR} position={[0.45, 1.4, 0]}>
          <mesh position={[0, -0.4, 0]} castShadow>
            <boxGeometry args={[0.2, 0.8, 0.2]} />
            <meshStandardMaterial color="#ffdbac" />
          </mesh>
          {/* Sleeve */}
          <mesh position={[0, -0.15, 0]} castShadow>
            <boxGeometry args={[0.22, 0.3, 0.22]} />
            <meshStandardMaterial color="#0072ff" />
          </mesh>
        </group>

        {/* Legs (Pants + Boots) */}
        <group ref={legL} position={[-0.2, 0.6, 0]}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.25, 0.6, 0.25]} />
            <meshStandardMaterial color="#212121" /> {/* Black Pants */}
          </mesh>
          <mesh position={[0, -0.7, 0.05]} castShadow>
            <boxGeometry args={[0.28, 0.25, 0.4]} />
            <meshStandardMaterial color="#3e2723" /> {/* Brown Boots */}
          </mesh>
        </group>
        <group ref={legR} position={[0.2, 0.6, 0]}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.25, 0.6, 0.25]} />
            <meshStandardMaterial color="#212121" />
          </mesh>
          <mesh position={[0, -0.7, 0.05]} castShadow>
            <boxGeometry args={[0.28, 0.25, 0.4]} />
            <meshStandardMaterial color="#3e2723" />
          </mesh>
        </group>
      </group>
    </group>
  )
}





// --- Floor ---
// --- Floor & Terrain Details ---
function GrassTuft({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
        <meshStandardMaterial color="#2d6a4f" />
      </mesh>
      <mesh position={[0.05, 0.08, 0.05]} rotation={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[0.03, 0.15, 0.03]} />
        <meshStandardMaterial color="#40916c" />
      </mesh>
      <mesh position={[-0.05, 0.08, -0.05]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[0.03, 0.15, 0.03]} />
        <meshStandardMaterial color="#52b788" />
      </mesh>
    </group>
  )
}

function Rock({ position, scale }: { position: [number, number, number], scale: number }) {
  const [ref] = useBox(() => ({ 
    type: 'Static', 
    position, 
    args: [scale, scale * 0.6, scale],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
  }))
  return (
    <mesh ref={ref as any} castShadow receiveShadow>
      <dodecahedronGeometry args={[scale, 0]} />
      <meshStandardMaterial color="#4a4a4a" metalness={0.2} roughness={0.8} />
    </mesh>
  )
}

function Path() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
      <planeGeometry args={[10, 100]} />
      <meshStandardMaterial color="#3d2b1f" opacity={0.4} transparent roughness={1} />
    </mesh>
  )
}

function ElevationMound({ position, args }: { position: [number, number, number], args: [number, number, number] }) {
  const [ref] = useBox(() => ({ 
    type: 'Static', 
    position, 
    args: [args[0], args[1], args[2]] 
  }))
  return (
    <mesh ref={ref as any} receiveShadow castShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color="#1b4332" roughness={1} />
    </mesh>
  )
}

function ModernHouse({ position, rotation = 0 }: { position: [number, number, number], rotation?: number }) {
  const [ref] = useBox(() => ({ 
    type: 'Static', 
    position: [position[0], position[1] + 1.5, position[2]], 
    args: [6, 3, 4],
    rotation: [0, rotation, 0]
  }))

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Foundation / Deck */}
      <mesh position={[0, 0.1, 0.5]} receiveShadow>
        <boxGeometry args={[8, 0.2, 6]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      
      {/* Main Structure (White Concrete) */}
      <mesh ref={ref as any} castShadow receiveShadow>
        <boxGeometry args={[6, 3, 4]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>
      
      {/* Upper Floor (Offset for architectural look) */}
      <mesh position={[1, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 2, 4.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Large Glass Window (Front) */}
      <mesh position={[0, 1.5, 2.02]}>
        <planeGeometry args={[5, 2.2]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.4} metalness={1} roughness={0} />
      </mesh>
      
      {/* Window Frame (Top Line) */}
      <mesh position={[0, 2.6, 2.1]}>
        <boxGeometry args={[5.2, 0.1, 0.2]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Wood Accent Wall */}
      <mesh position={[-2.8, 1.5, 0]} castShadow>
        <boxGeometry args={[0.2, 3, 4.1]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      
      {/* Flat Roof Overhang */}
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[6.5, 0.15, 4.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  )
}

function Terrain() {
  const tufts = React.useMemo(() => 
    Array.from({ length: 300 }).map((_, i) => ({
      id: i,
      position: [(Math.random() - 0.5) * 120, 0, (Math.random() - 0.5) * 120] as [number, number, number]
    })), [])

  return (
    <group>
      <Path />
      {tufts.map(t => <GrassTuft key={t.id} position={t.position} />)}
      <Rock position={[12, 0.5, -12]} scale={1.5} />
      <Rock position={[-15, 0.3, 5]} scale={1} />
      <Rock position={[5, 0.2, -30]} scale={0.8} />
      <Rock position={[-25, 0.8, -25]} scale={2} />
      
      {/* Modern Villas */}
      <ModernHouse position={[20, 0, -10]} rotation={-Math.PI / 6} />
      <ModernHouse position={[-25, 0, -18]} rotation={Math.PI / 4} />
      <ModernHouse position={[40, 3, 40]} rotation={-Math.PI / 2} /> {/* On a hill */}
      
      {/* Subtle hills */}
      <ElevationMound position={[40, -1, 40]} args={[30, 4, 30]} />
      <ElevationMound position={[-45, -1.5, -40]} args={[40, 5, 40]} />
      <ElevationMound position={[50, -2, -20]} args={[20, 6, 20]} />
    </group>
  )
}

function Plane({ onTargetSet }: { onTargetSet: (p: THREE.Vector3) => void }) {
  const [ref] = useBox(() => ({ 
    type: 'Static',
    position: [0, -1, 0], 
    args: [200, 2, 200],
    material: { friction: 1 }
  }))
  return (
    <mesh 
      ref={ref as any} 
      receiveShadow 
      onClick={(e) => {
        e.stopPropagation()
        onTargetSet(e.point)
      }}
    >
      <boxGeometry args={[200, 2, 200]} />
      <meshStandardMaterial color="#1b4332" roughness={1} />
    </mesh>
  )
}

// --- Project Showcase Objects ---
function ProjectBoard({ project }: { project: typeof PROJECTS_DATA[0] }) {
  const [ref] = useBox(() => ({ 
    type: 'Static', 
    position: [project.position[0], project.position[1], project.position[2]], 
    args: [3, 2, 0.5] 
  }))

  return (
    <group>
      <mesh ref={ref as any} castShadow>
        <boxGeometry args={[3, 2, 0.5]} />
        <meshStandardMaterial color={project.color} metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Label on top of the board */}
      <Text
        position={[project.position[0], project.position[1] + 1.5, project.position[2]]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.title.toUpperCase()}
      </Text>

      {/* Floating visual indicator below/around */}
      <mesh position={[project.position[0], 0.05, project.position[2]]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[1.8, 2, 32]} />
        <meshStandardMaterial color={project.color} transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

// --- Decoration (Trees, Flowers) ---
function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 3, 8]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 4, 0]} castShadow>
        <coneGeometry args={[1.5, 3, 8]} />
        <meshStandardMaterial color="#228b22" />
      </mesh>
    </group>
  )
}

function Flower({ position, color }: { position: [number, number, number], color: string }) {
  return (
    <group position={position}>
      {/* Stem */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color="#1e5128" />
      </mesh>
      {/* Petals */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function Vegetation() {
  const trees = React.useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 80,
        0,
        (Math.random() - 0.5) * 80
      ] as [number, number, number]
    }))
  }, [])

  const flowers = React.useMemo(() => {
    const colors = ['#ff69b4', '#da70d6', '#ffd700', '#ffffff', '#ff4500']
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 90,
        0,
        (Math.random() - 0.5) * 90
      ] as [number, number, number],
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
  }, [])

  return (
    <group>
      {trees.map(t => <Tree key={t.id} position={t.position} />)}
      {flowers.map(f => <Flower key={f.id} position={f.position} color={f.color} />)}
    </group>
  )
}

// --- Fauna (Birds, Rabbits) ---
function Rabbit({ position: initialPosition }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)
  const [target, setTarget] = React.useState(new THREE.Vector3(...initialPosition))
  const waitRef = useRef(0)
  const isMoving = useRef(false)

  useFrame((state, delta) => {
    if (waitRef.current > 0) {
      waitRef.current -= delta
      return
    }

    const dist = groupRef.current.position.distanceTo(target)
    
    if (dist < 0.1) {
      // Reached target, wait 2-5 seconds
      waitRef.current = 2 + Math.random() * 3
      isMoving.current = false
      
      // Pick new target within 5 units of start
      const angle = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 4
      setTarget(new THREE.Vector3(
        initialPosition[0] + Math.cos(angle) * radius,
        0,
        initialPosition[2] + Math.sin(angle) * radius
      ))
    } else {
      // Move towards target
      isMoving.current = true
      groupRef.current.position.lerp(target, 0.02)
      groupRef.current.lookAt(target)
      
      // Simple hopping animation
      groupRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 10)) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={initialPosition}>
      {/* Body */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.6]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>
      {/* Ears */}
      <mesh position={[0.1, 0.5, 0.1]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.1]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>
      <mesh position={[-0.1, 0.5, 0.1]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.1]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>
    </group>
  )
}

function Bird({ radius, speed, height, offset }: { radius: number, speed: number, height: number, offset: number }) {
  const meshRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset
    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius
    meshRef.current.position.set(x, height + Math.sin(t * 3) * 0.5, z)
    meshRef.current.rotation.y = -t + Math.PI / 2
    
    // Flapping wings
    const wingL = meshRef.current.children[0] as THREE.Mesh
    const wingR = meshRef.current.children[1] as THREE.Mesh
    wingL.rotation.z = Math.sin(t * 10) * 0.5
    wingR.rotation.z = -Math.sin(t * 10) * 0.5
  })

  return (
    <group ref={meshRef}>
      {/* Wing Left */}
      <mesh position={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.4, 0.02, 0.2]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Wing Right */}
      <mesh position={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.4, 0.02, 0.2]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[0.15, 0.1, 0.3]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  )
}

function Fauna() {
  const rabbitPositions = React.useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 60,
        0,
        (Math.random() - 0.5) * 60
      ] as [number, number, number]
    }))
  }, [])

  return (
    <group>
      {rabbitPositions.map(r => <Rabbit key={r.id} position={r.position} />)}
      <Bird radius={20} speed={0.5} height={10} offset={0} />
      <Bird radius={30} speed={0.3} height={12} offset={2} />
    </group>
  )
}

// --- Atmosphere (Clouds) ---
function Cloud({ position: initialPosition, speed }: { position: [number, number, number], speed: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame((state, delta) => {
    groupRef.current.position.x += delta * speed
    // Loop back when far away
    if (groupRef.current.position.x > 50) groupRef.current.position.x = -50
  })

  return (
    <group ref={groupRef} position={initialPosition}>
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.6} />
      </mesh>
      <mesh position={[1, 0, 0]} castShadow>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-1, 0, 0]} castShadow>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.8, 8, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

function Atmosphere() {
  const clouds = React.useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 100,
        15 + Math.random() * 5,
        (Math.random() - 0.5) * 100
      ] as [number, number, number],
      speed: 0.1 + Math.random() * 0.3
    }))
  }, [])

  return (
    <group>
      {clouds.map(c => <Cloud key={c.id} position={c.position} speed={c.speed} />)}
    </group>
  )
}

// --- Footprints ---
function FootprintMesh({ f }: { f: { id: number, position: THREE.Vector3, rotation: number, time: number } }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const age = (Date.now() - f.time) / 1000 // age in seconds
    const opacity = Math.max(0, 0.4 - age * 0.1) // Fade over 4 seconds
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity
    }
  })

  return (
    <mesh ref={meshRef} position={f.position} rotation={[-Math.PI / 2, 0, f.rotation]}>
      <capsuleGeometry args={[0.15, 0.3, 4, 8]} />
      <meshBasicMaterial color="#0b2016" transparent opacity={0.4} />
    </mesh>
  )
}

function Footprints({ footprints }: { footprints: Array<{ id: number, position: THREE.Vector3, rotation: number, time: number }> }) {
  return (
    <>
      {footprints.map(f => (
        <FootprintMesh key={f.id} f={f} />
      ))}
    </>
  )
}

function Showcase() {
  return (
    <>
      {PROJECTS_DATA.map((p, i) => (
        <ProjectBoard key={i} project={p} />
      ))}
    </>
  )
}

// --- Main Scene ---
export function ThreeScene() {
  const [target, setTarget] = React.useState<THREE.Vector3 | null>(null)
  const [footprints, setFootprints] = React.useState<Array<{ id: number, position: THREE.Vector3, rotation: number, time: number }>>([])

  const addFootprint = React.useCallback((pos: THREE.Vector3, rot: number) => {
    setFootprints(prev => {
      const newSteps = [
        ...prev, 
        { id: Date.now() + Math.random(), position: pos, rotation: rot, time: Date.now() }
      ]
      // Keep footprints for ~10 seconds
      return newSteps.filter(s => Date.now() - s.time < 10000).slice(-40)
    })
  }, [])

  return (
    <div className="w-full h-[800px] relative rounded-3xl overflow-hidden border border-white/10 bg-black/50">
      <div className="absolute top-4 left-4 z-10 text-white/50 text-xs font-mono uppercase tracking-widest pointer-events-none">
        TAP TO MOVE: CLICK ANYWHERE ON GRASS TO WALK
      </div>
      
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[20, 20, 20]} fov={50} />
        <OrbitControls 
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 1.75} 
          enablePan={false}
          minDistance={5}
          maxDistance={80}
        />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />
        
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            <Plane onTargetSet={setTarget} />
            <Terrain />
            <Showcase />
            <Vegetation />
            <Fauna />
            <Atmosphere />
            <Player targetPosition={target} onStep={addFootprint} onClearTarget={() => setTarget(null)} />
          </Physics>

          <Footprints footprints={footprints} />
          
          <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.25} far={10} color="#000000" />
          
          {/* Destination Marker */}
          {target && (
            <mesh position={[target.x, 0.05, target.z]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.8, 1, 32]} />
              <meshBasicMaterial color="#0072ff" transparent opacity={0.5} />
            </mesh>
          )}

          <Text
            position={[0, 0.1, 12]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={1}
            color="white"
          >
            EXPLORE WORLD
          </Text>
        </Suspense>
      </Canvas>
    </div>
  )
}

