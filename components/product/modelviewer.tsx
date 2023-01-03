import { useEffect } from "react";
import { ModelViewerElement } from "@google/model-viewer";

declare namespace JSX {
  interface IntrinsicElements {
    // @ts-ignore
    "model-viewer": ModelViewerElement;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // @ts-ignore
      "model-viewer": ModelViewerElement;
    }
  }
}

interface ModellingProps {
  src: string;
}

function ModelViewer({ src }: ModellingProps) {
  // @ts-ignore
  useEffect(() => {
    const script = document.createElement("script");
    const modelViewerVariants = document.querySelector("model-viewer#sphere");
    // const select = document.querySelector("#variant");

    // modelViewerVariants?.addEventListener("load", () => {
    //   const names = modelViewerVariants.availableVariants;
    //   for (const name of names) {
    //     const option = document.createElement("option");
    //     option.value = name;
    //     option.textContent = name;
    //     select?.appendChild(option);
    //   }
    //
    //   const option = document.createElement("option");
    //   option.value = "default";
    //   option.textContent = "Default";
    //   select?.appendChild(option);
    // });

    // select?.addEventListener("input", (event) => {
    //   modelViewerVariants?.variantName =
    //     // @ts-ignore
    //     event.target?.value === "default" ? null : event.target?.value;
    // });

    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <>
      <model-viewer
        id="reveal"
        loading="eager"
        camera-controls
        touch-action="pan-y"
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
