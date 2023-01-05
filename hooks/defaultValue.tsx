import { useEffect } from "react";
import client from "@lib/api";
import { useRecoilState } from "recoil";
import { userInfo, userPoint } from "../recoil/user";

const useUserInfo = () => {
  const [_, setPoint] = useRecoilState(userPoint);
  const [__, setInfo] = useRecoilState(userInfo);

  const fetchUserPoint = async () => {
    const response = await client.get("accounts/point");
    setPoint(response.data);
  };

  const fetchUserInfo = async () => {
    const response = await client.get("accounts/me");
    setInfo(response.data.results);
  };

  useEffect(() => {
    fetchUserPoint().then();
    fetchUserInfo().then();
  }, []);
};

export default useUserInfo;
