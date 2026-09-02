import type { RegisterForm } from "../types/auth";
import type { RegisterResponse } from "../types/auth";
import api from "./../api/axios";

export const register = async (formData: RegisterForm) => {
  const response = await api.post<RegisterResponse>("/auth/register", formData);
  return response.data;
};
