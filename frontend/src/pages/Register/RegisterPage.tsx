import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import type { RegisterForm as RegisterFormType } from "../../types/auth";
import { register } from "../../api/AuthService";

import RegisterHeader from "./components/RegisterHeader";
import RegisterForm from "./components/RegisterForm";
import { isValidTCKN } from "./register.utils";

import "./RegisterPage.css";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<RegisterFormType>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    nationalId: "",
    telephone: "",
    birthday: "",
  });

  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!isValidTCKN(formData.nationalId)) {
      toast.error(
        "Lütfen T.C. standartlarına uygun bir kimlik numarası giriniz."
      );
      return;
    }

    if (formData.password !== repeatPassword) {
      toast.error("Şifreler eşleşmiyor.");
      return;
    }

    try {
      setIsLoading(true);

      await register(formData);

      toast.success(
        "Kayıt başarılı, giriş sayfasına yönlendiriliyorsunuz."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data?.errors;

        if (Array.isArray(errors)) {
          errors.forEach((message: string) => {
            toast.error(message);
          });
        } else if (errors && typeof errors === "object") {
          Object.values(errors).forEach((message) => {
            toast.error(String(message));
          });
        } else {
          toast.error(
            error.response?.data?.message ??
              "Kayıt sırasında bir hata oluştu."
          );
        }
      } else {
        toast.error("Beklenmeyen bir hata oluştu.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1E8] px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
          <RegisterHeader />

          <RegisterForm
            formData={formData}
            handleInputChange={handleInputChange}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;