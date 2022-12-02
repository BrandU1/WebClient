function Service() {
  return (
    <div className=" m-auto ">
      <div>
        <h2 className="py-5 font-bold text-xl">고객센터</h2>
        <div className="border-[1px] border-black" />
      </div>
      <div className="grid grid-cols-2 space-x-6 py-3 border-b-[1px] border-[#EDEDED]">
        <div className="left">
          <div className="flex justify-between items-center">
            <h3 className="text-base">서비스 주요 안내</h3>
            <p className="text-xs text-notice">전체보기</p>
          </div>
          <div className="text-sm py-3 space-y-2 text-subContent">
            <p>브랜뉴 이용 안내</p>
            <p>배송 / 환불 관련 안내</p>
            <p>상품 판매등록 안내</p>
            <p>커스터마이징 안내</p>
          </div>
        </div>
        <div className="right">
          <div className="flex justify-between items-center">
            <h3 className="text-base">서비스 주요 안내</h3>
            <p className="text-xs text-notice">전체보기</p>
          </div>
          <div className="text-sm py-3 space-y-2 text-subContent">
            <p>모바일에서도 커스터마이징을 할 수 있나요?</p>
            <p>주문 후 취소시 수수료가 부과되나요?</p>
            <p>결제 영수증은 어떻게 확인하나요?</p>
            <p>박재현은 천재인가요?</p>
          </div>
        </div>
      </div>
      <div className="py-3 border-b-[1px] border-[#EDEDED]">
        <h1>1:1 문의내역</h1>
        <p className="text-sm py-3 text-subContent ">문의내역이 없습니다.</p>
      </div>
      <div className="flex justify-center py-10">
        <button className="text-main text-base border-[1px] border-main rounded-xl w-[259px] h-[45px] flex justify-center items-center">
          1:1 문의하기
        </button>
      </div>
    </div>
  );
}

export default Service;
