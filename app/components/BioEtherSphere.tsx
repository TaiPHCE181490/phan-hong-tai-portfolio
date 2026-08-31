"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function BioEtherSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = 100;
    const height = 100;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xc084fc, 4, 10);
    pointLight.position.set(2, 3, 3);
    scene.add(pointLight);

    // Dynamic Vertex Liquid Shader Sphere
    const geo = new THREE.SphereGeometry(0.95, 48, 48);
    const initialPositions = geo.attributes.position.clone();

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2a1b4e"),
      roughness: 0.15,
      metalness: 0.85,
      emissive: new THREE.Color("#7b61ff"),
      emissiveIntensity: 0.4,
    });

    const sphereMesh = new THREE.Mesh(geo, mat);
    scene.add(sphereMesh);

    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Vertex displacement liquid wave effect
      const posAttr = geo.attributes.position;
      const posArray = posAttr.array as Float32Array;
      const initArray = initialPositions.array as Float32Array;

      for (let i = 0; i < posAttr.count; i++) {
        const x = initArray[i * 3];
        const y = initArray[i * 3 + 1];
        const z = initArray[i * 3 + 2];

        const wave = Math.sin(x * 3 + elapsed * 3) * Math.cos(y * 3 + elapsed * 2) * 0.12;

        posArray[i * 3] = x + (x / 0.95) * wave;
        posArray[i * 3 + 1] = y + (y / 0.95) * wave;
        posArray[i * 3 + 2] = z + (z / 0.95) * wave;
      }

      posAttr.needsUpdate = true;
      geo.computeVertexNormals();

      sphereMesh.rotation.y = elapsed * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      initialPositions.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[100px] h-[100px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-115"
      title="3D Liquid Ether Sphere"
    />
  );
}
