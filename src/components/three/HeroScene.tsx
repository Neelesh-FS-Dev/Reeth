import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import type { Mesh } from 'three'
import { useInView } from '../../hooks/useInView'

/** Saffron orb that drifts and leans toward the cursor. Desktop only (gated by the parent). */
function Orb() {
  const mesh = useRef<Mesh>(null)
  useFrame((state, delta) => {
    const m = mesh.current
    if (!m) return
    m.rotation.y += delta * 0.18
    m.rotation.x += (state.pointer.y * 0.35 - m.rotation.x) * 0.05
    m.rotation.z += (-state.pointer.x * 0.25 - m.rotation.z) * 0.05
  })
  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.1, 8]} />
        <meshPhysicalMaterial color="#D9A441" roughness={0.18} metalness={0.35} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
    </Float>
  )
}

/** Lazy-loaded hero scene. Renders only while on screen (IntersectionObserver), DPR capped at 1.5. */
export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null)
  const inView = useInView(wrap)
  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={inView ? 'always' : 'never'}
        camera={{ position: [0, 0, 4.2], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} color="#F5EEE1" />
        <pointLight position={[-2, -1, 2]} intensity={0.8} color="#B4532F" />
        <Orb />
        <Sparkles count={18} scale={[3, 3, 2]} size={2.5} speed={0.25} color="#D9A441" opacity={0.7} />
      </Canvas>
    </div>
  )
}
