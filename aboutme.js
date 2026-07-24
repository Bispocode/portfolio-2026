// =====================================
// IMPORTA O THREE.JS
// =====================================

import * as THREE from "https://esm.sh/three@0.179";
import { GLTFLoader } from "https://esm.sh/three@0.179/examples/jsm/loaders/GLTFLoader";


// =====================================
// CONTAINER
// =====================================

const container = document.querySelector(".objeto-aboutme");


// =====================================
// CENA
// =====================================

const scene = new THREE.Scene();


// =====================================
// CÂMERA
// =====================================

const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
);

camera.position.set(0, 0, 15);


// =====================================
// RENDERER
// =====================================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

container.appendChild(renderer.domElement);


// =====================================
// RESPONSIVIDADE
// =====================================

window.addEventListener("resize", () => {

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    camera.aspect =
        container.clientWidth / container.clientHeight;

    camera.updateProjectionMatrix();

});


// =====================================
// ILUMINAÇÃO
// =====================================

// Luz principal
const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    3
);

directionalLight.position.set(5, 5, 5);

scene.add(directionalLight);


// Luz ambiente
const ambientLight = new THREE.AmbientLight(
    5E0015,
    0.5
);

scene.add(ambientLight);


// Luz traseira (realça a silhueta)
const rimLight = new THREE.DirectionalLight(
    0xFF9ABF,
    1.2
);

rimLight.position.set(-5, 1, -5);

scene.add(rimLight);

// =====================================
// MATERIAL TOON
// =====================================

const toonMaterial = new THREE.MeshToonMaterial({
    color: 0xD7263D,
});


// =====================================
// CARREGA O MODELO
// =====================================

const loader = new GLTFLoader();

let modelo;

loader.load(

    "assets/eu.glb",

    (gltf) => {

        modelo = gltf.scene;

        modelo.traverse((child) => {

            if (!child.isMesh) return;

            // Mantém os olhos originais
            if (child.material.name === "Material.005") return;

            // Aplica o Toon no restante
            child.material = toonMaterial;

            // Sombras
            child.castShadow = true;
            child.receiveShadow = true;

        });

        modelo.scale.set(2.25, 2.25, 2.25);

        modelo.position.set(1,-1, 0);

        scene.add(modelo);

        console.log("Modelo carregado!");

    },

    undefined,

    (erro) => {

        console.error("Erro ao carregar:", erro);

    }

);


// =====================================
// MOUSE
// =====================================

let mouseX = 0;
let mouseY = 0;

let targetRotX = 0;
let targetRotY = 0;

window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


// =====================================
// ANIMAÇÃO
// =====================================

function animate() {

    requestAnimationFrame(animate);

    if (modelo) {

        const normalizadoX =
            ((mouseX / window.innerWidth) - 0.5) * 2;

        const normalizadoY =
            ((mouseY / window.innerHeight) - 0.5) * 2;

        targetRotY = normalizadoX * 0.35;
        targetRotX = normalizadoY * 0.35;

        // Rotação suave
        modelo.rotation.y = THREE.MathUtils.lerp(
            modelo.rotation.y,
            targetRotY,
            0.08
        );

        modelo.rotation.x = THREE.MathUtils.lerp(
            modelo.rotation.x,
            targetRotX,
            0.08
        );

    }

    renderer.render(scene, camera);

}

animate();