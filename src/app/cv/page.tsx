
'use client'
import dynamic from 'next/dynamic';

const CVDocument = dynamic(() => import('@/components/CVDocument'), { ssr: false });

export default function CVPage() {
  return <CVDocument />;
}
