import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import Logo3D from 'components/logo-3d';
import styles from './style.module.css';

const bgColor = new THREE.Color('#ffbc2f');

function Scene() {
  return (
    <div className={`${styles['scene-wrapper']}`}>
      <Canvas
        onCreated={({ gl }) => {
          gl.setClearColor(bgColor);
        }}
      >
        <Suspense fallback={null}>
          <Logo3D position={[0, -2.8, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
