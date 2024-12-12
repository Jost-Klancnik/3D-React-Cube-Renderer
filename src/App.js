import React from 'react';
import {useState} from 'react';
import './App.css';

function CubePlane({point1, point2, point3, point4, color, display, screenPosition}) {
    
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // let screenPosition = [0, 0, 500];
    
    const [points3D, setPoints3D] = useState(!display ? undefined : [point1, point2, point3, point4]);
    const [points2D, setPoints2D] = useState(!display ? undefined : translate3DPointsTo2D(points3D));
    const [points2DString, setPoints2DString] = useState(!display ? undefined : refactorPointsToString(points2D));
    
    
    // if the display prop is false it will skip everything and return a div with display set to none    
    if (!display) {
        return (
            <div className="cube-plane" style={{display: 'none'}}></div>
        );
    }
    
    
    let style = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `${color}`,
        clipPath: `polygon(${points2DString})`,
        position: 'absolute',
        top: '0',
        left: '0'
    }
    
    function translate3DPointTo2D(point) {
        let x = (width / 2) + ((point[0] * screenPosition[2]) / point[2]);
        let y = (height / 2) + ((point[1] * screenPosition[2]) / point[2]);
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
    
    
    return (
        <div className="cube-plane" style={style}></div>
    );
}

function App() {
    
    const [screenPosition, setScreenPosition] = useState([0, 0, 500]);
    const [perspectivePoint, setPerspectivePoint] = useState([0, 0, 0]);
    
    const [cubePoints, setCubePoints] = useState([60, 60, 100]);
    let size = 100;
    
    const [pts3D, setPts3D] = useState([
        [cubePoints[0]-size/2, cubePoints[1]-size/2, cubePoints[2]-size/2],
        [cubePoints[0]+size/2, cubePoints[1]-size/2, cubePoints[2]-size/2],
        [cubePoints[0]+size/2, cubePoints[1]-size/2, cubePoints[2]+size/2],
        [cubePoints[0]-size/2, cubePoints[1]-size/2, cubePoints[2]+size/2],
        [cubePoints[0]-size/2, cubePoints[1]+size/2, cubePoints[2]-size/2],
        [cubePoints[0]+size/2, cubePoints[1]+size/2, cubePoints[2]-size/2],
        [cubePoints[0]+size/2, cubePoints[1]+size/2, cubePoints[2]+size/2],
        [cubePoints[0]-size/2, cubePoints[1]+size/2, cubePoints[2]+size/2]]);
    
    const [planes, setPlanes] = useState([
        [pts3D[0], pts3D[1], pts3D[2], pts3D[3]],
        [pts3D[4], pts3D[5], pts3D[6], pts3D[7]],
        [pts3D[0], pts3D[1], pts3D[5], pts3D[4]],
        [pts3D[2], pts3D[3], pts3D[7], pts3D[6]],
        [pts3D[1], pts3D[2], pts3D[6], pts3D[5]],
        [pts3D[0], pts3D[3], pts3D[7], pts3D[4]]]);
    
    const [colors, setColors] = useState([
        'red',
        'blue',
        'green',
        'yellow',
        'orange',
        'purple']);
    
    function findDistance(point1, point2) {
        return Math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2 + (point1[2] - point2[2])**2);
    }

    function findMaxDistance(points, perspectivePoint) {
        let maxDistance = 0;
        for (let i = 0; i < points.length; i++) {
            let distance = findDistance(points[i], perspectivePoint);
            if (distance > maxDistance) {
                maxDistance = distance;
            }
        }
        return maxDistance;
    }
    
    function constructPlanesHTML(planes, colors, screenPosition, perspectivePoint, cubePoints, cubeSize) {
        let result = [];
        let maxDistance = findMaxDistance(pts3D, perspectivePoint);
        
        for (let plane of planes) {
            let display;
            
            let planeMaxDistance = findMaxDistance(plane, perspectivePoint);
            
            if (((cubePoints[0] - cubeSize/2 < perspectivePoint[0]) && (cubePoints[0] + cubeSize/2 > perspectivePoint[0])) || ((cubePoints[1] - cubeSize/2 < perspectivePoint[1]) && (cubePoints[1] + cubeSize/2 > perspectivePoint[1]))) {
                display = false;
                //TODO If the pane contains the point with the largest Z value it should be displayed
                
                
            }
            else if (planeMaxDistance === maxDistance) {
                display = false;
            }
            else {
                display = true;
            }
            
            result.push({
                point1: plane[0],
                point2: plane[1],
                point3: plane[2],
                point4: plane[3],
                color: colors[planes.indexOf(plane)],
                display: display,
                screenPosition: screenPosition
            });
        }
        
        let returnResult = result.map(plane =>
            <CubePlane
                point1={plane.point1}
                point2={plane.point2}
                point3={plane.point3}
                point4={plane.point4}
                color={plane.color}
                display={plane.display}
                screenPosition={plane.screenPosition}
            />
        );
        
        return (returnResult);
    }
    
    return (
        <div className="App">
            {constructPlanesHTML(planes, colors, screenPosition, perspectivePoint, cubePoints, size)}
        </div>
    );
}

export default App;
