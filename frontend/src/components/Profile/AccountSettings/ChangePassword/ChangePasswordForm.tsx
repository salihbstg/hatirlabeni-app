import React from "react";

interface ChangePasswordFormProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  isLoading: boolean;

  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;

  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ChangePasswordForm = ({
  currentPassword,
  newPassword,
  confirmPassword,
  isLoading,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: ChangePasswordFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Mevcut şifre */}
      <div className="space-y-1.5">
        <label
          htmlFor="currentPassword"
          className="text-sm font-medium text-gray-700"
        >
          Mevcut Şifre
        </label>

        <input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(event) => onCurrentPasswordChange(event.target.value)}
          placeholder="Mevcut şifrenizi girin"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {/* Yeni şifre */}
      <div className="space-y-1.5">
        <label
          htmlFor="newPassword"
          className="text-sm font-medium text-gray-700"
        >
          Yeni Şifre
        </label>

        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(event) => onNewPasswordChange(event.target.value)}
          placeholder="Yeni şifrenizi girin"
          autoComplete="new-password"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {/* Yeni şifre tekrar */}
      <div className="space-y-1.5">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-gray-700"
        >
          Yeni Şifre Tekrar
        </label>

        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => onConfirmPasswordChange(event.target.value)}
          placeholder="Yeni şifrenizi tekrar girin"
          autoComplete="new-password"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {/* Formu gönder */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Şifre Değiştiriliyor..." : "Şifremi Değiştir"}
      </button>
    </form>
  );
};

export default ChangePasswordForm;