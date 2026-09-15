import React, { useState, useContext } from "react";

import logo from "./../assets/Logo.png";
import googleIcon from "./../assets/Login-Register/GoogleIcon.png";

import "./LoginPage.css";

import type { LoginRequest } from "../types/Auth";

import { login } from "./../api/AuthService";
import { saveTokens } from "../utils/Token";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);

      saveTokens(response.accessToken, response.refreshToken);

      toast.success(
        "Giriş başarılı, anasayfaya yönlendiriliyorsunuz."
      );

      setIsAuthenticated(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Giriş bilgileri hatalı.");
        } else if (
          error.response?.status &&
          error.response.status >= 500
        ) {
          toast.error(
            "Sunucuda bir sorun oluştu. Lütfen daha sonra tekrar deneyin."
          );
        } else {
          toast.error("Beklenmeyen bir hata oluştu.");
        }
      } else {
        toast.error("Beklenmeyen bir hata oluştu.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F1E8] px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full">

          {/* CARD */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">

            {/* ÜST KISIM */}
            <div className="bg-[#3F5B55] px-6 py-10 text-center sm:px-10">
              <img
                className="mx-auto mb-5 h-20 w-auto object-contain"
                src={logo}
                alt="Hatırla Beni"
              />

              <h1 className="text-3xl font-bold tracking-tight text-white">
                Giriş Yap
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-emerald-50/80">
                Hesabınıza giriş yaparak Hatırlabeni'yi kullanmaya
                devam edin.
              </p>
            </div>

            {/* FORM ALANI */}
            <div className="px-6 py-8 sm:px-8 sm:py-10">

              {/* GOOGLE LOGIN */}
              <button
                type="button"
                className="flex min-h-11 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:bg-slate-50 hover:shadow-sm active:bg-slate-100"
              >
                <img
                  className="h-5 w-5"
                  src={googleIcon}
                  alt="Google"
                />

                Google ile giriş yap
              </button>

              {/* AYIRICI */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs font-medium text-slate-400">
                  veya
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* FORM */}
              <form
                onSubmit={onSubmit}
                action=""
                className="flex flex-col gap-5"
              >

                {/* IDENTIFIER */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-slate-700"
                    htmlFor="identifier"
                  >
                    Kullanıcı adı veya E-posta
                  </label>

                  <input
                    required
                    onChange={handleChange}
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                    type="text"
                    name="identifier"
                    id="identifier"
                    autoComplete="username"
                  />
                </div>

                {/* PASSWORD */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-slate-700"
                    htmlFor="password"
                  >
                    Şifre
                  </label>

                  <input
                    required
                    onChange={handleChange}
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </div>

                {/* FORGOT PASSWORD */}
                <div className="-mt-2 flex justify-end">
                  <a
                    className="text-xs font-medium text-[#5C7D75] transition-colors hover:text-[#3F5B55] sm:text-sm"
                    href="/forgot-password"
                  >
                    Şifremi unuttum
                  </a>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="mt-2 min-h-11 w-full rounded-xl bg-[#3F5B55] px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-900/10 transition duration-200 hover:bg-[#344C47] hover:shadow-xl active:scale-[0.99]"
                >
                  Devam
                </button>

              </form>

              {/* REGISTER */}
              <div className="mt-7 flex flex-col items-center justify-center gap-1 text-sm sm:flex-row">
                <p className="text-slate-400">
                  Hesabın yok mu?
                </p>

                <a
                  className="font-semibold text-[#5C7D75] transition-colors hover:text-[#3F5B55]"
                  href="/register"
                >
                  Şimdi kaydol
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;