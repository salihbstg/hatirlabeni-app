import React from "react";

const AccountInformation = ({ auth }) => {
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
          Hesap Bilgileri
        </h2>

        <span
          className="
            text-xs
            sm:text-sm
            text-gray-500
            leading-relaxed
          "
        >
          Hesap bilgilerinizi görüntüleyebilirsiniz.
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
        {/* Kullanıcı Adı */}
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
          <span
            className="
              text-xs
              sm:text-sm
              font-semibold
              text-gray-500
            "
          >
            Kullanıcı Adı
          </span>

          <span
            className="
              block
              w-full
              min-w-0
              text-base
              sm:text-lg
              font-semibold
              break-words
              overflow-wrap-anywhere
            "
          >
            {auth.username}
          </span>
        </div>

        {/* E-posta */}
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
          <span
            className="
              text-xs
              sm:text-sm
              font-semibold
              text-gray-500
            "
          >
            E-posta
          </span>

          <span
            className="
              block
              w-full
              min-w-0
              text-base
              sm:text-lg
              font-semibold
              break-words
              overflow-wrap-anywhere
            "
          >
            {auth.email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;