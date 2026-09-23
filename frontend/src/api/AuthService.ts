import type {
  LoginRequest,
  RegisterForm,
  RegisterResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyMailRequest,
  ChangePasswordRequest
} from "../types/auth";
import api from "./ApiClient";
export const register = async (formData: RegisterForm) => {
  const response = await api.post<RegisterResponse>("/auth/register", formData);
  return response.data;
};

export const login = async (formData: LoginRequest) => {
  const response = await api.post<LoginRequest>("/auth/login", formData);
  return response.data;
};
export const refresh = async () => {
  const response = await api.post("/auth/refresh");
  return response.data;
};
export const logout = async () => {
  await api.post("/auth/logout");
};

export const me = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const forgotPassword = async (
  forgotPasswordRequest: ForgotPasswordRequest,
) => {
  await api.post("/auth/forgot-password", forgotPasswordRequest);
};

export const resetPassword = async (
  resetPasswordRequest: ResetPasswordRequest,
) => {
  await api.post("/auth/reset-password", resetPasswordRequest);
};

export const sendMailActivationLink = async()=>{
  await api.post("/auth/mail-activation")
}

export const verifyMail = async(token:VerifyMailRequest)=>{
  await api.post("/auth/mail-verify",token)
}

export const changePassword = async (changePasswordRequest:ChangePasswordRequest)=>{
  await api.patch("/auth/change-password",changePasswordRequest);
}