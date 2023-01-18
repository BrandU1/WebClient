import { useMemo, useState } from "react";
import client from "@lib/api";
import { UserInterface } from "../types/privacy";

function useUserInfo() {
  const [myInfo, setMyInfo] = useState<UserInterface>({
    id: 0,
    name: "",
    nickname: "",
    email: "",
    phone_number: "",
    profile_image: "",
    social_link: "",
    platforms: [],
  });

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

  useMemo(() => {
    fetchUserInfo().then();
  }, []);

  return { myInfo };
}

export default useUserInfo;
