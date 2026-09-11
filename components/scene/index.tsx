import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from 'react-error-boundary';

import FakeScene from 'components/fake-scene';
import Logo3D from 'components/logo-3d';

function SceneFallback() {
  return <FakeScene />;
}

function Scene() {
  return (
    <ErrorBoundary FallbackComponent={SceneFallback}>
      <div className="c-scene">
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
