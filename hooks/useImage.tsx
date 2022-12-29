import { useEffect, useState } from "react";

const useImage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imgBase64s, setImgBase64s] = useState<string[]>([]);
  const [size, setSize] = useState<number>(0);

  useEffect(() => {}, [size]);

  const handleChangeFile = (event: any) => {
    const reader = new FileReader();

    if (!event.target.files) {
      return;
    }

    setSize((prev) => prev + 1);

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64s((prev) => [...prev, base64.toString()]);
      }
    };

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setImages((prev) => [...prev, event.target.files![0].name]);
    }
  };

  return { size, images, imgBase64s, handleChangeFile };
};

export default useImage;
