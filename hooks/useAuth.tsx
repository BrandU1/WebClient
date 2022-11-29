import { useEffect, useState } from "react";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    setIsAuthenticated(!!access_token);
  }, []);

  return isAuthenticated;
}

export default useAuth;
