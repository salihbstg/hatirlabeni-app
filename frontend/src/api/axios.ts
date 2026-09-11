import axios from "axios";

import { saveTokens } from "../utils/Token";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    console.log("API ERROR:", {
      status: error.response?.status,
      url: originalRequest?.url,
      method: originalRequest?.method,
      authorization: originalRequest?.headers?.Authorization,
      response: error.response?.data,
    });

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      console.log("Refresh token var mı:", !!refreshToken);

      if (!refreshToken) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";

        return Promise.reject(error);
      }

      try {
        console.log("Refresh isteği gönderiliyor...");

        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        console.log("Refresh başarılı:", response.status);

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        console.log(
          "ESKİ TOKEN:",
          localStorage.getItem("accessToken")
        );

        console.log("YENİ TOKEN:", newAccessToken);

        saveTokens(newAccessToken, newRefreshToken);

        console.log(
          "LOCALSTORAGE TOKEN:",
          localStorage.getItem("accessToken")
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        console.log("Orijinal istek tekrar gönderiliyor...");

        console.log("RETRY REQUEST:", {
          url: originalRequest.url,
          method: originalRequest.method,
          headers: originalRequest.headers,
        });

        return api(originalRequest);
      } catch (refreshError) {
        console.log("REFRESH BAŞARISIZ:", refreshError);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;