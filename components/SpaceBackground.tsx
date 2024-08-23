"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

const SpaceBackground = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;
        camera.rotation.x = Math.PI / 2;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        mountRef.current?.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const handleResize = () => {
            if (rendererRef.current) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                rendererRef.current.setSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        const starGeo = new THREE.BufferGeometry();
        const starVertices = [];

        for (let i = 0; i < 6000; i++) {
            const x = Math.random() * 600 - 300;
            const y = Math.random() * 600 - 300;
            const z = Math.random() * 600 - 300;
            starVertices.push(x, y, z);
        }

        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

        const sprite = new THREE.TextureLoader().load('/star.png');
        const starMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.4,
            map: sprite,
            transparent: true,
            alphaTest: 0.5,
        });

        const stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);

        const animate = () => {
            const positions = starGeo.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= 2;
                if (positions[i + 1] < -200) {
                    positions[i + 1] = 200;
                }
            }
            starGeo.attributes.position.needsUpdate = true;
            stars.rotation.y += 0.002;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (rendererRef.current) {
                mountRef.current?.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
                rendererRef.current = null;
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={mountRef} style={{ height: '100%', width: '100vw' }} />;
};

export default SpaceBackground;