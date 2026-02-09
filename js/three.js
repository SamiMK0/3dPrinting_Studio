import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r152/three.module.min.js';
import { FontLoader } from 'https://threejs.org/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://threejs.org/examples/jsm/geometries/TextGeometry.js';

const container = document.getElementById('hero-3d-text');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.z = 60;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 20);
scene.add(directionalLight);

// Load font
const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font){
  const geometry = new TextGeometry('3D Printing by Mirvat', {
    font: font,
    size: 5,
    height: 2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.5,
    bevelSize: 0.3,
    bevelOffset: 0,
    bevelSegments: 5
  });

  geometry.center();

  const material = new THREE.MeshStandardMaterial({ color: 0xff6b00, metalness: 0.7, roughness: 0.3 });
  const textMesh = new THREE.Mesh(geometry, material);
  scene.add(textMesh);

  function animate() {
    requestAnimationFrame(animate);
    textMesh.rotation.y += 0.01;
    textMesh.rotation.x = Math.sin(Date.now()*0.001)*0.05;
    renderer.render(scene, camera);
  }
  animate();
});

// Resize
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});