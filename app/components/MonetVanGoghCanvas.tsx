"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface MonetVanGoghCanvasProps {
  themeColor?: string;
}

export function MonetVanGoghCanvas({ themeColor = "#d4af37" }: MonetVanGoghCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const themeColorRef = useRef<THREE.Color>(new THREE.Color(themeColor));

  useEffect(() => {
    themeColorRef.current.set(themeColor);
  }, [themeColor]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080c16, 0.03);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Mouse tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Scroll tracking
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);

    // 1. Refined Monet & Van Gogh Shader Plane
    const planeGeometry = new THREE.PlaneGeometry(55, 35, 64, 64);
    const planeUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color("#080c16") },
      uColor2: { value: new THREE.Color("#122436") },
      uColor3: { value: new THREE.Color("#2a2342") },
      uColor4: { value: new THREE.Color(themeColor) }, // Dynamic theme color!
    };

    const planeShaderMaterial = new THREE.ShaderMaterial({
      uniforms: planeUniforms,
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          vUv = uv;
          vec3 pos = position;

          float wave1 = sin(pos.x * 0.35 + uTime * 0.7) * cos(pos.y * 0.35 + uTime * 0.5);
          float wave2 = sin(pos.x * 0.7 - uTime * 0.4) * sin(pos.y * 0.7 + uTime * 0.6) * 0.4;
          
          float dist = distance(uv, uMouse * 0.5 + 0.5);
          float ripple = sin(dist * 18.0 - uTime * 2.5) * exp(-dist * 2.8) * 0.6;

          pos.z += (wave1 + wave2 + ripple) * 1.2;
          vElevation = pos.z;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          float mixStrength = (vElevation + 1.2) / 2.4;
          vec3 color = mix(uColor1, uColor2, vUv.y);
          color = mix(color, uColor3, mixStrength * 0.6);

          float highlight = pow(clamp(mixStrength, 0.0, 1.0), 3.5);
          color += uColor4 * highlight * 0.4;

          float alpha = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x) *
                        smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);

          gl_FragColor = vec4(color, alpha * 0.75);
        }
      `,
      transparent: true,
      depthWrite: false,
      wireframe: false,
    });

    const backgroundMesh = new THREE.Mesh(planeGeometry, planeShaderMaterial);
    backgroundMesh.position.z = -5;
    scene.add(backgroundMesh);

    // 2. Harmonious Glowing Starlight & Water Lily Petal Particles
    const particleCount = 220;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 + 2;

      scales[i] = Math.random() * 0.3 + 0.12;

      speeds[i * 3] = (Math.random() - 0.5) * 0.006;
      speeds[i * 3 + 1] = Math.random() * 0.01 + 0.003;
      speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.006;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.7)");
    gradient.addColorStop(0.75, "rgba(147,197,253,0.2)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.75,
      map: particleTexture,
      transparent: true,
      color: new THREE.Color(themeColor),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Resize listener
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smoothly lerp uniform uColor4 & particleMaterial color to active themeColorRef
      planeUniforms.uColor4.value.lerp(themeColorRef.current, 0.05);
      particleMaterial.color.lerp(themeColorRef.current, 0.05);

      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      planeUniforms.uTime.value = elapsedTime;
      planeUniforms.uMouse.value.set(mouse.x, mouse.y);

      camera.position.x = mouse.x * 1.2;
      camera.position.y = mouse.y * 1.2 - scrollY * 0.004;
      camera.lookAt(0, -scrollY * 0.004, 0);

      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const positionsArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        positionsArray[i * 3] += speeds[i * 3] + Math.sin(elapsedTime + i) * 0.002;
        positionsArray[i * 3 + 1] += speeds[i * 3 + 1];
        positionsArray[i * 3 + 2] += speeds[i * 3 + 2];

        if (positionsArray[i * 3 + 1] > 18) {
          positionsArray[i * 3 + 1] = -18;
        }
        if (Math.abs(positionsArray[i * 3]) > 25) {
          positionsArray[i * 3] = (Math.random() - 0.5) * 45;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planeGeometry.dispose();
      planeShaderMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
