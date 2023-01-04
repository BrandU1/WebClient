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
        src="/dummy/Astronaut.glb"
        ar
        alt="A 3D model of a sphere"
      ></model-viewer>
    </>
  );
}

export default ModelViewer;
