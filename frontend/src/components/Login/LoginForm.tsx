import { useContext, useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { login } from "../../api/AuthService";
import { saveTokens } from "../../utils/Token";

import type { LoginRequest } from "../../types/auth";

const LoginForm = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!auth) {
    throw new Error("LoginForm, AuthProvider içerisinde kullanılmalıdır.");
  }

  const { setIsAuthenticated } = auth;

  // Form alanlarındaki değişiklikleri yönetir.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Kullanıcı giriş işlemini gerçekleştirir.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const response = await login(formData);

      // Access token'ı kaydet.
      saveTokens(response.accessToken);

      // Uygulamanın oturum durumunu güncelle.
      localStorage.setItem("sessionActive", "true");
      setIsAuthenticated(true);

      toast.success(
        "Giriş başarılı, anasayfaya yönlendiriliyorsunuz."
      );

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6 py-8 sm:px-8 sm:py-10">
      {/* Form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {/* Kullanıcı adı veya e-posta */}
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="identifier"
          >
            Kullanıcı adı veya E-posta
          </label>

          <input
            required
            value={formData.identifier}
            onChange={handleChange}
            className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
            type="text"
            name="identifier"
            id="identifier"
            autoComplete="username"
          />
        </div>

        {/* Şifre */}
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="password"
          >
            Şifre
          </label>

          <input
            required
            value={formData.password}
            onChange={handleChange}
            className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
          />
        </div>

        {/* Şifremi unuttum */}
        <div className="-mt-2 flex justify-end">
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-[#5C7D75] transition-colors hover:text-[#3F5B55] sm:text-sm"
          >
            Şifremi unuttum
          </Link>
        </div>

        {/* Giriş butonu */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 min-h-11 w-full rounded-xl bg-[#3F5B55] px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-900/10 transition duration-200 hover:bg-[#344C47] hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Giriş yapılıyor..." : "Devam"}
        </button>
      </form>

      {/* Kayıt ol */}
      <div className="mt-7 flex flex-col items-center justify-center gap-1 text-sm sm:flex-row">
        <p className="text-slate-400">Hesabın yok mu?</p>

        <Link
          to="/register"
          className="font-semibold text-[#5C7D75] transition-colors hover:text-[#3F5B55]"
        >
          Şimdi kaydol
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;