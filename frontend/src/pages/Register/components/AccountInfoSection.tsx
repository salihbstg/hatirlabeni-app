import React from "react";
import type { RegisterForm } from "../../../types/auth";

interface AccountInfoSectionProps {
  formData: RegisterForm;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  repeatPassword: string;
  setRepeatPassword: (value: string) => void;
}

const AccountInfoSection: React.FC<AccountInfoSectionProps> = ({
  formData,
  handleInputChange,
  repeatPassword,
  setRepeatPassword,
}) => {
  return (
    <div className="border-t border-slate-100 pt-8">
      {/* SECTION HEADER */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-[#6B8F86]" />

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Hesap Bilgileri
          </h2>

          <p className="text-sm text-slate-500">
            Hesabınız için güvenli bir şifre belirleyin.
          </p>
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* PASSWORD */}
        <div className="flex flex-col">
          <label
            className="mb-2 text-sm font-semibold text-slate-700"
            htmlFor="register-password"
          >
            Şifre
          </label>

          <input
            required
            value={formData.password}
            onChange={handleInputChange}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
            type="password"
            id="register-password"
            name="password"
          />

          <small className="mt-2 text-xs leading-5 text-slate-400">
            En az 8 karakter, bir büyük harf, bir küçük harf, bir rakam ve
            bir özel karakter içermelidir.
          </small>
        </div>

        {/* REPEAT PASSWORD */}
        <div className="flex flex-col">
          <label
            className="mb-2 text-sm font-semibold text-slate-700"
            htmlFor="register-password-repeat"
          >
            Şifreyi tekrar giriniz
          </label>

          <input
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
            type="password"
            id="register-password-repeat"
            name="register-password-repeat"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountInfoSection;