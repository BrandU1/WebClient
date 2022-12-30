import Image from "next/image";

interface ImgProps {
  exist: string | null; //src 이미지 경로
  src: string;
  width: number;
  height: number;
  alt: string;
}
function ImgAtom({ exist, src, width, height, alt }: ImgProps) {
  return (
    <>
      {exist != null ? (
        <Image
          className="rounded-xl"
          src={src}
          width={width}
          height={width}
          alt={alt}
        />
      ) : (
        <Image
          src={`https://via.placeholder.com/${width}x${height}?text=loading...`}
          alt={alt}
          width={width}
          height={width}
        />
      )}
    </>
  );
}

export default ImgAtom;
