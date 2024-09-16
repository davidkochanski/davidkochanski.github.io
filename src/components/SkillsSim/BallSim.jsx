import React, { useState, useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

const ASSETS_PATH = './assets/'

import { clamp, toMass, uniformRandom }  from './skillsUtil';

import Vector from './Vector';

import possibleSkills from './possibleSkills';
import { TERMINAL_FADE_OUT_TIME, TERMINAL_TEXT, TERMINAL_TYPING_BIAS, TERMINAL_TYPING_SPEED } from '../../script/config';
const allSkills = structuredClone(possibleSkills);

function BallSim() {
    let MARGIN_X = document.documentElement.clientWidth < 768 ? 32 : 16;
    // let MARGIN_X = 16;
    const MARGIN_Y = 0;

    const MAX_SCENE_WIDTH = 4000;
    const MAX_SCENE_HEIGHT = 4000; // hard limit

    const MIN_SCENE_WIDTH = 300;
    const MIN_SCENE_HEIGHT = 300;
    const MAX_BALLS = possibleSkills.length;
    // const MAX_BALLS = 20000;

    const [objects, setObjects] = useState([]);
    const [preloadedTextures, setPreloadedTextures] = useState({});
    const [appliedForce, setAppliedForce] = useState(false);

    const mountRef = useRef(null);
    const loader = new THREE.TextureLoader();

    let secret = false;
    let keys = [];

    const createBallMesh = (obj) => {
        const ballMeshResolution = document.documentElement.clientWidth < 768 ? 64 : 256;
    
        const geometry = new THREE.SphereGeometry(obj.size / 2, ballMeshResolution, ballMeshResolution);
        const tempMaterial = new THREE.MeshToonMaterial({ color: 0x000000, toneMapped: false});
    
        const ball = new THREE.Mesh(geometry, tempMaterial);
        ball.position.set(obj.posX + obj.size / 2, obj.size / 2, obj.posY + obj.size / 2);
        ball.castShadow = true;
        ball.rotation.set(Math.PI / 2,0, Math.PI);
    
        if(preloadedTextures[obj.type]) {
            const material = new THREE.MeshStandardMaterial({ map: preloadedTextures[obj.type], toneMapped: false });
            ball.material = material;
        } else {
            loader.load(`${ASSETS_PATH}${obj.type}`, (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace
                const material = new THREE.MeshStandardMaterial({ map: texture });
                ball.material = material;
            });
        }
    
        return ball;
    };

    useEffect(() => {
        // Preload textures
        const texturesToLoad = possibleSkills.map(ball => ball.type);
        const loadedTextures = {};

        texturesToLoad.forEach(type => {
            loadedTextures[type] = loader.load(`${ASSETS_PATH}${type}`);
        });

        setPreloadedTextures(loadedTextures);
        
        // Resize balls
        if(document.documentElement.clientWidth  < 768) {
            possibleSkills.map((ball) => ball.size *= 0.66)
        }
        // const root = document.getElementById("physics-root");

        const width = clamp(MIN_SCENE_WIDTH, document.documentElement.clientWidth - MARGIN_X, MAX_SCENE_WIDTH);
        const height = clamp(MIN_SCENE_HEIGHT, window.innerHeight - MARGIN_Y, MAX_SCENE_HEIGHT);

        setWindowSize([width, height]);

        const scene = new THREE.Scene();
        // scene.background = new THREE.Color(0xffffff);

        const camera = new THREE.OrthographicCamera(
            0,  width, 0, -height, 0.1, 10000
        );
        camera.position.set(0, 800, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, precision: "lowp", powerPreference: "low-power" });

        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;

        THREE.ColorManagement.legacyMode = false

        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.toneMapping = THREE.LinearToneMapping

        // renderer.setClearColor( 0x000000, 0 ); // make transparent
        mountRef.current.appendChild(renderer.domElement);

        const groundGeometry = new THREE.PlaneGeometry(MAX_SCENE_WIDTH, MAX_SCENE_HEIGHT, 1, 1);
        const groundTexture = loader.load(`${ASSETS_PATH}/felt.jpg`);
        // groundTexture.repeat = 10;
        const groundMaterial = new THREE.MeshStandardMaterial({ map:groundTexture, color: 0x318242 });
        // { map:groundTexture, transparent: true, opacity: 0.001, color: 0x318242 }

        groundMaterial.aoMap = loader.load(`${ASSETS_PATH}/felt_ao.jpg`);
        groundMaterial.normalMap = loader.load(`${ASSETS_PATH}/felt_normal.png`);

        const plane = new THREE.Mesh(groundGeometry, groundMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        plane.position.set(MAX_SCENE_WIDTH / 2, 0, MAX_SCENE_HEIGHT / 2);
        scene.add(plane);


        const resizeCamera = () => {
            // MARGIN_X = window.innerWidth < 768 ? 30 : 75;

            const newWidth = clamp(MIN_SCENE_WIDTH, document.documentElement.clientWidth  - MARGIN_X, MAX_SCENE_WIDTH);
            const newHeight = clamp(MIN_SCENE_HEIGHT, document.documentElement.clientHeight  - MARGIN_Y, MAX_SCENE_HEIGHT);

            setWindowSize([newWidth, newHeight]);

            camera.right = newWidth;
            camera.bottom = -newHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener("resize", resizeCamera);
        resizeCamera();


        setObjects(prevObjects => {
            return prevObjects.map((obj, i) => {
                const ball = createBallMesh(obj);
                obj.mass = toMass(obj.size);
                scene.add(ball);

                return {...obj, id: i, mesh: ball}
            })

        });

        const ambientLight = new THREE.AmbientLight(0x888888);
        scene.add(ambientLight);

        const shadowDistance = 2000;
        const shadowFactor = 0.25;

        const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight.position.set(width * shadowFactor, 1000, -height * shadowFactor);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 3000;
        directionalLight.shadow.mapSize.height = 3000;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = shadowDistance;
        directionalLight.shadow.camera.left = -shadowDistance;
        directionalLight.shadow.camera.right = shadowDistance;
        directionalLight.shadow.camera.top = shadowDistance;
        directionalLight.shadow.camera.bottom = -shadowDistance;
        scene.add(directionalLight);

        // DEBUG
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 1, 0);
        controls.update();
        controls.dispose();

        const wrapper = document.querySelector("#ball-wrapper > canvas");
        wrapper.addEventListener("click", (e) => createBallAtClick(e, scene));
        wrapper.addEventListener("touchdown", (e) => createBallAtClick(e, scene));

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        setObjects((prevObjects) => {
            if (prevObjects.length > 0) return prevObjects; // only do it once

            // the balls will be centered vertically and about 500 px away from each other horizontally
            // then they'll have an initial velocity that will make them slam into eachother
            // to catch the user's attention >:)
            // also they won't be perfectly alligned vertically to show a more complex collision

            const seed1 = Math.floor(Math.random() * possibleSkills.length);
            const prototype1 = possibleSkills[seed1];
            prototype1.mass = toMass(prototype1.size);

            const BIAS = Math.floor(uniformRandom(-25, 25));
            const INITIAL_DISTANCE = Math.floor(uniformRandom(200, 300))

            const obj1 = {
                posX: clamp(0, ((width - prototype1.size) / 2) - INITIAL_DISTANCE, width),
                posY: clamp(0, ((height - prototype1.size) / 2) - BIAS, height),
                veloX: 0,
                veloY: 0,
                id: 0,
                mass: prototype1.mass,
                size: prototype1.size,
                type: prototype1.type
            };

            possibleSkills.splice(seed1, 1);

            const seed2 = Math.floor(Math.random() * possibleSkills.length);
            const prototype2 = possibleSkills[seed2];
            prototype2.mass = toMass(prototype2.size);

            const obj2 = {
                posX: clamp(0, ((width - prototype2.size) / 2) + INITIAL_DISTANCE, width),
                posY: clamp(0, ((height - prototype2.size) / 2) + BIAS, height),
                veloX: 0,
                veloY: 0,
                id: 1,
                mass: prototype2.mass,
                size: prototype2.size,
                type: prototype2.type
            };

            possibleSkills.splice(seed2, 1);

            const ball1 = createBallMesh(prototype1);
            const ball2 = createBallMesh(prototype2);
            
            obj1.mesh = ball1;
            obj2.mesh = ball2;

            scene.add(ball1);
            scene.add(ball2);

            return [obj1, obj2];
        });

        window.addEventListener("terminalAnimationIsFinishing", () => {
            setTimeout(() => {
                setObjects(prevObjects => {
                    if(appliedForce || !prevObjects[0] || !prevObjects[1]) return prevObjects;
    
                    setAppliedForce(true);
    
                    prevObjects[0].veloX = 7;
                    prevObjects[0].veloY = 0;
    
                    prevObjects[1].veloX = -7;
                    prevObjects[1].veloY = 0;
                    return prevObjects;
                })
            }, (TERMINAL_FADE_OUT_TIME / 2) - 100) // I want them to start rolling half way once the blinds have gone up
                                           // (and a bit less) so the move just when they became visible
        })

        return () => {
            window.removeEventListener("resize", resizeCamera);
            mountRef.current.removeChild(renderer.domElement);
            if (physicsRootRef.current) {
                observer.unobserve(physicsRootRef.current);
            }
        };


    }, []);

    useEffect(() => {
        function trackKeySequence(event) {
            if(event.key === "Shift") return;
            keys.push(event.key);

            if (keys.length > 3) { keys.shift(); }
            if (keys.join('') === "OwO") {
                secret = true;
                console.log("Secret codeword detected! Activating unlimited balls");
                document.removeEventListener('keydown', trackKeySequence);
            }
        }
        document.addEventListener('keydown', trackKeySequence);
    }, [])
    

    const createBallAtClick = (e, scene) => {

        const help = document.getElementById("ball-help");
        help.style.display = "none";
    
        const wrapper = document.querySelector("#ball-wrapper > canvas");
        const rect = wrapper.getBoundingClientRect();
    
        setObjects(prevObjects => {
            let x, y;

            if(e.touches) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            } else {
                x = e.clientX;
                y = e.clientY;
            }

            let seed, prototype;

            if(!secret && prevObjects.length >= MAX_BALLS) return prevObjects;

            if(possibleSkills.length === 0) {
                seed = Math.floor(Math.random() * allSkills.length);
                prototype = allSkills[seed];
                prototype.mass = toMass(prototype.size);
            } else {
                seed = Math.floor(Math.random() * possibleSkills.length);
                prototype = possibleSkills[seed];
                prototype.mass = toMass(prototype.size);
            }

            const centerX = centerize(x, rect.left, prototype.size);
            const centerY = centerize(y, rect.top, prototype.size);
            
            
            // if you try and click on a ball that will cause it to overlap, don't add it
            for (let i = 0; i < prevObjects.length; i++) {
                let ball = prevObjects[i];
    
                if (Math.sqrt((ball.posX - centerX) ** 2 + (ball.posY - centerY) ** 2) < (ball.size + prototype.size) / 2 + 1) {
                    return prevObjects;
                }
            }

            // out of bounds check
            const radius = prototype.size / 2;
            const mouseX = x - rect.left;
            const mouseY = y - rect.top;

            if(mouseX - radius < 0 || mouseX + radius > rect.width || mouseY - radius < 0 || mouseY + radius > rect.height) {
                return prevObjects;
            }
            

            const nextObj = {
                posX: centerX,
                posY: centerY,
                veloX: ((Math.random() * 2) - 1) * 5,
                veloY: ((Math.random() * 2) - 1) * 5,
                id: prevObjects.length,
                mass: prototype.mass,
                size: prototype.size,
                type: prototype.type
            };

    
            const ball = createBallMesh(nextObj);

            nextObj.mesh = ball;
            scene.add(nextObj.mesh);
            
            prevObjects.push(nextObj);

            possibleSkills.splice(seed, 1);

            return prevObjects;
        });


    };

    const [prevMousePos, setPrevMousePos] = useState([-1000, -1000]);
    const [windowSize, setWindowSize] = useState([document.documentElement.clientWidth , document.documentElement.clientHeight]);


    const WALL_ABSORPTION_COEFF = 0.5;
    const GROUND_FRICTION_COEFF = 0.985;
    const COLLISION_FRICTION_COEFF = 0.5;
    const MAX_VELO = 7;

    const updatePosition = () => {
        applyMouseForce(null, true);
        checkForAndApplyCollisionForce();

        setObjects(prevObjects => {
            const updatedObjects = prevObjects.map(obj => {
                const { posX, posY, veloX, veloY, size } = obj;
                let nextObj = { ...obj };

                if (posX < 0) { // hit left wall
                    nextObj = {
                        ...nextObj,
                        veloX: -veloX * WALL_ABSORPTION_COEFF,
                        posX: 0
                    };
                } else if (posX > windowSize[0] - size) { // right
                    nextObj = {
                        ...nextObj,
                        veloX: -veloX * WALL_ABSORPTION_COEFF,
                        posX: windowSize[0] - size
                    };
                } else if (posY < 0) { // top
                    nextObj = {
                        ...nextObj,
                        veloY: -veloY * WALL_ABSORPTION_COEFF,
                        posY: 0
                    };
                } else if (posY > windowSize[1] - size) { // bottom
                    nextObj = {
                        ...nextObj,
                        veloY: -veloY * WALL_ABSORPTION_COEFF,
                        posY: windowSize[1] - size
                    };
                } else { // default case

                    nextObj = {
                        ...nextObj,
                        posX: posX + veloX,
                        posY: posY + veloY,
                        veloX: veloX * GROUND_FRICTION_COEFF,
                        veloY: veloY * GROUND_FRICTION_COEFF,
                    };

                }

                // cap the velocity
                // or zero the velocity if it's under some threshold
                nextObj = {
                    ...nextObj,
                    veloX: Math.abs(veloX) < 0.01 ? 0 : Math.max(Math.min(nextObj.veloX, MAX_VELO), -MAX_VELO),
                    veloY: Math.abs(veloY) < 0.01 ? 0 : Math.max(Math.min(nextObj.veloY, MAX_VELO), -MAX_VELO)
                };
                return nextObj;

            });
            return updatedObjects;
        });

        objects.forEach((obj, i) => {
            const ball = obj.mesh;

            if(!ball) return;

            ball.position.set(obj.posX + obj.size / 2, obj.size / 2, obj.posY + obj.size / 2);
            ball.castShadow = true;

            const speed = Math.sqrt(obj.veloX ** 2 + obj.veloY ** 2);
            const axis = new THREE.Vector3(obj.veloY, 0, -obj.veloX).normalize();

            const angle = speed / obj.size * 2;

            ball.rotateOnWorldAxis(axis, angle);
        });
    };

    const applyMouseForce = (e, usePrev = false) => {
        const wrapper = document.querySelector("#ball-wrapper > canvas");
        const rect = wrapper.getBoundingClientRect();

        let mouseX, mouseY;

        if (usePrev) {
            mouseX = prevMousePos[0];
            mouseY = prevMousePos[1];
        } else {
            if(e.touches) {
                mouseX = e.touches[0].clientX - rect.left;
                mouseY = e.touches[0].clientY - rect.top;
            } else {
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
            } 
            setPrevMousePos([mouseX, mouseY]);
        }

        setObjects(prevObjects => {
            const updatedObjects = prevObjects.map(item => {
                const { veloX, veloY, posX, posY, size, mass } = item;
                let nextObj = { ...item };

                const [x, y] = [centerize(mouseX, posX, size), centerize(mouseY, posY, size)]

                const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

                // Apply a force if the mouse gets close (within X pixels of radius)
                if (distance < (size)) {
                    // atan2 returns a number between [-pi, pi]
                    // so normalize it to [0, tau]
                    let angle = Math.atan2(y, x);

                    if (angle < 0) angle += 2 * Math.PI;

                    // the force on each axis is some component of that
                    // yay trig!
                    const TOLERANCE = 100;
                    nextObj = {
                        ...nextObj,
                        veloX: veloX - Math.cos(angle) * TOLERANCE * Math.pow((size - distance), 2) / mass,
                        veloY: veloY - Math.sin(angle) * TOLERANCE * Math.pow((size - distance), 2) / mass
                    }

                }
                return nextObj;
            });


            return updatedObjects;
        })
    };
    
    const checkForAndApplyCollisionForce = () => {
        setObjects(prevObjects => {
            return prevObjects.map(obj => {
                let nextObj = { ...obj };
    
                prevObjects.forEach(other => {
                    if (obj.id === other.id) return;

                    // This code is based on this formula of 2D elastic collisions between discs:
                    // https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
    
                    const distanceBetween = Math.sqrt(
                        ((obj.posX + (obj.size / 2)) - (other.posX + (other.size / 2))) ** 2 +
                        ((obj.posY + (obj.size / 2)) - (other.posY + (other.size / 2))) ** 2
                    );
    
                    // if not colliding, return
                    if (!distanceBetween || distanceBetween > (obj.size + other.size) / 2 + 1) return; // +1 for a little tolerance
                    
                    // convert to vectors so i can use vector functions
                    const thisX = new Vector(obj.posX + (obj.size / 2), obj.posY + (obj.size / 2));
                    const thisV = new Vector(obj.veloX, obj.veloY); 
    
                    const otherX = new Vector(other.posX + (other.size / 2), other.posY + (other.size / 2));
                    const otherV = new Vector(other.veloX, other.veloY);

                    const displacement = thisX.subtract(otherX);
                    
                    // the final calculation is the difference vector scaled by a certain (complecated) constant
                    // I broke it into 3 parts
                    const dotProd = Vector.dot(thisV.subtract(otherV), thisX.subtract(otherX));
                    const massFactor = (2 * other.mass) / (obj.mass + other.mass);
                    const magnitude = (thisX.subtract(otherX).getMagnitude()) ** 2;
    
                    if (dotProd > 0 || magnitude === 0 ) return; // if they're going in same direction stop (or if about to divide by zero)
    
                    const thisNextVelo = displacement.scaleByConstant(massFactor * dotProd / magnitude);
    
                    // Update velocities
                    nextObj = {
                        ...nextObj,
                        veloX: obj.veloX - thisNextVelo.x,
                        veloY: obj.veloY - thisNextVelo.y,
                        posX: obj.posX,
                        posY: obj.posY
                    };
                    
                    // if theres an overlap, move the discs slightly to stop them from overlapping
                    const overlap = ((obj.size + other.size) / 2) - distanceBetween;

                    if (overlap > 0) {
                        const correction = displacement.normalize().scaleByConstant(overlap);

                        nextObj.posX += correction.x;
                        nextObj.posY += correction.y;

                        const otherIndex = prevObjects.findIndex(item => item.id === other.id);
                        
                        prevObjects[otherIndex] = {
                            ...prevObjects[otherIndex],
                            posX: prevObjects[otherIndex].posX - correction.x,
                            posY: prevObjects[otherIndex].posY - correction.y,
                        };
                    }
                });
                return nextObj;
            });
        });
    };

    const centerize = (mouse, pos, size) => {
        return mouse - pos - (size / 2);
    }

    // Trigger the update function on each animation frame
    useEffect(() => {
        const animationFrame = requestAnimationFrame(updatePosition);
        return () => cancelAnimationFrame(animationFrame);
    }, [objects]);

    return (
        <>
            <div onMouseMove={(e) => {applyMouseForce(e)}} onTouchMove={(e) => {applyMouseForce(e)}} onMouseOut={() => { setPrevMousePos([-1000, -1000]) }} onTouchEnd={() => { setPrevMousePos([-1000, -1000]) }} id="ball-wrapper" ref={mountRef}>
            <h4 id="ball-help">( Click to summon a new skill )</h4>

            <button type="button" className="click-to-face-ball" onClick={() => {setObjects(prevObjects => {
                return prevObjects.map((obj) => {
                    obj.mesh.rotation.set(-Math.PI / 2, 0, 0);
                    return obj;
                })
            }) }}><i className="fa-regular fa-eye"></i></button>
            </div>
        </>
    );
}

export default BallSim;
