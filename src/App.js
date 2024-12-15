import React, {useCallback, useEffect, useState, useMemo, use} from 'react';
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
        console.log(event.target.value);
    }
    
    return (
        <input className='slider' onChange={e => handleChange(e) }  type="range" min="-2000" max="2000" step="1" />
    );
}

function SliderHolder({ x, y, z, setCoodinateX, setCoodinateY, setCoodinateZ, angleX, setAngleX, angleY, setAngleY, angleZ, setAngleZ }) {
    return (
        <div className="sliderHolder">
            <div>
                <label>X:</label>
                <Slider setCoordinate={setCoodinateX}/>
                <span>{x}</span>
            </div>
            <div>
                <label>Y:</label>
                <Slider setCoordinate={setCoodinateY}/>
                <span>{y}</span>
            </div>
            <div>
                <label>Z:</label>
                <Slider setCoordinate={setCoodinateZ}/>
                <span>{z}</span>
            </div>
            <div>
                <label>AngleX:</label>
                <Slider setCoordinate={setAngleX}/>
                <span>{angleX}</span>
            </div>
            <div>
                <label>AngleY:</label>
                <Slider setCoordinate={setAngleY}/>
                <span>{angleY}</span>
            </div>
            <div>
                <label>AngleZ:</label>
                <Slider setCoordinate={setAngleZ}/>
                <span>{angleZ}</span>
            </div>
        </div>
    );
    
}

