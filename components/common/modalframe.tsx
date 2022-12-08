import Image from "next/image";

interface ModalProps {
  close: () => void;
  blur: (e: any) => void;
  pageRef: React.ForwardedRef<HTMLDivElement>;
  width: number;
  height: number;
  title: string; //Modal 타이틀
  components: any; //Modal 내용
  bgColor: string; // default:black, modal 겹칠 때:none
}

function ModalFrame({
  close,
  blur,
  pageRef,
  width,
  height,
  title,
  components,
  bgColor,
}: ModalProps) {
  return (
    <div
      className={`fixed top-0 top-0 left-0 z-50 w-full h-[140vh] bg-${bgColor} bg-opacity-40`}
      onClick={blur}
    >
      <div className="mt-[70px] flex justify-center items-center">
        <div ref={pageRef}>
          <div className={`flex flex-row h-[${height}px] w-[${width}px]`}>
            <div className="w-full h-full bg-modalBackground rounded-2xl p-8">
              <div className="flex flex-col">
                <div>
                  <Image
                    onClick={close}
                    src={"/logo/backBtn.svg"}
                    alt={"backBtn"}
                    width={16}
                    height={16}
                  />
                </div>
                <div className="flex flex-col justify-center items-center mt-2">
                  <span className="font-bold text-xl flex justify-center items-center">
                    {title}
                  </span>
                  {components}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalFrame;
