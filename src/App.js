import React from 'react';
import {useState, useEffect, useCallback } from 'react';
import './App.css';

function CubePlane({ point1, point2, point3, point4, color, display, screenPosition }) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const translate3DPointTo2D = useCallback((point) => {
        const x = (width / 2) + ((point[0] * screenPosition[2]) / point[2]);
        const y = (height / 2) + ((point[1] * screenPosition[2]) / point[2]);
        return [x, y];
    }, [width, height, screenPosition]);
    
    const translate3DPointsTo2D = useCallback((points3D) => {
        return points3D.map(point => translate3DPointTo2D(point));
    }, [translate3DPointTo2D]);
    
    const refactorPointsToString = useCallback((points2D) => {
        return points2D.map(point => `${point[0]}px ${point[1]}px`).join(', ');
    }, []);
    
    const [points3D, setPoints3D] = useState([]);
    const [points2D, setPoints2D] = useState([]);
    const [points2DString, setPoints2DString] = useState('');
    
    useEffect(() => {
        if (display) {
            const newPoints3D = [point1, point2, point3, point4];
            setPoints3D(newPoints3D);
            const newPoints2D = translate3DPointsTo2D(newPoints3D);
            setPoints2D(newPoints2D);
            setPoints2DString(refactorPointsToString(newPoints2D));
        } else {
            setPoints3D([]);
            setPoints2D([]);
            setPoints2DString('');
        }
    }, [point1, point2, point3, point4, display, translate3DPointsTo2D, refactorPointsToString]);
    
    if (!display) {
        return <div className="cube-plane" style={{ display: 'none' }}></div>;
    }
    
    const style = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `${color}`,
        clipPath: `polygon(${points2DString})`,
        position: 'absolute',
        top: '0',
        left: '0'
    };
    
    return <div className="cube-plane" style={style}></div>;
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
