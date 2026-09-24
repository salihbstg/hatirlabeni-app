import React from "react";
import logo from "../../../assets/Logo.png";

const RegisterHeader: React.FC = () => {
  return (
    <div className="bg-[#3F5B55] px-6 py-10 text-center sm:px-10">
      {/* LOGO */}
      <img
        className="mx-auto mb-5 h-20 w-auto object-contain"
        src={logo}
        alt="Hatırla Beni"
      />

      {/* TITLE */}
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Hesap Oluştur
      </h1>

      {/* DESCRIPTION */}
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-emerald-50/80">
        Hatırla Beni'ye katılmak için bilgilerinizi eksiksiz şekilde doldurun.
      </p>
    </div>
  );
};

export default RegisterHeader;