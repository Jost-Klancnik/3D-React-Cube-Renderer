import React from 'react';
import {useState, useEffect, useCallback } from 'react';
import './App.css';

function CubePlane({point1, point2, point3, point4, color, display, screenPosition}) {
    
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const [points3D, setPoints3D] = useState(!display ? [] : [point1, point2, point3, point4]);
    const [points2D, setPoints2D] = useState(!display ? [] : translate3DPointsTo2D(points3D));
    const [points2DString, setPoints2DString] = useState(!display ? '' : refactorPointsToString(points2D));
    
    useEffect(() => {
        setPoints3D(!display ? [] : [point1, point2, point3, point4]);
        setPoints2D(!display ? [] : translate3DPointsTo2D(points3D));
        setPoints2DString(!display ? '' : refactorPointsToString(points2D));
    }, [ point1, point2, point3, point4, display, points3D, points2D, translate3DPointsTo2D, refactorPointsToString]);
    
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

function Slider({ setCoordinate }) {
    
    // const [value, setValue] = useState(0);
    
    function handleChange(event) {
        setCoordinate(Number(event.target.value));
    }
    
    return (
        <input className='slider' onChange={e => handleChange(e) }  type="range" min="-500" max="500" step="5" />
    );
}

function SliderHolder({ setCoodinateX, setCoodinateY, setCoodinateZ }) {
    return (
        <div className="sliderHolder">
            <div>
                <label>X:</label>
                <Slider setCoordinate={setCoodinateX}/>
            </div>
            <div>
                <label>Y:</label>
                <Slider setCoordinate={setCoodinateY}/>
            </div>
            <div>
                <label>Z:</label>
                <Slider setCoordinate={setCoodinateZ}/>
            </div>
        </div>
    );
    
}

function App() {
    
    const [screenPosition, setScreenPosition] = useState([0, 0, 500]);
    const [perspectivePoint, setPerspectivePoint] = useState([0, 0, 0]);
    
    const [cubePointx, setcubePointx] = useState(60);
    const [cubePointy, setCubePointy] = useState(0);
    const [cubePointz, setCubePointz] = useState(100);
    
    useEffect(() => {
        setcubePoint([cubePointx, cubePointy, cubePointz]);
    }, [cubePointx, cubePointy, cubePointz]);
    
    const [cubePoint, setcubePoint] = useState([cubePointx, cubePointy, cubePointz]);
    let size = 100;
    
    useEffect(() => {
        setPts3D([
    /*A-0*/    [cubePoint[0]-size/2, cubePoint[1]-size/2, cubePoint[2]-size/2],
    /*B-1*/    [cubePoint[0]+size/2, cubePoint[1]-size/2, cubePoint[2]-size/2],
    /*C-2*/    [cubePoint[0]+size/2, cubePoint[1]-size/2, cubePoint[2]+size/2],
    /*D-3*/    [cubePoint[0]-size/2, cubePoint[1]-size/2, cubePoint[2]+size/2],
    /*E-4*/    [cubePoint[0]-size/2, cubePoint[1]+size/2, cubePoint[2]-size/2],
    /*F-5*/    [cubePoint[0]+size/2, cubePoint[1]+size/2, cubePoint[2]-size/2],
    /*G-6*/    [cubePoint[0]+size/2, cubePoint[1]+size/2, cubePoint[2]+size/2],
    /*H-7*/    [cubePoint[0]-size/2, cubePoint[1]+size/2, cubePoint[2]+size/2]
        ]);
    }, [cubePoint, size]);
    
    const [pts3D, setPts3D] = useState([
    /*A-0*/    [cubePoint[0]-size/2, cubePoint[1]-size/2, cubePoint[2]-size/2],
    /*B-1*/    [cubePoint[0]+size/2, cubePoint[1]-size/2, cubePoint[2]-size/2],
    /*C-2*/    [cubePoint[0]+size/2, cubePoint[1]-size/2, cubePoint[2]+size/2],
    /*D-3*/    [cubePoint[0]-size/2, cubePoint[1]-size/2, cubePoint[2]+size/2],
    /*E-4*/    [cubePoint[0]-size/2, cubePoint[1]+size/2, cubePoint[2]-size/2],
    /*F-5*/    [cubePoint[0]+size/2, cubePoint[1]+size/2, cubePoint[2]-size/2],
    /*G-6*/    [cubePoint[0]+size/2, cubePoint[1]+size/2, cubePoint[2]+size/2],
    /*H-7*/    [cubePoint[0]-size/2, cubePoint[1]+size/2, cubePoint[2]+size/2]]);
    
    // counterclockwise orientation of plains
    // const [planes, setPlanes] = useState([
    //     [pts3D[0], pts3D[1], pts3D[2], pts3D[3]],
    //     [pts3D[4], pts3D[7], pts3D[6], pts3D[5]],
    //     [pts3D[0], pts3D[4], pts3D[5], pts3D[1]],
    //     [pts3D[2], pts3D[6], pts3D[7], pts3D[3]],
    //     [pts3D[1], pts3D[5], pts3D[6], pts3D[2]],
    //     [pts3D[0], pts3D[3], pts3D[7], pts3D[4]]]);
    
    useEffect(() => {
        setPlanes([
            [pts3D[0], pts3D[3], pts3D[2], pts3D[1]],
            [pts3D[4], pts3D[5], pts3D[6], pts3D[7]],
            [pts3D[0], pts3D[1], pts3D[5], pts3D[4]],
            [pts3D[2], pts3D[3], pts3D[7], pts3D[6]],
            [pts3D[1], pts3D[2], pts3D[6], pts3D[5]],
            [pts3D[0], pts3D[4], pts3D[7], pts3D[3]]
        ]);
    }, [pts3D]);
    
    // clockwise orientation of plains
    const [planes, setPlanes] = useState([
        [pts3D[0], pts3D[3], pts3D[2], pts3D[1]],
        [pts3D[4], pts3D[5], pts3D[6], pts3D[7]],
        [pts3D[0], pts3D[1], pts3D[5], pts3D[4]],
        [pts3D[2], pts3D[3], pts3D[7], pts3D[6]],
        [pts3D[1], pts3D[2], pts3D[6], pts3D[5]],
        [pts3D[0], pts3D[4], pts3D[7], pts3D[3]]]);
    
    const [colors, setColors] = useState([
        'red',
        'blue',
        'green',
        'yellow',
        'orange',
        'purple']);
    
    function isNormalPointingAway(planePoint1, planePoint2, planePoint3, perspectivePoint) {
        // Compute two vectors lying on the plane
        const v1 = [
            planePoint2[0] - planePoint1[0],
            planePoint2[1] - planePoint1[1],
            planePoint2[2] - planePoint1[2]
        ];
        
        const v2 = [
            planePoint3[0] - planePoint1[0],
            planePoint3[1] - planePoint1[1],
            planePoint3[2] - planePoint1[2]
        ];
        
        // Compute the cross product v1 × v2 to get the normal vector
        const normal = [
            v1[1] * v2[2] - v1[2] * v2[1],
            v1[2] * v2[0] - v1[0] * v2[2],
            v1[0] * v2[1] - v1[1] * v2[0]
        ];
        
        // Compute the vector from planePoint1 to the perspectivePoint
        const toPerspective = [
            perspectivePoint[0] - planePoint1[0],
            perspectivePoint[1] - planePoint1[1],
            perspectivePoint[2] - planePoint1[2]
        ];
        
        // Compute the dot product of the normal vector and the toPerspective vector
        const dotProduct =
            normal[0] * toPerspective[0] +
            normal[1] * toPerspective[1] +
            normal[2] * toPerspective[2];
        
        // If the dot product is positive, the normal vector is pointing toward the perspectivePoint.
        // Return false in this case, otherwise return true.
        return dotProduct <= 0;
    }
    
    const constructPlanesHTML = useCallback((planes, colors, screenPosition, perspectivePoint) => {
        let result = [];
        
        for (let plane of planes) {
            let display = isNormalPointingAway(plane[0], plane[1], plane[2], perspectivePoint);
            
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
    }, []);
    
    const [constructedHTML, setConstructedHTML] = useState(constructPlanesHTML(planes, colors, screenPosition, perspectivePoint));
    
    useEffect(() => {
        setConstructedHTML(constructPlanesHTML(planes, colors, screenPosition, perspectivePoint));
    }, [planes, colors, screenPosition, perspectivePoint, constructPlanesHTML]);
    
    return (
        <div className="App">
            
            {constructedHTML.map((item) => (
                <div className="planeHolder">
                    {item}
                </div>
            ))}
            <SliderHolder setCoodinateX={setcubePointx} setCoodinateY={setCubePointy} setCoodinateZ={setCubePointz} />
        </div>
    );
}

export default App;
