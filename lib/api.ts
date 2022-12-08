import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

client.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    // 인증 토큰이 없는 경우 혹은 auth 요청을 보내는 경우
    if (!access_token) return config;
    if (config.url!.includes("auth")) return config;

    config.headers!["Authorization"] = `Bearer ${access_token}`;
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

type subscriber = (accessToken: string) => void;

let isTokenRefreshing = false;
let refreshSubscribers: subscriber[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.map((callback: subscriber) => callback(accessToken));
};

const addRefreshSubscriber = (callback: subscriber) => {
  refreshSubscribers.push(callback);
};

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    let isRefreshed = false;

    if (status === 401) {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;

        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) return;

        const refresh = await client.post("/auth/refresh", {
          refresh: refreshToken,
        });

        const {
          data: { access: newAccessToken },
        } = refresh;
        isRefreshed = true;
        localStorage.setItem("access_token", newAccessToken);

        isTokenRefreshing = false;
        client.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        onTokenRefreshed(newAccessToken);
      }

      if (!isRefreshed) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }

      return new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = "Bearer " + accessToken;
          resolve(axios(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);

export default client;
