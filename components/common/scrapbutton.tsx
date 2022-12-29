import Image from "next/image";

interface ScrapProps {
  width: number;
  height: number;
}

function ScrapButton({ width, height }: ScrapProps) {
  return (
    <div className={`p-2 bg-gray rounded-xl`}>
      <Image
        src={"/logo/scrap.svg"}
        alt={"scrap"}
        width={width}
        height={height}
      />
    </div>
  );
}

export default ScrapButton;
