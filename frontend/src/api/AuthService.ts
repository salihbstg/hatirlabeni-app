import type {
  LoginRequest,
  LoginResponse,
  RegisterForm,
  RegisterResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyMailRequest,
  ChangePasswordRequest,
  ChangeEmailRequest,
  VerifyChangeEmailRequest,
  RefreshResponse,
  MeResponse,
} from "../types/auth";

import api from "./ApiClient";

// ─── Authentication ──────────────────────────────────────

export const register = async (
  formData: RegisterForm,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/auth/register",
    formData,
  );

  return response.data;
};

export const login = async (
  formData: LoginRequest,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    formData,
  );

  return response.data;
};

export const refresh = async (): Promise<RefreshResponse> => {
  const response = await api.post<RefreshResponse>(
    "/auth/refresh",
  );

  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

// ─── Current User ────────────────────────────────────────

export const me = async (): Promise<MeResponse> => {
  const response = await api.get<MeResponse>("/users/me");

  return response.data;
};

// ─── Password Management ──────────────────────────────────

export const forgotPassword = async (
  forgotPasswordRequest: ForgotPasswordRequest,
): Promise<void> => {
  await api.post(
    "/auth/forgot-password",
    forgotPasswordRequest,
  );
};

export const resetPassword = async (
  resetPasswordRequest: ResetPasswordRequest,
): Promise<void> => {
  await api.post(
    "/auth/reset-password",
    resetPasswordRequest,
  );
};

export const changePassword = async (
  changePasswordRequest: ChangePasswordRequest,
): Promise<void> => {
  await api.patch(
    "/auth/change-password",
    changePasswordRequest,
  );
};

// ─── Mail Activation ─────────────────────────────────────

export const sendMailActivationLink = async (): Promise<void> => {
  await api.post("/auth/mail-activation");
};

export const verifyMail = async (
  token: VerifyMailRequest,
): Promise<void> => {
  await api.post("/auth/mail-verify", token);
};

// ─── Email Change ────────────────────────────────────────

export const sendChangeEmailLink = async (
  changeEmailRequest: ChangeEmailRequest,
): Promise<void> => {
  await api.post(
    "/auth/change-email",
    changeEmailRequest,
  );
};

export const verifyChangeMail = async (
  verifyChangeEmailRequest: VerifyChangeEmailRequest,
): Promise<void> => {
  await api.post(
    "/auth/verify-change-email",
    verifyChangeEmailRequest,
  );
};