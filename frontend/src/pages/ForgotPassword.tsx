import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { forgotPassword } from "../api/AuthService";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    try {
      await forgotPassword({ identifier });

      toast.success(
        "Şifre sıfırlama bağlantısı kayıtlı mail adresinize gönderilmiştir, işleminize mail üzerinden devam edebilirsiniz.",
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: unknown) {
      console.error("Şifre sıfırlama isteği başarısız:", error);

      toast.error(
        "Şifre sıfırlama isteği gönderilemedi. Lütfen tekrar deneyin.",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl sm:p-10">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
              <span className="text-4xl" aria-hidden="true">
                🔐
              </span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              Şifreni mi unuttun?
            </h1>

            <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
              Hesabına kayıtlı e-posta adresini gir. Sana şifre sıfırlama
              bağlantısı göndereceğiz.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Kullanıcı adı veya e-posta
              </label>

              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="Kullanıcı adı veya e-posta"
                autoComplete="username"
                required
                className="
                  w-full rounded-lg border border-gray-300
                  px-4 py-3 text-gray-900
                  outline-none transition
                  placeholder:text-gray-400
                  focus:border-indigo-500
                  focus:ring-2 focus:ring-indigo-100
                "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full rounded-lg bg-indigo-600
                px-4 py-3 font-medium text-white
                transition hover:bg-indigo-700
                active:scale-[0.98]
                focus:outline-none focus:ring-2
                focus:ring-indigo-500 focus:ring-offset-2
              "
            >
              Şifre Sıfırlama Bağlantısı Gönder
            </button>
          </form>

          {/* Back */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-gray-500 transition hover:text-indigo-600"
            >
              ← Giriş sayfasına dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;