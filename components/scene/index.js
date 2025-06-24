import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
// eslint-disable-next-line import/no-unresolved
import { ErrorBoundary } from 'react-error-boundary';

import FakeScene from 'components/fake-scene';
import Logo3D from 'components/logo-3d';

import styles from './style.module.css';

function Scene() {
  return (
    <ErrorBoundary FallbackComponent={FakeScene}>
      <div className={`${styles['scene-wrapper']}`}>
        <Canvas flat>
          <Suspense fallback={null}>
            <Logo3D position={[0, -2.5, 0]} />
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}

export default Scene;
