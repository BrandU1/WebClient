import { useEffect, useState } from "react";
import client from "@lib/api";
import { UserInterface } from "../types/privacy";

const useUserInfo = () => {
  const [myInfo, setMyInfo] = useState<UserInterface>();

  const fetchUserInfo = async () => {
    try {
      if (localStorage.getItem("access_token")) {
        const response = await client
          .get("accounts/me")
          .then((res) => res.data);
        if (response?.results) {
          setMyInfo(response.results);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserInfo().then();
  }, []);

  return { myInfo };
};

export default useUserInfo;
