import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShapes() {
  const shapes = useRef<THREE.Group>(null);
  
  // Create movement patterns with different speeds for each shape
  const shapesData = useMemo(() => 
    Array.from({ length: 20 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: 0.2 + Math.random() * 0.3,
      speed: {
        x: Math.random() * 0.02 - 0.01,
        y: Math.random() * 0.02 - 0.01,
        z: Math.random() * 0.02 - 0.01
      },
      rotationSpeed: {
        x: Math.random() * 0.01 - 0.005,
        y: Math.random() * 0.01 - 0.005,
        z: Math.random() * 0.01 - 0.005
      },
      pulseSpeed: 0.2 + Math.random() * 0.5
    })), 
  []);
  
  useFrame(({ clock }) => {
    if (shapes.current) {
      // Group animation
      shapes.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
      shapes.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
      
      // Animate each individual shape
      shapes.current.children.forEach((shape, i) => {
        const data = shapesData[i];
        
        // Oscillating movement
        shape.position.x += Math.sin(clock.getElapsedTime() * data.pulseSpeed) * data.speed.x;
        shape.position.y += Math.cos(clock.getElapsedTime() * data.pulseSpeed) * data.speed.y;
        shape.position.z += Math.sin(clock.getElapsedTime() * data.pulseSpeed) * data.speed.z;
        
        // Keep within bounds
        if (Math.abs(shape.position.x) > 5) shape.position.x *= 0.99;
        if (Math.abs(shape.position.y) > 5) shape.position.y *= 0.99;
        if (Math.abs(shape.position.z) > 3) shape.position.z *= 0.99;
        
        // Gentle rotation
        shape.rotation.x += data.rotationSpeed.x;
        shape.rotation.y += data.rotationSpeed.y;
        shape.rotation.z += data.rotationSpeed.z;
        
        // Subtle size pulsing effect
        const pulseFactor = Math.sin(clock.getElapsedTime() * data.pulseSpeed) * 0.1 + 1;
        shape.scale.set(
          data.scale * pulseFactor,
          data.scale * pulseFactor,
          data.scale * pulseFactor
        );
      });
    }
  });

  return (
    <group ref={shapes}>
      {/* Generate multiple small shapes with varied properties */}
      {shapesData.map((data, i) => (
        <mesh
          key={i}
          position={data.position as [number, number, number]}
          rotation={data.rotation as [number, number, number]}
          scale={data.scale}
        >
          {/* Use different geometries for variety */}
          {i % 4 === 0 ? (
            <octahedronGeometry args={[1]} />
          ) : i % 4 === 1 ? (
            <tetrahedronGeometry args={[1]} />
          ) : i % 4 === 2 ? (
            <dodecahedronGeometry args={[1]} />
          ) : (
            <icosahedronGeometry args={[1]} />
          )}
          <meshStandardMaterial 
            color={i % 3 === 0 ? new THREE.Color('#8B5CF6') : i % 3 === 1 ? new THREE.Color('#0EA5E9') : new THREE.Color('#F97316')}
            wireframe={i % 5 === 0}
            transparent={true}
            opacity={0.7}
            emissive={i % 5 === 0 ? new THREE.Color('#8B5CF6').multiplyScalar(0.2) : i % 5 === 1 ? new THREE.Color('#0EA5E9').multiplyScalar(0.2) : new THREE.Color('#F97316').multiplyScalar(0.2)}
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
        {/* Add a subtle point light for extra dimension */}
        <pointLight position={[-10, -10, -5]} intensity={0.2} color="#8B5CF6" />
        <FloatingShapes />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default BackgroundAnimation;
