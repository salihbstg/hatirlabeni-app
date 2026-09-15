import { useState } from "react";
import { forgotPassword} from "../api/AuthService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState<string>("");
  const navigate=useNavigate();
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await forgotPassword({
        identifier: identifier,
      });
      toast.success("Şifre sıfırlama bağlantısı kayıtlı mail adresinize gönderilmiştir, işleminize mail üzerinden devam edebilirsiniz.")
      setTimeout(()=>{
        navigate("/");
      },2000);
    } catch (error) {
      console.log(error);
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
              <span className="text-6xl">🔐</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Şifreni mi unuttun?
            </h1>

            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              Hesabına kayıtlı e-posta adresini gir. Sana şifre sıfırlama
              bağlantısı göndereceğiz.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username / Email */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Kullanıcı adı veya e-posta
              </label>

              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="Kullanıcı adı veya e-posta"
                autoComplete="username"
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
              Şifre Sıfırlama Bağlantısı Gönder
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

export default ForgotPassword;
