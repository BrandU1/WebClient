import Link from "next/link";

function SubMenu() {
  return (
    <div className="m-auto max-w-4xl bg-white">
      <div className="text-xs font-normal flex py-2 justify-end space-x-4 text-notice ">
        <Link href="/notice">
        <p className="cursor-pointer">공지사항</p>
        </Link>
        <Link href="/service">
        <p className="cursor-pointer">고객센터</p>
        </Link>
        <p className="cursor-pointer">로그아웃</p>
      </div>
    </div>
  );
}

export default SubMenu;
