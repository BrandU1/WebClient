import { useRouter } from "next/router";
import Link from "next/link";

function PriceBar() {
  const router = useRouter();
  console.log(router.route);

  return (
    <div className="border border-main rounded-xl flex flex-col w-64 h-80 sticky top-40">
      <div className="flex flex-row justify-between pt-5">
        <div className="flex flex-col space-y-2 text-subContent text-sm items-start px-5 mt-2">
          <p>주문금액</p>
          <p>배송비</p>
          {router.route == "/order/1/pay" && (
            <>
              <p>쿠폰 사용</p>
              <p>포인트 사용</p>
            </>
          )}
          <p className="text-base text-black">합계 금액</p>
        </div>
        <div className="flex flex-col space-y-2 text-sm items-end px-5 mt-2">
          <p>33,000원</p>
          <p>33,000원</p>
          {router.route == "/order/1/pay" && (
            <>
              <p>-1,000원</p>
              <p>0원</p>
            </>
          )}
          <p className="text-base font-bold">33,000원</p>
        </div>
      </div>
      {router.route == "/order/1" ? (
        <Link
          href={"./pay"}
          className="w-56 h-11 bg-main rounded-xl text-white font-bold text-base flex justify-center items-center m-auto mb-2"
        >
          <button>결제하기</button>
        </Link>
      ) : (
        <button className="w-56 h-11 bg-main rounded-xl text-white font-bold text-base flex justify-center items-center m-auto mb-2">
          결제하기
        </button>
      )}
    </div>
  );
}

export default PriceBar;
