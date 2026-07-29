// =====================================
// IMPORTS
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
// CAMERA
// =====================================

const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
);

camera.position.set(0,0,15);


// =====================================
// RENDERER
// =====================================

const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio,2)
);

container.appendChild(renderer.domElement);


// =====================================
// LUZES
// =====================================

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    3
);

directionalLight.position.set(5,5,5);

scene.add(directionalLight);


const ambientLight = new THREE.AmbientLight(
    0x5E0015,
    0.5
);

scene.add(ambientLight);


const rimLight = new THREE.DirectionalLight(
    0xFF9ABF,
    1.2
);

rimLight.position.set(-5,1,-5);

scene.add(rimLight);


// =====================================
// MATERIAL
// =====================================

const toonMaterial = new THREE.MeshToonMaterial({

    color:0xD7263D

});


// =====================================
// VARIÁVEIS
// =====================================

const loader = new GLTFLoader();

let modelo;

let mouseX = 0;
let mouseY = 0;

let gyroX = 0;
let gyroY = 0;

let targetRotX = 0;
let targetRotY = 0;


// =====================================
// AJUSTA TAMANHO DO MODELO
// =====================================

function ajustarModelo(){

    if(!modelo) return;

    if(window.innerWidth <= 768){

        modelo.position.set(0,-1,0);
        modelo.scale.set(1.8,1.8,1.8);

    }else{

        modelo.position.set(1,-1,0);
        modelo.scale.set(2.25,2.25,2.25);

    }

}


// =====================================
// RESPONSIVIDADE
// =====================================

window.addEventListener("resize",()=>{

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    camera.aspect =
        container.clientWidth /
        container.clientHeight;

    camera.updateProjectionMatrix();

    ajustarModelo();

});


// =====================================
// CARREGA MODELO
// =====================================

loader.load(

    "assets/eu.glb",

    (gltf)=>{

        modelo = gltf.scene;

        modelo.traverse((child)=>{

            if(!child.isMesh) return;

            if(child.material.name === "Material.005") return;

            child.material = toonMaterial;

            child.castShadow = true;
            child.receiveShadow = true;

        });

        ajustarModelo();

        scene.add(modelo);

        console.log("Modelo carregado");

    },

    undefined,

    (erro)=>{

        console.error(erro);

    }

);


// =====================================
// MOUSE
// =====================================

window.addEventListener("mousemove",(event)=>{

    mouseX = event.clientX;
    mouseY = event.clientY;

});


// =====================================
// GIROSCÓPIO
// =====================================

function atualizarGiroscopio(event){

    gyroX = event.beta || 0;
    gyroY = event.gamma || 0;

}

async function ativarGiroscopio(){

    if(
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
    ){

        const permission =
            await DeviceOrientationEvent.requestPermission();

        if(permission === "granted"){

            window.addEventListener(
                "deviceorientation",
                atualizarGiroscopio
            );

        }

    }else{

        window.addEventListener(
            "deviceorientation",
            atualizarGiroscopio
        );

    }

}

document.body.addEventListener(
    "click",
    ativarGiroscopio,
    {once:true}
);


// =====================================
// ANIMAÇÃO
// =====================================

function animate(){

    requestAnimationFrame(animate);

    if(modelo){

        const isTouch =
            window.matchMedia("(pointer: coarse)").matches;

        if(isTouch){

            targetRotY =
                THREE.MathUtils.degToRad(gyroY)*0.4;

            targetRotX =
                THREE.MathUtils.degToRad(gyroX-45)*0.2;

        }else{

            const normalizadoX =
                ((mouseX/window.innerWidth)-0.5)*2;

            const normalizadoY =
                ((mouseY/window.innerHeight)-0.5)*2;

            targetRotY =
                normalizadoX*0.35;

            targetRotX =
                normalizadoY*0.35;

        }

        modelo.rotation.y =
            THREE.MathUtils.lerp(
                modelo.rotation.y,
                targetRotY,
                0.08
            );

        modelo.rotation.x =
            THREE.MathUtils.lerp(
                modelo.rotation.x,
                targetRotX,
                0.08
            );

    }

    renderer.render(scene,camera);

}

animate();