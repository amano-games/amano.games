import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

import Logo3D from 'components/logo-3d';
import styles from './style.module.css';

function Scene() {
  return (
    <div className={`${styles['scene-wrapper']}`}>
      <Canvas>
        <OrbitControls enableRotate enableZoom={false} enablePan={false} />
        <Suspense fallback={null}>
          <Logo3D position={[0, -2.8, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
