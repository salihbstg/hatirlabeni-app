import type { ChangeEvent } from "react";
import type { LoginRequest } from "../../types/auth";

interface LoginFieldsProps {
  // Formun güncel input değerlerini ana component'ten alır.
  formData: LoginRequest;

  // Input değişikliklerini ana component'teki state'e aktarır.
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LoginFields = ({ formData, handleChange }: LoginFieldsProps) => {
  return (
    <>
      {/* Kullanıcı adı veya e-posta alanı */}
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-semibold text-slate-700"
          htmlFor="identifier"
        >
          Kullanıcı adı veya E-posta
        </label>

        <input
          required
          value={formData.identifier}
          onChange={handleChange}
          className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
          type="text"
          name="identifier"
          id="identifier"
          autoComplete="username"
        />
      </div>

      {/* Kullanıcının şifresini girdiği alan */}
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-semibold text-slate-700"
          htmlFor="password"
        >
          Şifre
        </label>

        <input
          required
          value={formData.password}
          onChange={handleChange}
          className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
        />
      </div>
    </>
  );
};

export default LoginFields;