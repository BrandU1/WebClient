import { useEffect } from "react";
import { ModelViewerElement } from "@google/model-viewer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // @ts-ignore
      "model-viewer": ModelViewerElement;
    }
  }
}

function ModelViewer() {
  return (
    <>
      <model-viewer
        id="sphere"
        camera-controls
        touch-action="pan-y"
        interaction-prompt="none"
        loading="eager"
        auto-rotate
        poster="https://modelviewer.dev/assets/poster-shishkebab.webp"
        src="/dummy/scene.gltf"
        shadow-intensity="1"
        alt="A 3D model of a shishkebab"
      ></model-viewer>
    </>
  );
}

export default ModelViewer;
