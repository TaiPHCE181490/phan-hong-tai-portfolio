"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Artistic3DMascotProps {
  themeColor?: string;
}

export function Artistic3DMascot({ themeColor = "#d4af37" }: Artistic3DMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const themeColorRef = useRef<THREE.Color>(new THREE.Color(themeColor));

  useEffect(() => {
    themeColorRef.current.set(themeColor);
  }, [themeColor]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = 110;
    const height = 110;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xfbbf24, 3, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const mascotGroup = new THREE.Group();

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#d4af37"),
      emissive: new THREE.Color("#2a1b4e"),
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const headGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const headMesh = new THREE.Mesh(headGeo, bodyMaterial);
    mascotGroup.add(headMesh);

    const earGeo = new THREE.ConeGeometry(0.3, 0.5, 16);
    const earMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#e5c158"),
      roughness: 0.3,
    });

    const leftEar = new THREE.Mesh(earGeo, earMaterial);
    leftEar.position.set(-0.45, 0.75, 0.1);
    leftEar.rotation.z = 0.3;
    leftEar.rotation.x = -0.1;
    mascotGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, earMaterial);
    rightEar.position.set(0.45, 0.75, 0.1);
    rightEar.rotation.z = -0.3;
    rightEar.rotation.x = -0.1;
    mascotGroup.add(rightEar);

    const eyeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(themeColor),
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    leftEye.position.set(-0.28, 0.15, 0.72);
    mascotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    rightEye.position.set(0.28, 0.15, 0.72);
    mascotGroup.add(rightEye);

    const pupilGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x080c16 });

    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(-0.28, 0.15, 0.82);
    mascotGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(0.28, 0.15, 0.82);
    mascotGroup.add(rightPupil);

    const ringGeo = new THREE.TorusGeometry(1.1, 0.03, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(themeColor),
      emissive: new THREE.Color(themeColor),
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });
    const haloRing = new THREE.Mesh(ringGeo, ringMat);
    haloRing.rotation.x = Math.PI / 3;
    mascotGroup.add(haloRing);

    scene.add(mascotGroup);

    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Lerp eye and ring colors to themeColorRef
      eyeMaterial.color.lerp(themeColorRef.current, 0.05);
      ringMat.color.lerp(themeColorRef.current, 0.05);
      ringMat.emissive.lerp(themeColorRef.current, 0.05);
      bodyMaterial.color.lerp(themeColorRef.current, 0.03);

      mascotGroup.position.y = Math.sin(elapsed * 2) * 0.12;

      haloRing.rotation.z = elapsed * 1.5;
      haloRing.rotation.y = Math.sin(elapsed) * 0.3;

      const targetRotY = mouse.x * 0.6;
      const targetRotX = -mouse.y * 0.4;
      mascotGroup.rotation.y += (targetRotY - mascotGroup.rotation.y) * 0.08;
      mascotGroup.rotation.x += (targetRotX - mascotGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      headGeo.dispose();
      bodyMaterial.dispose();
      earGeo.dispose();
      earMaterial.dispose();
      eyeGeo.dispose();
      eyeMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[110px] h-[110px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
      title="3D Spirit Companion"
    >
      <div
        className={`absolute inset-0 rounded-full bg-white/10 blur-md transition-opacity duration-300 ${
          isHovered ? "opacity-100 scale-125" : "opacity-40"
        }`}
      />
    </div>
  );
}
