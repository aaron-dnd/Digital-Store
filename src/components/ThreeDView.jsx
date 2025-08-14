import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Environment } from "@react-three/drei";

function AnimatedSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    // Dramatic rotation
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.7;
    
    // Floating movement
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.5;
    meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.8) * 0.3;
    
    // Scale pulsing
    const scale = 2.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <Sphere ref={meshRef} args={[1, 120, 240]} scale={2.5}>
      <MeshDistortMaterial
        color="#6366f1" // Bright indigo
        attach="material"
        distort={0.8} // Maximum distortion
        speed={4} // Fast animation
        roughness={0}
        metalness={1}
        transparent
        opacity={0.95}
        emissive="#3730a3" // Strong glow
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

export default function ThreeDView() {
  useEffect(() => {
    const handleResize = () => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.margin = '0';
        canvas.style.padding = '0';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      background: '#000',
      overflow: 'hidden'
    }}>
      <Canvas
        style={{ 
          width: '100vw',
          height: '100vh',
          background: '#000',
          display: 'block',
          margin: 0,
          padding: 0,
          position: 'absolute',
          top: 0,
          left: 0
        }}
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ 
          alpha: false, 
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={['#000000']} />
        
        {/* Bright, colorful lighting */}
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
        <pointLight position={[-10, -10, 5]} intensity={1.5} color="#ec4899" />
        <spotLight 
          position={[0, 0, 10]} 
          intensity={1.5} 
          color="#10b981"
          angle={0.3}
          penumbra={0.5}
        />
        
        <AnimatedSphere />
        <Environment preset="night" />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={1.5}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
