import { useState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "../api/AuthService";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [searchParams] = useSearchParams();
  const navigate=useNavigate();
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = searchParams.get("token");

    if (password !== passwordConfirm) {
      toast.error("Şifreler eşleşmiyor.");
      return;
    }

    if(!token){
        toast.error("Token bulunamadı.");
        return;
    }
    try {
      await resetPassword({
        token: token,
        newPassword: password,
      });
      toast.success("Şifre başarıyla değiştirildi, giriş ekranına yönlendiriliyorsunuz.");
      setTimeout(()=>{
        navigate("/login");
      },2000);
    } catch (error) {
      console.log(error);
      toast.error("Şifre sıfırlama işlemi başarısız.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100">
              <span className="text-5xl">🔑</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Şifreni Yenile
            </h1>

            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              Yeni şifreni belirle. Güvenliğin için güçlü bir şifre kullanmanı
              öneriyoruz.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Yeni şifre
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Yeni şifrenizi girin"
                autoComplete="new-password"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-gray-300
                  text-gray-900
                  placeholder-gray-400
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-100
                "
              />

              <small className="mt-2 block text-xs leading-5 text-slate-400">
                En az 8 karakter, bir büyük harf, bir küçük harf, bir rakam ve
                bir özel karakter içermelidir.
              </small>
            </div>

            {/* Password Confirmation */}
            <div>
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Yeni şifre tekrar
              </label>

              <input
                id="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                placeholder="Yeni şifrenizi tekrar girin"
                autoComplete="new-password"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-gray-300
                  text-gray-900
                  placeholder-gray-400
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-100
                "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full
                py-3
                px-4
                rounded-lg
                bg-indigo-600
                text-white
                font-medium
                transition
                hover:bg-indigo-700
                active:scale-[0.98]
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                focus:ring-offset-2
              "
            >
              Şifremi Güncelle
            </button>
          </form>

          {/* Back */}
          <div className="mt-6 text-center">
            <a
              href="/login"
              className="
                text-sm
                text-gray-500
                transition
                hover:text-indigo-600
              "
            >
              ← Giriş sayfasına dön
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
