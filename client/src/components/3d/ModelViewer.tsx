
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
};

export const ModelViewer = ({ modelUrl }: { modelUrl: string }) => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model url={modelUrl} />
          <Environment preset="city" />
          <OrbitControls enablePan={false} />
        </Suspense>
        <EffectComposer>
          <Bloom luminanceThreshold={1} intensity={2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