function App() {
    
    const [screenPosition, setScreenPosition] = useState([0, 0, 2000]);
    const [perspectivePoint, setPerspectivePoint] = useState([0, 0, 0]);
    
    const [angleX, setAngleX] = useState(0);
    const [originalAngleX, setOriginalAngleX] = useState(0);
    
    const [angleY, setAngleY] = useState(0);
    const [originalAngleY, setOriginalAngleY] = useState(0);
    
    const [angleZ, setAngleZ] = useState(0);
    const [originalAngleZ, setOriginalAngleZ] = useState(0);
    
    const [cubePointX, setCubePointX] = useState(0);
    const [cubePointY, setCubePointY] = useState(0);
    const [cubePointZ, setCubePointZ] = useState(400);
    
    // useEffect(() => {
    //     setCubePoint([cubePointX, cubePointY, cubePointZ]);
    // }, [cubePointX, cubePointY, cubePointZ]);
    
    const [cubePoint, setCubePoint] = useState([cubePointX, cubePointY, cubePointZ]);
    let size = 100;
    
    const [pts3D, setPts3D] = useState([
        /*A-0*/    [cubePoint[0]-size/2, cubePoint[1]-size/2, cubePoint[2]-size/2],
        /*B-1*/    [cubePoint[0]+size/2, cubePoint[1]-size/2, cubePoint[2]-size/2],
        /*C-2*/    [cubePoint[0]+size/2, cubePoint[1]-size/2, cubePoint[2]+size/2],
        /*D-3*/    [cubePoint[0]-size/2, cubePoint[1]-size/2, cubePoint[2]+size/2],
        /*E-4*/    [cubePoint[0]-size/2, cubePoint[1]+size/2, cubePoint[2]-size/2],
        /*F-5*/    [cubePoint[0]+size/2, cubePoint[1]+size/2, cubePoint[2]-size/2],
        /*G-6*/    [cubePoint[0]+size/2, cubePoint[1]+size/2, cubePoint[2]+size/2],
        /*H-7*/    [cubePoint[0]-size/2, cubePoint[1]+size/2, cubePoint[2]+size/2]]);
    
    useEffect(() => {
    //     setPts3D([
    // /*A-0*/    [cubePoint[0]-size/2, cubePoint[1]-size/2, cubePoint[2]-size/2],
    // /*B-1*/    [cubePoint[0]+size/2, cubePoint[1]-size/2, cubePoint[2]-size/2],
    // /*C-2*/    [cubePoint[0]+size/2, cubePoint[1]-size/2, cubePoint[2]+size/2],
    // /*D-3*/    [cubePoint[0]-size/2, cubePoint[1]-size/2, cubePoint[2]+size/2],
    // /*E-4*/    [cubePoint[0]-size/2, cubePoint[1]+size/2, cubePoint[2]-size/2],
    // /*F-5*/    [cubePoint[0]+size/2, cubePoint[1]+size/2, cubePoint[2]-size/2],
    // /*G-6*/    [cubePoint[0]+size/2, cubePoint[1]+size/2, cubePoint[2]+size/2],
    // /*H-7*/    [cubePoint[0]-size/2, cubePoint[1]+size/2, cubePoint[2]+size/2]
    //     ]);
        setPts3D([
    /*A-0*/    [pts3D[0][0] - (cubePoint[0] - cubePointX), pts3D[0][1] - (cubePoint[1] - cubePointY), pts3D[0][2] - (cubePoint[2] - cubePointZ)],
    /*B-1*/    [pts3D[1][0] - (cubePoint[0] - cubePointX), pts3D[1][1] - (cubePoint[1] - cubePointY), pts3D[1][2] - (cubePoint[2] - cubePointZ)],
    /*C-2*/    [pts3D[2][0] - (cubePoint[0] - cubePointX), pts3D[2][1] - (cubePoint[1] - cubePointY), pts3D[2][2] - (cubePoint[2] - cubePointZ)],
    /*D-3*/    [pts3D[3][0] - (cubePoint[0] - cubePointX), pts3D[3][1] - (cubePoint[1] - cubePointY), pts3D[3][2] - (cubePoint[2] - cubePointZ)],
    /*E-4*/    [pts3D[4][0] - (cubePoint[0] - cubePointX), pts3D[4][1] - (cubePoint[1] - cubePointY), pts3D[4][2] - (cubePoint[2] - cubePointZ)],
    /*F-5*/    [pts3D[5][0] - (cubePoint[0] - cubePointX), pts3D[5][1] - (cubePoint[1] - cubePointY), pts3D[5][2] - (cubePoint[2] - cubePointZ)],
    /*G-6*/    [pts3D[6][0] - (cubePoint[0] - cubePointX), pts3D[6][1] - (cubePoint[1] - cubePointY), pts3D[6][2] - (cubePoint[2] - cubePointZ)],
    /*H-7*/    [pts3D[7][0] - (cubePoint[0] - cubePointX), pts3D[7][1] - (cubePoint[1] - cubePointY), pts3D[7][2] - (cubePoint[2] - cubePointZ)]
        ]);
        setCubePoint([cubePointX, cubePointY, cubePointZ]);
        
    }, [cubePoint, size, cubePointX, cubePointY, cubePointZ, pts3D]);
    
    
    
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
    
    const rotateX = useCallback((points, angle1, angle2) => {
        const angleDifference = angle2 - angle1;
        const radians = (Math.PI / 180) * ((angleDifference) % 360); // Reduce the angle increment by dividing by 10
        const centerY = cubePoint[1];
        const centerZ = cubePoint[2];
    
        return points.map(([x, y, z]) => {
            // Translate point to origin
            const translatedY = y - centerY;
            const translatedZ = z - centerZ;
    
            // Rotate around the X-axis
            const rotatedY = translatedY * Math.cos(radians) - translatedZ * Math.sin(radians);
            const rotatedZ = translatedY * Math.sin(radians) + translatedZ * Math.cos(radians);
    
            // Translate point back
            return [x, rotatedY + centerY, rotatedZ + centerZ];
        });
    }, [cubePoint]);
    
    const rotateY = useCallback((points, angle1, angle2) => {
        const angleDifference = angle2 - angle1;
        const radians = (Math.PI / 180) * ((angleDifference) % 360);
        const centerX = cubePoint[0];
        const centerZ = cubePoint[2];
        
        return points.map(([x, y, z]) => {
            const translatedX = x - centerX;
            const translatedZ = z - centerZ;
            
            const rotatedX = translatedX * Math.cos(radians) + translatedZ * Math.sin(radians);
            const rotatedZ = -translatedX * Math.sin(radians) + translatedZ * Math.cos(radians);
            
            return [rotatedX + centerX, y, rotatedZ + centerZ];
        });
    }, [cubePoint]);
    
    const rotateZ = useCallback((points, angle1, angle2) => {
        const angleDifference = angle2 - angle1;
        const radians = (Math.PI / 180) * ((angleDifference) % 360);
        const centerX = cubePoint[0];
        const centerY = cubePoint[1];
        
        return points.map(([x, y, z]) => {
            const translatedX = x - centerX;
            const translatedY = y - centerY;
            
            const rotatedX = translatedX * Math.cos(radians) - translatedY * Math.sin(radians);
            const rotatedY = translatedX * Math.sin(radians) + translatedY * Math.cos(radians);
            
            return [rotatedX + centerX, rotatedY + centerY, z];
        });
    }, [cubePoint]);
    
    // Updates points when a certain angle is changed
    useEffect(() => {
        setPts3D(rotateX(pts3D, angleX, originalAngleX));
        setOriginalAngleX(angleX);
    }, [angleX]);
    
    useEffect(() => {
        setPts3D(rotateY(pts3D, angleY, originalAngleY));
        setOriginalAngleY(angleY);
    }, [angleY]);
    
    useEffect( () => {
        setPts3D(rotateZ(pts3D, angleZ, originalAngleZ));
        setOriginalAngleZ(angleZ);
    }, [angleZ]);
    
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
            <SliderHolder x={cubePointX}
                          y={cubePointY}
                          z={cubePointZ}
                          setCoodinateX={setCubePointX}
                          setCoodinateY={setCubePointY}
                          setCoodinateZ={setCubePointZ}
                          angleX={angleX}
                          setAngleX={setAngleX}
                          angleY={angleY}
                          setAngleY={setAngleY}
                          angleZ={angleZ}
                          setAngleZ={setAngleZ}/>
        </div>
    );
}

export default App;
