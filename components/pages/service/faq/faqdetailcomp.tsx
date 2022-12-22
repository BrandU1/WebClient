function FaqDetailComp({ data }: any) {
  return (
    <div className="m-auto">
      <div>
        <h2 className="py-5 font-bold text-xl">고객센터 ＞ 자주 묻는 질문</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="flex flex-col">
        <div className="border-b border-gray mt-5 pb-5 flex justify-between px-5">
          <p>{data.title}</p>
          <p className="text-sm text-subContent">
            {String(data.created)?.substring(0, 10)}
          </p>
          <p className="mt-5 text-sm">{data.description}</p>
        </div>
      </div>
    </div>
  );
}

export default FaqDetailComp;
