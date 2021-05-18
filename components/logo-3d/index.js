import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTimeoutFn } from 'react-use';
import { useGLTF, useAnimations } from '@react-three/drei';
/* eslint filenames/match-exported: 0 */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef, useEffect, useCallback } from 'react';

import lerp from 'lerp';

import { clamp } from 'utils/animation';

const damp = 0.2;
const limit = 0.4;
const sensibility = 0.1;

const pupilPosition = {
  x: 0.02457561157643795,
  y: 1.2606574296951294,
  z: 0.14621944725513458,
};

export default function Logo3D(props) {
  const group = useRef();
  const pupil = useRef();
  const pupilEnabled = useRef();
  const scale = [1.5, 1.5, 1.5];

  const { nodes, animations, materials } = useGLTF('/logo.gltf');
  const { actions, mixer } = useAnimations(animations, group);

  const enablePupil = useCallback(() => {
    pupilEnabled.current = true;
  });

  useTimeoutFn(enablePupil, 2300);

  const fadeToAction = useCallback((e) => {
    const { name } = e.action.getClip();
    const previousAction = e.action;
    const duration = 0.02;
    let nextAction = null;

    switch (name) {
      case 'Opening':
        previousAction.fadeOut(duration);
        nextAction = actions.Text;
        break;
      case 'Text':
        nextAction = actions.idle;
        break;
      case 'idle':
        break;
      default:
        break;
    }

    if (nextAction) {
      nextAction
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(duration)
        .play();
    }
  });

  useEffect(() => {
    actions.Opening.setLoop(THREE.LoopOnce);
    actions.Opening.clampWhenFinished = true;
    actions.Text.clampWhenFinished = true;

    actions.Text.setLoop(THREE.LoopOnce);

    mixer.addEventListener('finished', fadeToAction);

    actions.Opening.play();
  });

  const onHover = () => {
    // actions.Text.reset();
    // actions.Text.play();
  };

  useFrame((state) => {
    if (!pupilEnabled.current) return;
    const { x: mx, y: my } = state.mouse;
    const { x: px, y: py } = pupilPosition;
    const { x, y } = pupil.current.position;

    const nx = px + clamp(mx * sensibility, -limit, limit);
    const ny = py + clamp(my * sensibility, -limit, limit);

    pupil.current.position.x = lerp(x, nx, damp);
    pupil.current.position.y = lerp(y, ny, damp);
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerOver={onHover}
      scale={scale}
    >
      <primitive object={nodes.Hand_Bone} />
      <primitive object={nodes.eye_control} />
      <primitive object={nodes.Pupil_Control} ref={pupil} />
      <primitive object={nodes.a1} />
      <primitive object={nodes.m} />
      <primitive object={nodes.a2} />
      <primitive object={nodes.n} />
      <primitive object={nodes.o} />
      <primitive object={nodes.single} />
      <primitive object={nodes.text_deform_control} />
      <skinnedMesh
        geometry={nodes.eye.geometry}
        material={materials.White}
        skeleton={nodes.eye.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Hand.geometry}
        material={nodes.Hand.material}
        skeleton={nodes.Hand.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Pupil.geometry}
        material={nodes.Pupil.material}
        skeleton={nodes.Pupil.skeleton}
      />
      <skinnedMesh
        name="Text"
        geometry={nodes.Text.geometry}
        material={nodes.Text.material}
        skeleton={nodes.Text.skeleton}
        morphTargetDictionary={nodes.Text.morphTargetDictionary}
        morphTargetInfluences={nodes.Text.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload('/logo.gltf');
