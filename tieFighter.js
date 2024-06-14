import * as THREE from 'https://cdn.skypack.dev/three@0.128/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer;
let tieFighters = [];
let starDestroyers = [];
let executors = [];
const fighterCount = 30;
const starDestroyerCount = 3;
const executorCount = 1;
let tieFighterModel, starDestroyerModel, executorModel;
let isAnimating = true; // Control animation
let modelsLoaded = false;

console.log('tieFighter.js loaded'); 

init();
loadModels().then(() => {
    modelsLoaded = true; // model loaded
});

function init() {
    console.log('Initializing scene and camera');

    // Set Scene
    scene = new THREE.Scene();

    // Set Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Set up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: document.querySelector('#c') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Set up amibent light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Adjust window size
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadModels() {
    const gltfLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    // Load Tie Fighter model
    const tieFighterPromise = new Promise((resolve, reject) => {
        gltfLoader.load('resources/models/tie-fighter-gltf/scene.gltf', function (gltf) {
            tieFighterModel = gltf.scene;
            resolve();
        }, undefined, function (error) {
            console.error('An error happened with TIE Fighter:', error);
            reject(error);
        });
    });

    // load Star Destroyer model and texture
    const starDestroyerPromise = new Promise((resolve, reject) => {
        gltfLoader.load('resources/models/star-destroyer/scene.gltf', function (gltf) {
            starDestroyerModel = gltf.scene;

            // load texture
            const texture = textureLoader.load('resources/models/star-destroyer/textures/Details_baseColor.png');
            starDestroyerModel.traverse(function (child) {
                if (child.isMesh) {
                    child.material.map = texture;
                    child.material.needsUpdate = true;
                }
            });

            resolve();
        }, undefined, function (error) {
            console.error('An error happened with Star Destroyer:', error);
            reject(error);
        });
    });

    // Load Executor Class Star Destroyer model
    const executorPromise = new Promise((resolve, reject) => {
        gltfLoader.load('resources/models/star_wars_executor_class_star_destroyer/scene.gltf', function (gltf) {
            executorModel = gltf.scene;
            resolve();
        }, undefined, function (error) {
            console.error('An error happened with Executor Class Star Destroyer:', error);
            reject(error);
        });
    });

    return Promise.all([tieFighterPromise, starDestroyerPromise, executorPromise]);
}

function displayModels() {
    initializeTieFighters();
    initializeStarDestroyers();
    initializeExecutor();
    animate();
}

function initializeTieFighters() {
    for (let i = 0; i < fighterCount; i++) {
        const clone = tieFighterModel.clone();
        const scale = 0.05;
        clone.scale.set(scale, scale, scale);

        // Random location without collision
        let position;
        do {
            position = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(200),
                THREE.MathUtils.randFloatSpread(200),
                THREE.MathUtils.randFloatSpread(200) - 100
            );
        } while (checkCollision(position, scale));

        clone.position.copy(position);

        tieFighters.push(clone);
        scene.add(clone);
    }
    console.log('TIE Fighters loaded successfully');
}

function initializeStarDestroyers() {
    const positions = [
        new THREE.Vector3(-100, 0, -300),
        new THREE.Vector3(0, 15, -200),
        new THREE.Vector3(150, 20, -200)
    ];

    for (let i = 0; i < starDestroyerCount; i++) {
        const clone = starDestroyerModel.clone();
        const scale = 5; // Scale up 10 time
        clone.scale.set(scale, scale, scale);
        
        clone.rotation.y = -Math.PI / 2;

        const position = positions[i % positions.length];
        clone.position.copy(position);

        starDestroyers.push(clone);
        scene.add(clone);
    }
    console.log('Star Destroyers loaded successfully');
}

function initializeExecutor() {
    const position = new THREE.Vector3(200, -100, -1500);

    for (let i = 0; i < executorCount; i++) {
        const clone = executorModel.clone();
        const scale = 1.2; 
        clone.scale.set(scale, scale, scale);
        
        clone.position.copy(position);

        executors.push(clone);
        scene.add(clone);
    }
    console.log('Executor loaded successfully');
}

function checkCollision(position, scale) {
    const collisionDistance = 5; // Set up collision check
    const allObjects = [...tieFighters, ...starDestroyers, ...executors];
    return allObjects.some(obj => obj.position.distanceTo(position) < (collisionDistance * scale));
}

function animate() {
    if (!isAnimating) {
        console.log('Stopping animation loop');
        renderer.render(scene, camera); // Clear rendered models
        return;
    }

    requestAnimationFrame(animate);

    // Move Tie Fighter
    tieFighters.forEach(tieFighter => {
        tieFighter.position.z += 0.7;
        // Relocate Tie Fighter
        if (tieFighter.position.z > 100) {
            tieFighter.position.z = -100;
        }
    });

    // Move Star Destroyer
    starDestroyers.forEach(starDestroyer => {
        starDestroyer.position.z += 0.3;
        // if (starDestroyer.position.z > 100) {
        //     starDestroyer.position.z = -100;
        // }
    });

    // 移动Executor Class Star Destroyer
    executors.forEach(executor => {
        executor.position.z += 0.3;
        // if (executor.position.z > 100) {
        //     executor.position.z = -100;
        // }
    });

    renderer.render(scene, camera);
}

export function removeTieFighters() {
    console.log('Removing TIE fighters and Star Destroyers:', tieFighters.length + starDestroyers.length + executors.length); // 调试信息
    tieFighters.forEach(tieFighter => {
        scene.remove(tieFighter);
    });
    starDestroyers.forEach(starDestroyer => {
        scene.remove(starDestroyer);
    });
    executors.forEach(executor => {
        scene.remove(executor);
    });
    tieFighters = []; // Clear Tie array
    starDestroyers = []; // Clear Star Destroyer array
    executors = []; // clear Executor array
    isAnimating = false; // Stop animation
    renderer.render(scene, camera); // Render empty scnene
    console.log('All TIE fighters, Star Destroyers, and Executors removed:', tieFighters.length + starDestroyers.length + executors.length);
}

export { tieFighters, starDestroyers, executors, isAnimating, modelsLoaded, displayModels };

