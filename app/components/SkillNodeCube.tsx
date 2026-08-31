"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function SkillNodeCube() {
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

    const cubeGroup = new THREE.Group();

    // Outer Box Wireframe
    const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    cubeGroup.add(boxMesh);

    // Inner Core Solid Cube
    const innerGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const innerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#7b61ff"),
      emissive: new THREE.Color("#5b21b6"),
      roughness: 0.2,
      metalness: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    cubeGroup.add(innerMesh);

    scene.add(cubeGroup);

    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      cubeGroup.rotation.x = elapsed * 0.9;
      cubeGroup.rotation.y = elapsed * 1.3;
      innerMesh.rotation.z = -elapsed * 2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      boxGeo.dispose();
      boxMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[100px] h-[100px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-115"
      title="3D Holographic Tech Cube"
    />
  );
}
