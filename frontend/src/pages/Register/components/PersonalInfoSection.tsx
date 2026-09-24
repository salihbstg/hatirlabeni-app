import React from "react";
import type { RegisterForm } from "../../../types/auth";

interface PersonalInfoSectionProps {
  formData: RegisterForm;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  handleInputChange,
}) => {
  const inputClassName =
    "rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50";

  const labelClassName =
    "mb-2 text-sm font-semibold text-slate-700";

  return (
    <div className="mb-8">
      {/* SECTION HEADER */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-[#6B8F86]" />

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Kişisel Bilgiler
          </h2>

          <p className="text-sm text-slate-500">
            Temel bilgilerinizi giriniz.
          </p>
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* USERNAME */}
        <div className="flex flex-col">
          <label
            className={labelClassName}
            htmlFor="register-username"
          >
            Kullanıcı adı
          </label>

          <input
            required
            value={formData.username}
            onChange={handleInputChange}
            className={inputClassName}
            type="text"
            id="register-username"
            name="username"
          />
        </div>

        {/* EMAIL */}
        <div className="flex flex-col">
          <label
            className={labelClassName}
            htmlFor="register-email"
          >
            Email
          </label>

          <input
            required
            value={formData.email}
            onChange={handleInputChange}
            className={inputClassName}
            type="email"
            id="register-email"
            name="email"
          />
        </div>

        {/* FIRST NAME */}
        <div className="flex flex-col">
          <label
            className={labelClassName}
            htmlFor="register-name"
          >
            Ad
          </label>

          <input
            required
            value={formData.firstName}
            onChange={handleInputChange}
            className={inputClassName}
            type="text"
            id="register-name"
            name="firstName"
          />
        </div>

        {/* LAST NAME */}
        <div className="flex flex-col">
          <label
            className={labelClassName}
            htmlFor="register-lastname"
          >
            Soyad
          </label>

          <input
            required
            value={formData.lastName}
            onChange={handleInputChange}
            className={inputClassName}
            type="text"
            id="register-lastname"
            name="lastName"
          />
        </div>

        {/* NATIONAL ID */}
        <div className="flex flex-col">
          <label
            className={labelClassName}
            htmlFor="register-nationalId"
          >
            T.C. Kimlik Numarası
          </label>

          <input
            required
            value={formData.nationalId}
            onChange={handleInputChange}
            className={inputClassName}
            type="text"
            id="register-nationalId"
            name="nationalId"
            inputMode="numeric"
            maxLength={11}
          />
        </div>

        {/* BIRTHDAY */}
        <div className="flex flex-col">
          <label
            className={labelClassName}
            htmlFor="register-birthday"
          >
            Doğum Tarihi
          </label>

          <input
            required
            value={formData.birthday}
            onChange={handleInputChange}
            className={inputClassName}
            type="date"
            id="register-birthday"
            name="birthday"
          />
        </div>

        {/* TELEPHONE */}
        <div className="flex flex-col">
          <label
            className={labelClassName}
            htmlFor="register-phone"
          >
            Telefon Numarası
          </label>

          <input
            required
            value={formData.telephone}
            onChange={handleInputChange}
            className={inputClassName}
            type="tel"
            inputMode="tel"
            placeholder="05XX XXX XX XX"
            id="register-phone"
            name="telephone"
            maxLength={11}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;