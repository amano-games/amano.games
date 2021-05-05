/* eslint filenames/match-exported: 0 */

import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Logo3D(props) {
  const ref = useRef();
  const { nodes } = useGLTF('/logo.gltf');

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = THREE.MathUtils.lerp(
        ref.current.rotation.z,
        state.mouse.x / 2,
        0.1
      );

      ref.current.rotation.y = 0;
    }
  });

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        geometry={nodes.eye.geometry}
        material={nodes.eye.material}
        position={[-0.05, 2.5, 0]}
      />
      <mesh
        geometry={nodes.Hand.geometry}
        material={nodes.Hand.material}
        position={[0, 2.46, 0]}
      />
      <mesh
        geometry={nodes.Pupil.geometry}
        material={nodes.Pupil.material}
        position={[0.02, 2.48, 0.04]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1.28, 1.15, 1.15]}
      />
      <mesh
        geometry={nodes.Text.geometry}
        material={nodes.Text.material}
        position={[-0.05, 2.5, 0]}
      />
    </group>
  );
}

useGLTF.preload('/logo.gltf');
