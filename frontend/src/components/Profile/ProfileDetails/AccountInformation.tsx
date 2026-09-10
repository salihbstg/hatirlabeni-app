import React from "react";

const AccountInformation = ({auth}) => {
  return (
    <div className="flex flex-col gap-8 px-35 py-10 border border-gray-200 rounded-lg navbar-font bg-white shadow-sm">

      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-gray-300 pb-4">
        <h2 className="font-bold text-lg select-none">
          Hesap Bilgileri
        </h2>

        <span className="text-sm text-gray-500">
          Hesap bilgilerinizi görüntüleyebilirsiniz.
        </span>
      </div>

      {/* Information Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-10">

        {/* Kullanıcı Adı */}
        <div className="flex flex-col justify-between w-72 min-h-32
                        border border-gray-200 rounded-lg px-5 py-4
                        shadow-sm hover:shadow-md transition">
          <span className="text-sm font-semibold text-gray-500">
            Kullanıcı Adı
          </span>

          <span className="text-lg font-semibold">
            {auth.username}
          </span>
        </div>

        {/* E-posta */}
        <div className="flex flex-col justify-between w-72 min-h-32
                        border border-gray-200 rounded-lg px-5 py-4
                        shadow-sm hover:shadow-md transition">
          <span className="text-sm font-semibold text-gray-500">
            E-posta
          </span>

          <span className="text-lg font-semibold">
            {auth.email}
          </span>
        </div>

      </div>
    </div>
  );
};

export default AccountInformation;