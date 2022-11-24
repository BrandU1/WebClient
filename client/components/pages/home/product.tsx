import Image from "next/image";

function Product() {
  return (
    <div className="max-w-4xl m-auto px-2">
      <div className="flex justify-between text-xs">
        <p>오늘 하루만 싸게사는 초특가 상품</p>
        <p className="text-notice cursor-pointer">전체보기</p>
      </div>
      <h2 className="font-bold">브랜뉴 오늘의 핫딜</h2>
      <div className="list columns-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          return (
            <div key={index} className="py-3">
              <Image
                className="rounded-2xl"
                src="/dummy/productlist.png"
                alt="list"
                width={156}
                height={200}
              />
              <div className="mt-4 ">
                <p className="text-notice text-sm">미어캣</p>
                <p className="font-bold">900,000 원</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
