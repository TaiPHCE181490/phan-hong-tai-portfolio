"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ProjectCrystalOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

    // 3D Crystal Gem Geometry
    const gemGroup = new THREE.Group();

    const geo = new THREE.IcosahedronGeometry(1, 0);
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#d4af37"),
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      ior: 1.5,
      clearcoat: 1,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    gemGroup.add(mesh);

    // Wireframe Outer Layer
    const wireGeo = new THREE.IcosahedronGeometry(1.08, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    gemGroup.add(wireMesh);

    scene.add(gemGroup);

    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      gemGroup.rotation.x = elapsed * 0.8;
      gemGroup.rotation.y = elapsed * 1.2;
      wireMesh.rotation.z = -elapsed * 1.5;

      gemGroup.position.y = Math.sin(elapsed * 2.5) * 0.08;

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
      wireGeo.dispose();
      wireMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-[100px] h-[100px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-115"
      title="3D Project Prism"
    />
  );
}
