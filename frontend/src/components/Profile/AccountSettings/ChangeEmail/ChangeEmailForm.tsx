interface ChangeEmailFormProps {
  newEmail: string;
  currentPassword: string;
  onNewEmailChange: (value: string) => void;
  onCurrentPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ChangeEmailForm = ({
  newEmail,
  currentPassword,
  onNewEmailChange,
  onCurrentPasswordChange,
  onSubmit,
}: ChangeEmailFormProps) => {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
      {/* Yeni e-posta adresi */}
      <div>
        <label
          htmlFor="newEmail"
          className="mb-2 block text-xs font-medium text-[#6f675a]"
        >
          Yeni E-posta Adresi
        </label>

        <input
          id="newEmail"
          type="email"
          autoComplete="email"
          value={newEmail}
          onChange={(event) => onNewEmailChange(event.target.value)}
          placeholder="ornek@mail.com"
          required
          className="w-full rounded-xl border border-[#ddd4c5] bg-[#fffdf8] px-4 py-3 text-sm text-[#3f493e] outline-none transition placeholder:text-[#aaa194] focus:border-[#b47745] focus:ring-2 focus:ring-[#b47745]/10"
        />
      </div>

      {/* Mevcut şifre ile kimlik doğrulama */}
      <div>
        <label
          htmlFor="emailCurrentPassword"
          className="mb-2 block text-xs font-medium text-[#6f675a]"
        >
          Mevcut Şifren
        </label>

        <input
          id="emailCurrentPassword"
          type="password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(event) => onCurrentPasswordChange(event.target.value)}
          placeholder="Mevcut şifrenizi girin"
          required
          className="w-full rounded-xl border border-[#ddd4c5] bg-[#fffdf8] px-4 py-3 text-sm text-[#3f493e] outline-none transition placeholder:text-[#aaa194] focus:border-[#b47745] focus:ring-2 focus:ring-[#b47745]/10"
        />
      </div>

      {/* Formu göndererek e-posta değişikliği talebi oluşturur */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="rounded-xl w-full bg-[#a45f2a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#8f5123] active:scale-[0.98]"
        >
          E-posta Değişikliği İste
        </button>
      </div>
    </form>
  );
};

export default ChangeEmailForm;