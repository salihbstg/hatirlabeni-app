import React from "react";

import googleIcon from "./../assets/GoogleIcon.png";

import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div
      className="
        login-wrapper
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        py-8
        libre-baskerville
      "
    >
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">

          {/* BAŞLIK */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Giriş Yap
            </h1>

            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Hesabınıza giriş yapın.
            </p>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            className="
              w-full
              min-h-11
              flex
              items-center
              justify-center
              gap-3
              bg-white
              text-black
              rounded-lg
              px-4
              py-2.5
              font-semibold
              text-sm
              sm:text-base
              transition
              duration-200
              hover:bg-slate-100
              active:bg-slate-200
            "
          >
            <img
              className="w-5 h-5"
              src={googleIcon}
              alt="Google"
            />

            Google ile giriş yap
          </button>

          {/* AYIRICI */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-slate-700 flex-1" />

            <span className="text-xs text-slate-500">
              veya
            </span>

            <div className="h-px bg-slate-700 flex-1" />
          </div>

          {/* FORM */}
          <form
            action=""
            className="flex flex-col gap-5"
          >
            {/* IDENTIFIER */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-semibold text-slate-200"
                htmlFor="identifier"
              >
                Kullanıcı adı veya E-posta
              </label>

              <input
                className="
                  w-full
                  min-h-11
                  bg-white
                  text-black
                  text-sm
                  px-3
                  py-2.5
                  rounded-lg
                  border
                  border-slate-300
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                type="text"
                name="identifier"
                id="identifier"
                autoComplete="username"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-semibold text-slate-200"
                htmlFor="password"
              >
                Şifre
              </label>

              <input
                className="
                  w-full
                  min-h-11
                  bg-white
                  text-black
                  text-sm
                  px-3
                  py-2.5
                  rounded-lg
                  border
                  border-slate-300
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end -mt-2">
              <a
                className="
                  text-xs
                  sm:text-sm
                  text-blue-400
                  hover:text-blue-300
                  transition-colors
                "
                href="#"
              >
                Şifremi unuttum
              </a>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="
                w-full
                min-h-11
                bg-blue-600
                hover:bg-blue-700
                active:bg-blue-800
                text-white
                font-semibold
                rounded-lg
                px-6
                py-2.5
                transition-colors
                duration-200
              "
            >
              Devam
            </button>
          </form>

          {/* REGISTER */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-1
              mt-7
              text-sm
            "
          >
            <p className="text-slate-400">
              Hesabın yok mu?
            </p>

            <a
              className="
                font-semibold
                text-blue-400
                hover:text-blue-300
                transition-colors
              "
              href="/register"
            >
              Şimdi kaydol
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
