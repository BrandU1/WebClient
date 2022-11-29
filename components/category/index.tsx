import Image from "next/image";

function Category() {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-6 pt-5 pb-40  w-[700px] ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
          return (
            <div key={index} className="text-center w-[100px] pt-4 ">
              <div>
                {/*<div className="bg-white w-[100px] h-[100px] rounded-lg" />*/}
                <Image
                  className="rounded-lg"
                  src="/dummy/dongyeong.png"
                  width={100}
                  height={100}
                  alt="한동연"
                />
                <p className="my-3 text-sm text-subContent">한동연</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-auto w-[110px] bg-white border-[1px] border-main text-center">
        {[1, 2, 3, 4, 5, 6].map((item, index) => {
          return (
            <div key={index} className="py-6">
              <p className="font-normal text-sm">한동연</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
