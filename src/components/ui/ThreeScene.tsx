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
  OrbitControls,
  useTexture
} from '@react-three/drei'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import * as THREE from 'three'

const PROJECTS_DATA = [
  { title: 'Kazupay ERP', color: '#7c3aed', position: [-15, 1, -15], image: '/img/kazupay_erp.png' },
  { title: 'RentSnap', color: '#0ea5e9', position: [0, 1, -25], image: '/img/rentsnap.png' },
  { title: 'Project Flow', color: '#10b981', position: [15, 1, -15], image: '/img/project_flow.png' },
  { title: 'Chrono Blog', color: '#f59e0b', position: [-25, 1, 0], image: '/img/blog_nextjs.png' },
  { title: 'FaceID Secure', color: '#ef4444', position: [25, 1, 0], image: '/img/face_id_secure.png' },
]

const WORLD_SIZE = 140; // Adjust this to change land size

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
    const speed = 70
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
      <planeGeometry args={[10, WORLD_SIZE]} />
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
      {/* Foundation / Concrete Deck */}
      <mesh position={[0, 0.1, 0.5]} receiveShadow>
        <boxGeometry args={[8, 0.2, 6]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Main Structure Ground Floor */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 3, 4]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>

      {/* Door (Deep Brown Wood) */}
      <mesh position={[2, 0.9, 2.05]}>
        <boxGeometry args={[1, 1.8, 0.1]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      {/* Door Handle */}
      <mesh position={[2.4, 0.9, 2.12]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.2} />
      </mesh>

      {/* Upper Floor (Offset Cantilever) */}
      <group position={[1.5, 3.5, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4, 2, 4.2]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Accent Panel on upper floor */}
        <mesh position={[-2.05, 0, 0]}>
          <boxGeometry args={[0.1, 2, 4.2]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>

      {/* Large Front Window (Glass) */}
      <group position={[-1, 1.5, 2.02]}>
        <mesh>
          <planeGeometry args={[3.5, 2.2]} />
          <meshStandardMaterial color="#88ccff" transparent opacity={0.3} metalness={1} roughness={0} />
        </mesh>
        {/* Window Frames (Dividers) */}
        <mesh position={[0, 1.1, 0.02]}>
          <boxGeometry args={[3.6, 0.1, 0.05]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, -1.1, 0.02]}>
          <boxGeometry args={[3.6, 0.1, 0.05]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[-1.75, 0, 0.02]}>
          <boxGeometry args={[0.1, 2.2, 0.05]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[1.75, 0, 0.02]}>
          <boxGeometry args={[0.1, 2.2, 0.05]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.05, 2.2, 0.05]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>

      {/* Wood Slat Accent Wall */}
      <group position={[-2.8, 1.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.2, 3, 4.1]} />
          <meshStandardMaterial color="#5d4037" />
        </mesh>
        {/* Decorative horizontal slats */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[0.12, -1.2 + i * 0.5, 0]}>
            <boxGeometry args={[0.05, 0.1, 4.1]} />
            <meshStandardMaterial color="#3e2723" />
          </mesh>
        ))}
      </group>

      {/* Flat Modern Roof Overhang */}
      <mesh position={[1, 4.6, 0]} castShadow>
        <boxGeometry args={[6.5, 0.2, 4.8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Structural Support Column for cantilever */}
      <mesh position={[3, 1.5, -1.5]} castShadow>
        <boxGeometry args={[0.3, 3, 0.3]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Interior "Glow" (a simple emissive plane far inside) */}
      <mesh position={[-1, 1.5, 1]} rotation={[0, 0, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#fff0bd" emissive="#fff0bd" emissiveIntensity={0.2} transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

function Terrain() {
  const tufts = React.useMemo(() => {
    const items = [];
    for (let i = 0; i < 400; i++) {
      const x = (Math.random() - 0.5) * WORLD_SIZE * 0.8;
      const z = (Math.random() - 0.5) * WORLD_SIZE * 0.8;
      
      // Exclusion: Project Gallery
      if (x > -22 && x < 22 && z > -60 && z < -40) continue;
      // Exclusion: Player Path
      if (Math.abs(x) < 2 && Math.abs(z) < 50) continue;

      items.push({ id: i, position: [x, 0, z] as [number, number, number] });
    }
    return items;
  }, [])

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
    args: [WORLD_SIZE, 2, WORLD_SIZE],
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
      <boxGeometry args={[WORLD_SIZE, 2, WORLD_SIZE]} />
      <meshStandardMaterial color="#1b4332" roughness={1} />
    </mesh>
  )
}

// --- Project Showcase Objects ---
function ProjectBoard({ project, position }: { project: typeof PROJECTS_DATA[0], position: [number, number, number] }) {
  const texture = useTexture(project.image)
  const [ref] = useBox(() => ({
    type: 'Static',
    position: [position[0], position[1] + 1, position[2]],
    args: [3.5, 2, 0.2]
  }))

  return (
    <group position={position}>
      {/* The Board Frame */}
      <mesh ref={ref as any} castShadow>
        <boxGeometry args={[3.5, 2, 0.2]} />
        <meshStandardMaterial color={project.color} metalness={0.6} roughness={0.1} />
      </mesh>

      {/* The Project Image Display */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[3.3, 1.8]} />
        <meshStandardMaterial map={texture} transparent={true} emissive={project.color} emissiveIntensity={0.15} />
      </mesh>

      {/* Title Text */}
      <Text
        position={[0, 1.4, 0.15]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="black"
      >
        {project.title.toUpperCase()}
      </Text>

      {/* Focused Light for the board */}
      <pointLight position={[0, 2, 2]} intensity={1.5} color={project.color} distance={5} decay={2} />

      {/* Decorative base marker */}
      <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[1.5, 1.7, 32]} />
        <meshStandardMaterial color={project.color} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function ProjectGallery({ position }: { position: [number, number, number] }) {
  const width = 40;
  const length = 15;
  const height = 8;

  return (
    <group position={position}>
      {/* Polished Gallery Floor */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, height / 2, -length / 2]} castShadow receiveShadow>
        <boxGeometry args={[width, height, 0.5]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Side Walls */}
      <mesh position={[-width / 2, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, height, length]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[width / 2, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, height, length]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Roof with Skylights */}
      <mesh position={[0, height, 0]}>
        <boxGeometry args={[width, 0.2, length]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Projects distribution inside the hall */}
      <group position={[0, 1, -2]}>
        {PROJECTS_DATA.map((p, i) => {
          // Spread projects evenly along the length of the hall
          const xPos = - (PROJECTS_DATA.length - 1) * 3 + (i * 6);
          return <ProjectBoard key={i} project={p} position={[xPos, 0, -4]} />
        })}
      </group>

      {/* Gallery Signage */}
      <Text
        position={[0, height - 1.5, -length / 2 + 0.3]}
        fontSize={1.2}
        color="#888"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
      >
        PROJECT GALLERY
      </Text>
      
      {/* Ceiling Lights */}
      {[ -1.5, 1.5 ].map(z => (
        <group key={z} position={[0, height - 0.5, z]}>
           {[-12, -4, 4, 12].map(x => (
             <mesh key={x} position={[x, 0, 0]}>
               <sphereGeometry args={[0.3, 16, 16]} />
               <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1} />
               <pointLight intensity={2} distance={15} decay={2} />
             </mesh>
           ))}
        </group>
      ))}
    </group>
  )
}

function Showcase() {
  return (
    <group>
      <ProjectGallery position={[0, 0, -50]} />
    </group>
  )
}
// --- Decoration (Trees, Flowers) ---
function PineTree({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.25, 1.5, 8]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>
      {/* Layer 1 */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <coneGeometry args={[1.2, 2, 8]} />
        <meshStandardMaterial color="#1b4332" />
      </mesh>
      {/* Layer 2 */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[0.9, 1.5, 8]} />
        <meshStandardMaterial color="#2d6a4f" />
      </mesh>
      {/* Layer 3 */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <coneGeometry args={[0.6, 1.2, 8]} />
        <meshStandardMaterial color="#40916c" />
      </mesh>
    </group>
  )
}

function OakTree({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.45, 2.5, 8]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      {/* Main Foliage */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshStandardMaterial color="#2d6a4f" />
      </mesh>
      {/* Extra Foliage clumps */}
      <mesh position={[0.8, 3.8, 0.5]} castShadow>
        <sphereGeometry args={[1.1, 7, 7]} />
        <meshStandardMaterial color="#40916c" />
      </mesh>
      <mesh position={[-0.7, 3.5, -0.6]} castShadow>
        <sphereGeometry args={[1.3, 7, 7]} />
        <meshStandardMaterial color="#1b4332" />
      </mesh>
      <mesh position={[0, 4.2, -0.3]} castShadow>
        <sphereGeometry args={[0.9, 6, 6]} />
        <meshStandardMaterial color="#52b788" />
      </mesh>
    </group>
  )
}

function BirchTree({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Slim Trunk */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 4.5, 8]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {/* Sparse Leaf Clumps */}
      <mesh position={[0, 4.8, 0]} castShadow>
        <dodecahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial color="#95d5b2" />
      </mesh>
      <mesh position={[0.6, 5.4, 0.3]} castShadow>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#74c69d" />
      </mesh>
      <mesh position={[-0.5, 4.2, -0.4]} castShadow>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#b7e4c7" />
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
    const items = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * WORLD_SIZE * 0.85;
      const z = (Math.random() - 0.5) * WORLD_SIZE * 0.85;

      // Exclusion: Project Gallery
      if (x > -25 && x < 25 && z > -65 && z < -35) continue;
      // Exclusion: Modern Houses
      if (x > 15 && x < 25 && z > -15 && z < -5) continue;
      if (x > -30 && x < -20 && z > -23 && z < -13) continue;

      items.push({
        id: i,
        type: Math.floor(Math.random() * 3),
        position: [x, 0, z] as [number, number, number],
        scale: 0.7 + Math.random() * 0.6
      });
    }
    return items;
  }, [])

  const flowers = React.useMemo(() => {
    const colors = ['#ff69b4', '#da70d6', '#ffd700', '#ffffff', '#ff4500'];
    const items = [];
    for (let i = 0; i < 250; i++) {
      const x = (Math.random() - 0.5) * WORLD_SIZE * 0.75;
      const z = (Math.random() - 0.5) * WORLD_SIZE * 0.75;

      // Exclusion: Project Gallery & Path
      if (x > -22 && x < 22 && z > -60 && z < -40) continue;
      if (Math.abs(x) < 1.5) continue;

      items.push({
        id: i,
        position: [x, 0, z] as [number, number, number],
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    return items;
  }, [])

  return (
    <group>
      {trees.map(t => {
        const treeProps = { position: t.position, scale: t.scale };
        if (t.type === 0) return <PineTree key={t.id} {...treeProps} />
        if (t.type === 1) return <OakTree key={t.id} {...treeProps} />
        return <BirchTree key={t.id} {...treeProps} />
      })}
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
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * WORLD_SIZE * 0.4,
        0,
        (Math.random() - 0.5) * WORLD_SIZE * 0.4
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
    if (groupRef.current.position.x > WORLD_SIZE / 2) groupRef.current.position.x = -WORLD_SIZE / 2
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
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * WORLD_SIZE,
        15 + Math.random() * 5,
        (Math.random() - 0.5) * WORLD_SIZE
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

