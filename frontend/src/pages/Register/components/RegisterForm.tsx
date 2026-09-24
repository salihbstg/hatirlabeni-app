import React from "react";
import type { RegisterForm as RegisterFormType } from "../../../types/auth";

import PersonalInfoSection from "./PersonalInfoSection";
import AccountInfoSection from "./AccountInfoSection";

interface RegisterFormProps {
  formData: RegisterFormType;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  repeatPassword: string;
  setRepeatPassword: (value: string) => void;

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  handleInputChange,
  repeatPassword,
  setRepeatPassword,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
        {/* FORM CONTENT */}
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <PersonalInfoSection
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <AccountInfoSection
            formData={formData}
            handleInputChange={handleInputChange}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
          />

          {/* SUBMIT BUTTON */}
          <div className="mt-10">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#3F5B55] px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-900/10 transition duration-200 hover:bg-[#344C47] hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Kayıt oluşturuluyor..." : "Kayıt Ol"}
            </button>

            <p className="mt-4 text-center text-xs text-slate-400">
              Hesap oluşturarak kullanım koşullarını kabul etmiş olursunuz.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;