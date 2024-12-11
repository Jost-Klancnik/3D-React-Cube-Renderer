import React from 'react';
import { useState } from 'react';
import './App.css';

function CubePlane({point1, point2, point3, point4, color}) {
  
  let width = window.innerWidth;
  let height = window.innerHeight;
  
  let display = [0, 0, 500];
  
  const [points3D, setPoints3D] = useState([point1, point2, point3, point4]);
  const [points2D, setPoints2D] = useState(translate3DPointsTo2D(points3D));
  const [points2DString, setPoints2DString] = useState(refactorPointsToString(points2D));
  
  function translate3DPointTo2D(point) {
    let x = (width/2) + ((point[0] * display[2]) / point[2]);
    let y = (height/2) + ((point[1] * display[2]) / point[2]);
    return [x, y];
  }
  
  function translate3DPointsTo2D(points3D) {
    let newPoints2D = [];
    for (let i = 0; i < points3D.length; i++) {
      let point = points3D[i];
      let newPoint = translate3DPointTo2D(point);
      newPoints2D.push(newPoint);
    }
    return newPoints2D;
  }
  
  function refactorPointsToString(points2D) {
    let pointsString = '';
    for (let i = 0; i < points2D.length; i++) {
      pointsString += `${points2D[i][0]}px ${points2D[i][1]}px`;
        if (i < points2D.length - 1) {
          pointsString += ', ';
        }
    }
    return pointsString;
  }
  
  let style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: `${color}`,
    clipPath: `polygon(${points2DString})`
  }
  
  return (
    <div className="cube-plane" style={style}></div>
  );
}

function App() {
  return (
    <div className="App">
      <CubePlane point1={[-50,-50,800]} point2={[50,-50,800]} point3={[50,50,800]} point4={[-50,50,800]} color={"red"}/>
      <CubePlane point1={[-50,-50,900]} point2={[50,-50,900]} point3={[50,50,900]} point4={[-50,50,900]} color={"blue"}/>
    </div>
  );
}

export default App;
