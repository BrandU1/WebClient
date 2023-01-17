import { useEffect } from "react";
import client from "@lib/api";
import { useRecoilState } from "recoil";
import { userInfo, userPoint } from "../recoil/user";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, UserInterface } from "../types/privacy";

const useUserInfo = () => {
  const [myPoint, setMyPoint] = useRecoilState(userPoint);
  const [myInfo, setMyInfo] = useRecoilState(userInfo);

  const fetchUserPoint = async () => {
    try {
      if (localStorage.getItem("accessToken")) {
        const response = await client.get("/accounts/point");
        setMyPoint(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      if (localStorage.getItem("accessToken")) {
        const response = await client
          .get("accounts/me")
          .then((res) => res.data);
        const { data, isLoading } = useQuery<BranduBaseResponse<UserInterface>>(
          ["profile"],
          response
        );

        setMyInfo(data?.results!);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserPoint().then();
    fetchUserInfo().then();
  }, []);

  return { myPoint, myInfo };
};

export default useUserInfo;
