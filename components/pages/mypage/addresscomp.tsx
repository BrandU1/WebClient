function AddressComp() {
  return (
    <div className="flex flex-col px-5 mt-10 flex-1">
      <div className="border-b pb-5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">배송지 관리</span>
          <button className="w-24 h-9 flex justify-center items-center text-white bg-main rounded-xl">
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressComp;
