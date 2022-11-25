import Image from "next/image";

interface PickProps {
    li_height: number;
    li_width: number;
    bg_height: number;
    bg_width: number;
}

function Pick({ li_height, li_width, bg_height, bg_width }: PickProps) {
    return (
        <div>
            <button
                className={`w-[${bg_width}px] h-[${bg_height}px] bg-gray rounded-xl flex justify-center items-center`}
            >
                <Image
                    src={"/logo/heart.svg"}
                    height={li_height}
                    width={li_width}
                    alt={"pickBtn"}
                />
            </button>
        </div>
    );
}

export default Pick;
