import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import logo from "../assets/Logo.png";
import googleIcon from "../assets/Login-Register/GoogleIcon.png";

import "../pages/LoginPage.css";
import LoginForm from "../components/Login/LoginForm";

const LoginPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "local_account") {
      setErrorMessage(
        "Bu e-posta adresiyle daha önce normal kayıt yapılmış. Lütfen e-posta ve şifrenizle giriş yapın."
      );

      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Google OAuth girişini Authentication Service üzerinden başlat
  const handleGoogleLogin = () => {
    window.location.href =
      window.location.href = `${import.meta.env.VITE_AUTH_URL}/oauth2/authorization/google`;
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
                Hesabınıza giriş yaparak HatırlaBeni'yi kullanmaya
                devam edin.
              </p>
            </div>

            {/* FORM ALANI */}
            <div className="px-6 py-8 sm:px-8 sm:py-10">
              {/* HATA MESAJI */}
              {errorMessage && (
                <div
                  role="alert"
                  className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-800"
                >
                  {errorMessage}
                </div>
              )}

              {/* GOOGLE LOGIN */}
              <button
                type="button"
                onClick={handleGoogleLogin}
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

              {/* LOGIN FORM */}
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;