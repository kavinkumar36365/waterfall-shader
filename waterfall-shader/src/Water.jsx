import * as THREE from 'three'
import { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial, useTexture } from '@react-three/drei'
import waterVertexShader from './shaders/waterVertexShader.glsl'
import waterFragmentShader from './shaders/waterFragmentShader.glsl'
import noiseUrl from './assets/noiseMap.jpg';

const WaterMaterial = shaderMaterial({
    waterColor: new THREE.Color('#14c6a5'),
    time: 0,
    tnoise: null
  },
  waterVertexShader,
  waterFragmentShader
);

extend({ WaterMaterial });

const Water = () => {
    const materialRef = useRef();

    const noiseTexture = useTexture(noiseUrl);
    noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;
    

    useFrame((state)=>{
        if(materialRef.current){
            materialRef.current.time = state.clock.elapsedTime;
        }
    })



  return (
    <mesh 
        rotation={[-Math.PI / 2, 0, 0]}
    >
        <planeGeometry args={[10,10]}/>
        <waterMaterial 
             ref={materialRef} 
             attach="material"
              tnoise={noiseTexture}
        />
    </mesh>
  )
}

export default Water