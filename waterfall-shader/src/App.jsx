import './App.css'
import { Canvas } from '@react-three/fiber'
import Waterfall from './Waterfall'
import Water from './Water'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'




function App() {
 
  
 

  return (
   <div id="canvas-container">
      <Canvas>
        <Perf />
        <OrbitControls />
        <Waterfall/>
        <Water/>
      </Canvas>
      
    </div>
  )
}

export default App
