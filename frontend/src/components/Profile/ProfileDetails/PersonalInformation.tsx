import { sendMailActivationLink } from "../../../api/AuthService";

import type { MeResponse } from "../../../types/auth";

import toast from "react-hot-toast";

interface PersonalInformationProps {
  user: MeResponse;
}

const PersonalInformation = ({ user }: PersonalInformationProps) => {
  const handleMailActivation = async () => {
    try {
      await sendMailActivationLink();

      toast.success("Mail adresinize aktivasyon linki iletilmiştir.");
    } catch {
      toast.error("Aktivasyon linki gönderilirken bir hata oluştu.");
    }
  };

  const informationItems = [
    {
      label: "Ad",
      value: user.firstName,
    },
    {
      label: "Soyad",
      value: user.lastName,
    },
    {
      label: "Telefon",
      value: user.telephone,
    },
    {
      label: "T.C. Kimlik No",
      value: user.nationalId,
    },
    {
      label: "Doğum Tarihi",
      value: user.birthday,
    },
  ];

  const cardClassName = `
    flex min-w-0 flex-col justify-between gap-2
    rounded-lg border border-[#e8e2d8]
    bg-[#fffdf9] p-3 sm:p-3.5
    shadow-sm transition-shadow duration-200
    hover:shadow-md
  `;

  return (
    <div
      className="
        box-border flex w-full min-w-0 flex-col
        rounded-xl border border-[#e8e2d8]
        bg-white p-3 shadow-sm
        sm:p-4
        navbar-font
      "
    >
      {/* Personal Information Cards */}
      <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-3.5">
        {informationItems.map((item) => (
          <div key={item.label} className={cardClassName}>
            <span className="text-[11px] font-medium text-gray-500 sm:text-xs">
              {item.label}
            </span>

            <span className="break-words text-sm font-semibold leading-5 text-[#2F302B]">
              {item.value || "-"}
            </span>
          </div>
        ))}

        {/* Mail Status */}
        <div className={cardClassName}>
          <span className="text-[11px] font-medium text-gray-500 sm:text-xs">
            Mail Durumu
          </span>

          <span
            className={`break-words text-sm font-semibold leading-5 ${
              user.mailActivation ? "text-green-600" : "text-red-600"
            }`}
          >
            {user.mailActivation
              ? "Doğrulanmış Hesap"
              : "Doğrulanmamış Hesap"}
          </span>

          {/* Mail Activation Button */}
          {!user.mailActivation && (
            <button
              onClick={handleMailActivation}
              type="button"
              className="
                mt-1 w-full rounded-md
                bg-[#3f493e] px-3 py-2
                text-xs font-medium text-white
                transition-colors duration-200
                hover:bg-[#30392f]
                sm:w-fit
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