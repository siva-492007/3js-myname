import React from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const Text3D = () => {

    const scene = new THREE.Scene();

    const size = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    window.addEventListener('resize', () => {

        size.width = window.innerWidth;
        size.height = window.innerHeight;

        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();

        renderer.setSize(size.width, size.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const cursor = {
        x: 0,
        y: 0
    };

    window.addEventListener('mousemove', (event) => {
        cursor.x = event.clientX / size.width - 0.5;
        cursor.y = event.clientY / size.height - 0.5;
    });

    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load('/textures/matcaps/8.png');

    const fontLoader = new THREE.FontLoader();

    fontLoader.load(
        '/fonts/helvetiker_regular.typeface.json',
        (font) => {

            const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture});

            const textGeometry = new THREE.TextBufferGeometry('# $!v@007 #', {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegment: 5
            });

            textGeometry.center();

            const text = new THREE.Mesh(textGeometry, material);
            scene.add(text);

            const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);

            for (let i = 0; i < 300; i++) {
                const donut = new THREE.Mesh(donutGeometry, material);
                donut.position.x = (Math.random() - 0.5) * 10;
                donut.position.y = (Math.random() - 0.5) * 10;
                donut.position.z = (Math.random() - 0.5) * 10;

                donut.rotation.x = Math.random() * Math.PI;
                donut.rotation.y = Math.random() * Math.PI;

                const scale = Math.random();
                donut.scale.set(scale, scale, scale);

                scene.add(donut);
            }
        });


    const camera = new THREE.PerspectiveCamera(70, size.width / size.height, 0.1, 100)
    camera.position.z = 3;
    scene.add(camera);

    const canvas = document.querySelector('canvas.webgl');

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });

    renderer.setSize(size.width, size.height);

    const tick = () => {
        controls.update();
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    };

    tick();

    return (
        <>
        </>
    );
};

export default Text3D;