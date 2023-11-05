import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/public/vite.svg'
import './App.css'
import LineChart, {axisLocation,type} from "./d3";

function App() {
  const [count, setCount] = useState(0)

    const [data, setData] = useState([
        {
            xStart: 20,
            xEnd: 120,
            yStart: -10,
            yEnd: -25
        },
        {
            xStart: 120,
            xEnd: 200,
            yStart: 0,
            yEnd: -30
        },
        {
            xStart: 250,
            xEnd: 300,
            yStart: -20,
            yEnd: -35
        },
        {
            xStart: 320,
            xEnd: 360,
            yStart: -20,
            yEnd: -40
        }
    ])

    const kData = [];
  for (let i = 0; i<=360;i++) {
      kData.push({
          xStart: i,
          xEnd: i,
          yStart: -6 ,
          yEnd: Math.random() * -6
      })
  }


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
          <LineChart data={kData}
                     type={type.LINE}
                     id={'kargasa'}
                     width={1000}
                     height={300}
                     margin={{ top: 40, right: 40, bottom: 5, left: 40 }}
                     xOptions={{
                         range: [0,360],
                         location: axisLocation.TOP,
                         tickSize: 14,
                         tickValues: [0,60,120,180,240,300,360]
                     }}
                     yOptions={{
                         tickSize: 14,
                         range: [0,-6],
                         location: axisLocation.LEFT,
                         tickValues: [0,-2,-4,-6]
                     }}
          />
        <LineChart data={data}
                   type={type.RECT}
                   id={'tilt'}
                   width={800}
                   height={300}
                   margin={{ top: 5, right: 40, bottom: 40, left: 40 }}
                   xOptions={{
                       range: [0,360],
                       location: axisLocation.BOTTOM,
                       tickSize: 14,
                       tickValues: [0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360],
                       hideTickLabel: [0,20,40,80,100,140,160,200,220,260,280,320,340]
                   }}
                   yOptions={{
                       tickSize: 14,
                       range: [-40,0],
                       location: axisLocation.RIGHT,
                       tickValues: [0,-20,-40]
                   }}
        />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
