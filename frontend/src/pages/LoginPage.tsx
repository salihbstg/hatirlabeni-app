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
        flex-col
        items-center
        justify-center
        px-4
        libre-baskerville
      "
    >
      <div
        className="
          w-full
          max-w-md
          px-1
          sm:px-3
          -translate-y-15
          mb-2
        "
      >
        <h3
          className="
            font-bold
            text-base
            sm:text-lg
          "
        >
          Giriş Yap veya Üye Ol
        </h3>
      </div>

      <form
        className="
          -translate-y-15
          flex
          flex-col
          w-full
          max-w-md
          items-center
          h-auto
          px-5
          py-5
          sm:px-10
          sm:py-6
          rounded-xl
          gap-5
        "
        action=""
      >
        {/* Google Login */}
        <div
          className="
            w-full
            flex
            items-center
            justify-center
            py-4
          "
        >
          <button
            type="button"
            className="
              flex
              items-center
              justify-center
              gap-2
              font-bold
              text-sm
              sm:text-base
            "
          >
            <img className="w-5 h-5" src={googleIcon} alt="Google" />
            Google ile giriş yap
          </button>
        </div>

        {/* Form Fields */}
        <div
          className="
            flex
            flex-col
            gap-3
            w-full
            max-w-sm
          "
        >
          <label
            className="
              text-sm
              font-bold
            "
            htmlFor="identifier"
          >
            Kullanıcı adı veya E-posta
          </label>

          <input
            className="
              bg-white
              text-sm
              p-2.5
              text-black
              rounded
              w-full
            "
            type="text"
            name="identifier"
            id="identifier"
          />

          <label
            className="
              text-sm
              font-bold
            "
            htmlFor="password"
          >
            Şifre
          </label>

          <input
            className="
              bg-white
              text-sm
              p-2.5
              text-black
              rounded
              w-full
            "
            type="password"
            name="password"
            id="password"
          />

          <button
            type="submit"
            className="
              text-sm
              font-bold
              p-2.5
              mt-2
              text-black
              rounded
              bg-[#628787]
              w-full
              transition-colors
              hover:bg-[#527777]
            "
          >
            Devam
          </button>
        </div>

        {/* Register */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-1
            font-bold
            text-sm
            text-center
            items-center
          "
        >
          <p>Hesabın yok mu?</p>

          <a
            className="
              text-blue-500
              hover:text-blue-400
            "
            href="/register"
          >
            Şimdi kaydol
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;