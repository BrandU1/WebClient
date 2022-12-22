export const getImageRatio = (image: string) => {
  const newImage = new Image();
  newImage.src = image;

  return `${newImage.width}/${newImage.height}`;
};
