import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeJS = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
      });
      renderer.outputEncoding = THREE.sRGBEncoding;
      const camera = new THREE.PerspectiveCamera(50, 1); // 화각 설정 종횡비 설정
      camera.position.set(0, 0, 10);
      const loader = new GLTFLoader();
      scene.background = new THREE.Color("white");
      const light = new THREE.DirectionalLight(0xffffff);
      scene.add(light);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();
      loader.load("/dummy/sce.glb", (object) => {
        scene.add(object.scene);
        const animate = () => {
          requestAnimationFrame(animate);
          // object.scene.rotation.y += 0.01; // 자동 회전
          renderer.render(scene, camera);
          controls.update();
        };
        animate();
        // console.log(camera.updateProjectionMatrix());
      });
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} id="canvas" width="400" height="400"></canvas>
    </div>
  );
};
export default ThreeJS;
