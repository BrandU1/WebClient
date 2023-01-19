import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { GLTF, GLTFLoader } from "three-stdlib";
import * as THREE from "three";
import { Mesh } from "three";
import { OrbitControls } from "@react-three/drei";

interface ViewerProps {
  object: string;
}

const Viewer = ({ object }: ViewerProps) => {
  // const camera = new PerspectiveCamera();
  return (
    <div className="w-96 h-96">
      <Canvas>
        <ThreeModel object={object} />
      </Canvas>
    </div>
  );
};

type GLTFResult = GLTF & {
  nodes: {
    Mesh: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

interface ModelProps {
  object: string;
}

const ThreeModel = ({ object }: ModelProps) => {
  const mesh = useRef<Mesh>(null);
  const { camera } = useThree();
  const loader = useLoader(GLTFLoader, object);

  return (
    <mesh ref={mesh}>
      <ambientLight />
      <primitive object={loader.scene} />
      <OrbitControls enableDamping={true} />
    </mesh>
  );
};

export default Viewer;
