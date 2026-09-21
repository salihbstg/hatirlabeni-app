import React from "react";

import { sendMailActivationLink } from "../../../api/AuthService";

import toast from "react-hot-toast";

const PersonalInformation = ({ user }) => {
  const handleMailActivation = async () => {
    try {
      await sendMailActivationLink();

      toast.success(
        "Mail adresinize aktivasyon linki iletilmiştir."
      );
    } catch (error) {
      toast.error(
        "Aktivasyon linki gönderilirken bir hata oluştu."
      );
    }
  };

  return (
    <div
      className="
        w-full
        flex flex-col
        gap-5 sm:gap-6 lg:gap-8
        px-3 py-5
        sm:px-5 sm:py-6
        md:px-6 md:py-7
        lg:px-10 lg:py-8
        border border-gray-200
        rounded-lg
        navbar-font
        bg-white
        shadow-sm
        box-border
      "
    >
      {/* Header */}
      <div
        className="
          flex flex-col
          gap-1
          border-b border-gray-300
          pb-3 sm:pb-4
        "
      >
        <h2
          className="
            font-bold
            text-base
            sm:text-lg
            select-none
          "
        >
          Kişisel Bilgiler
        </h2>

        <span
          className="
            text-xs
            sm:text-sm
            text-gray-500
            leading-relaxed
          "
        >
          Kişisel bilgilerinizi görüntüleyin ve düzenleyin.
        </span>
      </div>

      {/* Information Cards */}
      <div
        className="
          w-full
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-3
          sm:gap-4
          lg:gap-6
        "
      >
        {/* Ad */}
        <div
          className="
            w-full
            min-w-0
            min-h-[110px]
            sm:min-h-[120px]
            flex flex-col
            justify-between
            gap-3
            border border-gray-200
            rounded-lg
            px-4 py-4
            sm:px-5 sm:py-4
            shadow-sm
            hover:shadow-md
            transition
            box-border
          "
        >
          <span className="text-xs sm:text-sm font-semibold text-gray-500">
            Ad
          </span>

          <span
            className="
              w-full
              min-w-0
              text-base
              sm:text-lg
              font-semibold
              break-words
            "
          >
            {user.firstName}
          </span>
        </div>

        {/* Soyad */}
        <div
          className="
            w-full
            min-w-0
            min-h-[110px]
            sm:min-h-[120px]
            flex flex-col
            justify-between
            gap-3
            border border-gray-200
            rounded-lg
            px-4 py-4
            sm:px-5 sm:py-4
            shadow-sm
            hover:shadow-md
            transition
            box-border
          "
        >
          <span className="text-xs sm:text-sm font-semibold text-gray-500">
            Soyad
          </span>

          <span
            className="
              w-full
              min-w-0
              text-base
              sm:text-lg
              font-semibold
              break-words
            "
          >
            {user.lastName}
          </span>
        </div>

        {/* Telefon */}
        <div
          className="
            w-full
            min-w-0
            min-h-[110px]
            sm:min-h-[120px]
            flex flex-col
            justify-between
            gap-3
            border border-gray-200
            rounded-lg
            px-4 py-4
            sm:px-5 sm:py-4
            shadow-sm
            hover:shadow-md
            transition
            box-border
          "
        >
          <span className="text-xs sm:text-sm font-semibold text-gray-500">
            Telefon
          </span>

          <span
            className="
              w-full
              min-w-0
              text-base
              sm:text-lg
              font-semibold
              break-words
            "
          >
            {user.telephone}
          </span>
        </div>

        {/* TC */}
        <div
          className="
            w-full
            min-w-0
            min-h-[110px]
            sm:min-h-[120px]
            flex flex-col
            justify-between
            gap-3
            border border-gray-200
            rounded-lg
            px-4 py-4
            sm:px-5 sm:py-4
            shadow-sm
            hover:shadow-md
            transition
            box-border
          "
        >
          <span className="text-xs sm:text-sm font-semibold text-gray-500">
            T.C. Kimlik No
          </span>

          <span
            className="
              w-full
              min-w-0
              text-base
              sm:text-lg
              font-semibold
              tracking-wider
              break-all
            "
          >
            {user.nationalId}
          </span>
        </div>

        {/* Doğum Tarihi */}
        <div
          className="
            w-full
            min-w-0
            min-h-[110px]
            sm:min-h-[120px]
            flex flex-col
            justify-between
            gap-3
            border border-gray-200
            rounded-lg
            px-4 py-4
            sm:px-5 sm:py-4
            shadow-sm
            hover:shadow-md
            transition
            box-border
          "
        >
          <span className="text-xs sm:text-sm font-semibold text-gray-500">
            Doğum Tarihi
          </span>

          <span
            className="
              w-full
              min-w-0
              text-base
              sm:text-lg
              font-semibold
              break-words
            "
          >
            {user.birthday}
          </span>
        </div>

        {/* Mail Durumu */}
        <div
          className="
            w-full
            min-w-0
            min-h-[110px]
            sm:min-h-[120px]
            flex flex-col
            justify-between
            gap-3
            border border-gray-200
            rounded-lg
            px-4 py-4
            sm:px-5 sm:py-4
            shadow-sm
            hover:shadow-md
            transition
            box-border
          "
        >
          <span className="text-xs sm:text-sm font-semibold text-gray-500">
            Mail Durumu
          </span>

          <span
            className={`
              w-full
              min-w-0
              text-base
              sm:text-lg
              font-semibold
              leading-snug
              break-words
              ${
                user.mailActivation
                  ? "text-green-600"
                  : "text-red-600"
              }
            `}
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
              className="
                w-full
                sm:w-fit
                mt-1
                px-4 py-2
                rounded-lg
                bg-black
                text-white
                text-xs
                sm:text-sm
                font-semibold
                whitespace-normal
                hover:bg-gray-800
                transition
              "
            >
              Doğrulama Linki Gönder
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;