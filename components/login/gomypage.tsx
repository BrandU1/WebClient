import Link from "next/link";

interface GoToMyPageProps {
  open: boolean;
  pageRef: React.ForwardedRef<HTMLDivElement>;
}

function GOTOMyPage({ open, pageRef }: GoToMyPageProps) {
  return (
    <>
      {open ? (
        <div className={` max-w-5xl m-auto flex justify-end pr-7 `}>
          <div className="rounded-lg border-[1px] border-main w-28 text-center absolute bg-white ml-3 ">
            <div className="py-3 hover:bg-[#CEEEEE] rounded-t-lg">
              <Link href="/mypage">
                <p>주문/배송</p>
              </Link>
            </div>
            <div className="py-3 hover:bg-[#CEEEEE] rounded-b-lg">
              <p>마이페이지</p>
            </div>
            {/*<div className="py-3">*/}
            {/*  <p>프로필</p>*/}
            {/*</div>*/}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default GOTOMyPage;
