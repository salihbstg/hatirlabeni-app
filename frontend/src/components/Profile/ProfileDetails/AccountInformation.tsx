import React from "react";

interface AccountInformationProps {
  auth: {
    username: string;
    email: string;
  };
}

const AccountInformation: React.FC<AccountInformationProps> = ({ auth }) => {
  const accountItems = [
    {
      label: "Kullanıcı Adı",
      value: auth.username,
    },
    {
      label: "E-posta",
      value: auth.email,
    },
  ];

  return (
    <div
      className="
        w-full
        flex flex-col
        gap-4
        px-4 py-4
        sm:px-5 sm:py-5
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
          border-b border-gray-200
          pb-3
        "
      >
        <h2 className="text-sm sm:text-base font-bold select-none">
          Hesap Bilgileri
        </h2>

        <span className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
          Hesap bilgilerinizi görüntüleyebilirsiniz.
        </span>
      </div>

      {/* Information Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {accountItems.map((item) => (
          <div
            key={item.label}
            className="
              w-full
              min-w-0
              min-h-[90px]
              flex flex-col
              justify-between
              gap-2
              border border-gray-200
              rounded-lg
              px-3 py-3
              sm:px-4 sm:py-3
              shadow-sm
              hover:shadow-md
              transition-shadow
              box-border
            "
          >
            <span className="text-[11px] sm:text-xs font-semibold text-gray-500">
              {item.label}
            </span>

            <span
              className="
                block
                w-full
                min-w-0
                text-sm sm:text-base
                font-semibold
                break-words
                [overflow-wrap:anywhere]
              "
            >
              {item.value || "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountInformation;