"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function TimelineClock3D() {
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

    const pointLight = new THREE.PointLight(0xfbbf24, 4, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    const astrolabeGroup = new THREE.Group();

    // Outer Ring
    const outerGeo = new THREE.TorusGeometry(1.1, 0.04, 16, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d4af37"),
      metalness: 0.9,
      roughness: 0.2,
    });
    const outerMesh = new THREE.Mesh(outerGeo, goldMat);
    astrolabeGroup.add(outerMesh);

    // Middle Ring
    const midGeo = new THREE.TorusGeometry(0.8, 0.03, 16, 64);
    const blueMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#38bdf8"),
      metalness: 0.8,
      roughness: 0.2,
    });
    const midMesh = new THREE.Mesh(midGeo, blueMat);
    midMesh.rotation.x = Math.PI / 3;
    astrolabeGroup.add(midMesh);

    // Inner Core Sphere
    const coreGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    astrolabeGroup.add(coreMesh);

    scene.add(astrolabeGroup);

    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      outerMesh.rotation.z = elapsed * 0.8;
      midMesh.rotation.y = elapsed * 1.5;
      midMesh.rotation.x = Math.PI / 3 + Math.sin(elapsed) * 0.2;
      astrolabeGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      outerGeo.dispose();
      midGeo.dispose();
      coreGeo.dispose();
      goldMat.dispose();
      blueMat.dispose();
      coreMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[100px] h-[100px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-115"
      title="3D Cosmic Timeline Astrolabe"
    />
  );
}
