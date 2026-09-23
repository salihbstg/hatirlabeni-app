import axios from "axios";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    // Refresh isteğinde access token gönderme
    if (token && config.url !== "/auth/refresh") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as CustomAxiosRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Yalnızca 401 durumunda refresh dene
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/login" &&
      originalRequest.url !== "/auth/refresh" &&
      originalRequest.url !== "/auth/forgot-password"
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token HttpOnly cookie ile otomatik gönderilir
        const response = await api.post("/auth/refresh");

        const newAccessToken = response.data.accessToken;

        if (!newAccessToken) {
          throw new Error("Refresh yanıtında accessToken bulunamadı.");
        }

        // Yeni access token'ı kaydet
        localStorage.setItem("accessToken", newAccessToken);

        // Başarısız isteği yeni token ile tekrarla
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Refresh başarısızsa oturumu temizle
        localStorage.removeItem("accessToken");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
