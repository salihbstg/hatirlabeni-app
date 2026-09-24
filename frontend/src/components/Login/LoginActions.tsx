import { Link } from "react-router-dom";

interface LoginActionsProps {
  // Giriş isteği devam ederken butonun durumunu kontrol eder.
  isSubmitting: boolean;
}

const LoginActions = ({ isSubmitting }: LoginActionsProps) => {
  return (
    <>
      {/* Şifre sıfırlama sayfasına yönlendirir. */}
      <div className="-mt-2 flex justify-end">
        <Link
          to="/forgot-password"
          className="text-xs font-medium text-[#5C7D75] transition-colors hover:text-[#3F5B55] sm:text-sm"
        >
          Şifremi unuttum
        </Link>
      </div>

      {/* Giriş isteği sürerken butonu devre dışı bırakır ve durum metnini günceller. */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 min-h-11 w-full rounded-xl bg-[#3F5B55] px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-900/10 transition duration-200 hover:bg-[#344C47] hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Giriş yapılıyor..." : "Devam"}
      </button>

      {/* Hesabı olmayan kullanıcıyı kayıt sayfasına yönlendirir. */}
      <div className="mt-7 flex flex-col items-center justify-center gap-1 text-sm sm:flex-row">
        <p className="text-slate-400">Hesabın yok mu?</p>

        <Link
          to="/register"
          className="font-semibold text-[#5C7D75] transition-colors hover:text-[#3F5B55]"
        >
          Şimdi kaydol
        </Link>
      </div>
    </>
  );
};

export default LoginActions;