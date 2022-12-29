import { MainInfoInterface } from "../../../../types/service";

interface MainInfoDetailProp {
  detail: MainInfoInterface;
}

function MainInfoDetail({ detail }: any) {
  return (
    <div className="m-auto">
      <div>
        <h2 className="py-5 font-bold text-xl">고객센터 ＞ 서비스 주요 안내</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="flex flex-col">
        <div className="border-b border-gray mt-5 pb-5 flex justify-between px-5">
          <p>{detail.title}</p>
          <p className="text-sm text-subContent">
            {String(detail.created)?.substring(0, 10)}
          </p>
          <p className="mt-5 text-sm">{detail.description}</p>
        </div>
      </div>
    </div>
  );
}
export default MainInfoDetail;
