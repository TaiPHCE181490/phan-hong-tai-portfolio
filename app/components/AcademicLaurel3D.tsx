"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function AcademicLaurel3D() {
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

    const starGroup = new THREE.Group();

    // 3D Star Polyhedron
    const geo = new THREE.OctahedronGeometry(0.9, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#fbbf24"),
      emissive: new THREE.Color("#d4af37"),
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    });
    const mesh = new THREE.Mesh(geo, mat);
    starGroup.add(mesh);

    // Orbiting Ring
    const ringGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 4;
    starGroup.add(ringMesh);

    scene.add(starGroup);

    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      mesh.rotation.y = elapsed * 1.2;
      mesh.rotation.x = Math.sin(elapsed) * 0.3;
      ringMesh.rotation.z = elapsed * 2;

      starGroup.position.y = Math.sin(elapsed * 2) * 0.06;

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
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[100px] h-[100px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-115"
      title="3D Academic Star"
    />
  );
}
