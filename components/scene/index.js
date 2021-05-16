import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import Logo3D from 'components/logo-3d';
import styles from './style.module.css';

function Scene() {
  return (
    <div className={`${styles['scene-wrapper']}`}>
      <Canvas flat>
        <Suspense fallback={null}>
          <Logo3D position={[0, -2.5, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
