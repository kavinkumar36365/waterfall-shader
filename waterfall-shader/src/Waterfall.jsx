import { shaderMaterial, useTexture } from '@react-three/drei';
import { extend,useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import waterfallVertexShader from './shaders/waterfallVertexShader.glsl'
import waterfallFragmentShader from './shaders/waterfallFragmentShader.glsl'
import { useRef } from 'react';
import noiseUrl from './assets/noiseMap.jpg';
import dudvUrl from './assets/dudvMap.png';

const WaterfallMaterial = shaderMaterial( {
    time: 0,
    tNoise: null,
    tDudv: null,
    topDarkColor: new THREE.Color(0x4e7a71),
    bottomDarkColor: new THREE.Color(0x0e7562),
    topLightColor: new THREE.Color(0xb0f7e9),
    bottomLightColor: new THREE.Color(0x14c6a5),
    foamColor: new THREE.Color(0xffffff)
  },

waterfallVertexShader,

   waterfallFragmentShader
  );

  WaterfallMaterial.fog = true;

extend({ WaterfallMaterial });

const Waterfall = () => {

    const materialRef = useRef();
    // load textures
    const noiseMap = useTexture(noiseUrl);
    const dudvMap = useTexture(dudvUrl);

    noiseMap.wrapS = noiseMap.wrapT = THREE.RepeatWrapping;
    noiseMap.minFilter = THREE.NearestFilter;
    noiseMap.magFilter = THREE.NearestFilter;
    dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;

    useFrame((state)=>{
        if(materialRef.current){
            materialRef.current.time = state.clock.elapsedTime;
        }
    })
    
    
    return (
      <>
        <mesh position={[0, 3, 0]} scale={1}>
        <cylinderGeometry args={[1, 1, 8, 16, 1, true]} />
        <waterfallMaterial
          ref={materialRef}
          attach="material"
          tNoise={noiseMap}
          tDudv={dudvMap}
        />
    </mesh>
    </>
  )
}

export default Waterfall