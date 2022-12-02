import Link from "next/link";
import { useEffect, useState } from "react";

function SubMenu() {
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/";
  };

  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setToken(localStorage.getItem("access_token"));
    }
  });
  return (
    <div className=" m-auto max-w-4xl z-50 bg-white">
      <div className="text-xs m-auto  font-normal flex py-2 justify-end space-x-4 text-notice ">
        <Link href="/notice">
          <p className="cursor-pointer">공지사항</p>
        </Link>
        <Link href="/service">
          <p className="cursor-pointer">고객센터</p>
        </Link>
        <p
          onClick={logout}
          className={`${token ? "block" : "hidden"} cursor-pointer`}
        >
          로그아웃
        </p>
      </div>
    </div>
  );
}

export default SubMenu;
