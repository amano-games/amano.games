'use client';

import { useEffect, useState } from 'react';

import FakeScene from 'components/fake-scene';
import Scene from 'components/scene';
import usePrefersReducedMotion from 'hooks/use-prefers-reduced-motion';
import { detectWebGLContext } from 'utils/animation';

function HomeHero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const webglEnabled = detectWebGLContext();
    setCanRender(!prefersReducedMotion && webglEnabled);
  }, [prefersReducedMotion]);

  return canRender ? <Scene /> : <FakeScene />;
}

export default HomeHero;
