export const getImageRatio = (image: string) => {
  const newImage = new Image();
  newImage.src = image;

  return `${newImage.width}/${newImage.height}`;
};

export const svgToImage = (svg: string) => {
  // const canvas = document.createElement("canvas");
  // const ctx = canvas.getContext("2d");
  // const img = new Image();
  //
  // img.src = "data:image/svg+xml;base64," + btoa(svg);
  // img.onload = () => {
  //   canvas.width = img.width;
  //   canvas.height = img.height;
  //   ctx?.drawImage(img, 0, 0);
  //   console.log(canvas.toDataURL());
  // };
  //
  // return canvas.toDataURL();
  const blob = new Blob([svg], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
};
