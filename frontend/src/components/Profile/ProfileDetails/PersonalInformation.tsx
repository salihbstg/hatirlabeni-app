import React from "react";
import { sendMailActivationLink } from "../../../api/AuthService";
import toast from "react-hot-toast";
const AccountInformation = ({ user }) => {
  const handleMailActivation= async () =>{
    await sendMailActivationLink();
    toast.success("Mail adresinize aktivasyon linki iletilimiştir.");
  }

  return (
    <div className="flex flex-col gap-8 px-35 py-10 border border-gray-200 rounded-lg navbar-font bg-white shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-4">

        <div>
          <h2 className="font-bold text-lg select-none">
            Kişisel Bilgiler
          </h2>

          <span className="text-sm text-gray-500">
            Kişisel bilgilerinizi görüntüleyin ve düzenleyin.
          </span>
        </div>

      </div>

      {/* Information Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-10">

        {/* Ad */}
        <div className="flex flex-col justify-between w-72 min-h-32 
                        border border-gray-200 rounded-lg px-5 py-4
                        shadow-sm hover:shadow-md transition">

          <span className="text-sm font-semibold text-gray-500">
            Ad
          </span>

          <span className="text-lg font-semibold">
            {user.firstName}
          </span>

        </div>

        {/* Soyad */}
        <div className="flex flex-col justify-between w-72 min-h-32 
                        border border-gray-200 rounded-lg px-5 py-4
                        shadow-sm hover:shadow-md transition">

          <span className="text-sm font-semibold text-gray-500">
            Soyad
          </span>

          <span className="text-lg font-semibold">
            {user.lastName}
          </span>

        </div>

        {/* Telefon */}
        <div className="flex flex-col justify-between w-72 min-h-32 
                        border border-gray-200 rounded-lg px-5 py-4
                        shadow-sm hover:shadow-md transition">

          <span className="text-sm font-semibold text-gray-500">
            Telefon
          </span>

          <span className="text-lg font-semibold">
            {user.telephone}
          </span>

        </div>

        {/* TC */}
        <div className="flex flex-col justify-between w-72 min-h-32 
                        border border-gray-200 rounded-lg px-5 py-4
                        shadow-sm hover:shadow-md transition">

          <span className="text-sm font-semibold text-gray-500">
            T.C. Kimlik No
          </span>

          <span className="text-lg font-semibold tracking-wider">
            {user.nationalId}
          </span>

        </div>

        {/* Doğum Tarihi */}
        <div className="flex flex-col justify-between w-72 min-h-32 
                        border border-gray-200 rounded-lg px-5 py-4
                        shadow-sm hover:shadow-md transition">

          <span className="text-sm font-semibold text-gray-500">
            Doğum Tarihi
          </span>

          <span className="text-lg font-semibold">
            {user.birthday}
          </span>

        </div>

        {/* Mail Doğrulama Durumu */}
        <div className="flex flex-col justify-between w-72 min-h-32 
                        border border-gray-200 rounded-lg px-5 py-4
                        shadow-sm hover:shadow-md transition">

          <span className="text-sm font-semibold text-gray-500">
            Mail Durumu
          </span>

          <span
            className={`text-lg font-semibold ${
              user.mailActivation
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {user.mailActivation
              ? "Doğrulanmış Hesap"
              : "Doğrulanmamış Hesap"}
          </span>

          {/* Doğrulama Butonu */}
          {!user.mailActivation && (
            <button
              onClick={handleMailActivation}
              type="button"
              className="mt-4 px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold
                         hover:bg-gray-800 transition"
            >
              Doğrulama Linki Gönder
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default AccountInformation;
