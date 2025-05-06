
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShapes() {
  const shapes = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (shapes.current) {
      shapes.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
      shapes.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={shapes}>
      {/* Generate multiple small shapes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          scale={0.2 + Math.random() * 0.3}
        >
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial 
            color={i % 3 === 0 ? '#8B5CF6' : i % 3 === 1 ? '#0EA5E9' : '#F97316'} 
            wireframe={i % 5 === 0}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-70">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <FloatingShapes />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default BackgroundAnimation;
