function PointComp() {
  return (
    <div className="pl-5 flex flex-col flex-1 mt-10">
      <div className="title flex flex-row items-center justify-between border-b pb-5">
        <span className="font-bold text-lg">포인트</span>
        <div className="text-base">
          <span>보유 포인트</span>
          <span className="font-bold">1,000 BP</span>
        </div>
      </div>
      <span className="text-base mt-5 mb-3 mx-2">적립 및 사용 내역</span>
      {[1, 2].map((list, index) => {
        return (
          <div className="flex justify-between flex-row mx-2 mb-3" key={index}>
            <div className="flex flex-row text-xs text-subContent space-x-3">
              <span>2022/12/05</span>
              <span>구매 포인트 적립</span>
            </div>
            <span className="font-bold text-xs text-main">+ 1,000</span>
          </div>
        );
      })}
    </div>
  );
}

export default PointComp;
