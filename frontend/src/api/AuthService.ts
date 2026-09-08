import type { LoginRequest, RegisterForm } from "../types/Auth";
import type { RegisterResponse } from "../types/Auth";
import api from "./axios";

export const register = async (formData: RegisterForm) => {
  const response = await api.post<RegisterResponse>("/auth/register", formData);
  return response.data;
};

export const login = async (formData:LoginRequest)=>{
  const response = await api.post<LoginRequest>("/auth/login",formData);
  return response.data;
}
