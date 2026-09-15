import type {
  LoginRequest,
  RegisterForm,
  RegisterResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../types/Auth";
import api from "./axios";

export const register = async (formData: RegisterForm) => {
  const response = await api.post<RegisterResponse>("/auth/register", formData);
  return response.data;
};

export const login = async (formData: LoginRequest) => {
  const response = await api.post<LoginRequest>("/auth/login", formData);
  return response.data;
};

export const me = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const forgotPassword = async (
  forgotPasswordRequest: ForgotPasswordRequest,
) => {
  console.log("GÖNDERİLEN REQUEST:", forgotPasswordRequest);
  await api.post("/auth/forgot-password", forgotPasswordRequest);
};

export const resetPassword = async (
  resetPasswordRequest: ResetPasswordRequest,
) => {
  await api.post("/auth/reset-password", resetPasswordRequest);
};
