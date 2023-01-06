import { useEffect } from "react";
import client from "@lib/api";
import { useRecoilState } from "recoil";
import { userInfo, userPoint } from "../recoil/user";

const useUserInfo = () => {
  const [_, setPoint] = useRecoilState(userPoint);
  const [__, setInfo] = useRecoilState(userInfo);

  const fetchUserPoint = async () => {
    try {
      if (localStorage.getItem("accessToken")) {
        const response = await client.get("accounts/point");
        setPoint(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      if (localStorage.getItem("accessToken")) {
        const response = await client.get("accounts/me");
        setInfo(response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserPoint().then();
    fetchUserInfo().then();
  }, []);
};

export default useUserInfo;
