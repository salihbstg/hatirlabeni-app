import React, { useState } from "react";
import logo from "./../assets/Logo.png";
import "./RegisterPage.css";
import type { RegisterForm } from "./../types/auth";
import { cities } from "../data/cities";
import { register } from "./../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function isValidTCKN(value: string): boolean {
  if (!/^\d{11}$/.test(value)) return false;
  if (value[0] === "0") return false;

  const digits = value.split("").map(Number);

  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];

  const digit10 = (oddSum * 7 - evenSum) % 10;
  const digit11 =
    digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0) % 10;

  return digits[9] === digit10 && digits[10] === digit11;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    nationalId: "",
    telephone: "",
    city: "",
    address: "",
    birthday: "",
  });
  return (
    <div className="register-wrapper flex flex-col min-h-screen flex items-center justify-center px-4 py-8">
      <img className="w-40 gap-3" src={logo} alt="yüklenemedi" />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!isValidTCKN(formData.nationalId)) {
            toast.error(
              "Lütfen T.C. standartlarına uygun bir kimlik numarası giriniz.",
            );
            return;
          }
          try {
            const response = await register(formData);
            console.log(response);
            toast.success(
              "Kayıt başarılı, giriş sayfasına yönlendiriliyorsunuz.",
            );
            setTimeout(() => {
              navigate("/login");
            }, 1500);
          } catch (e) {
            const errors = e.response?.data.errors;

            if (axios.isAxiosError(e)) {
              if (Array.isArray(errors)) {
                errors.forEach((message: string) => {
                  toast.error(message);
                });
              } else {
                Object.values(errors).forEach((message) => {
                  toast.error(message as string);
                });
              }
            }
            else{
              toast.error("Beklenmeyen bir hata oluştu.");
            }
          }
        }}
        action=""
        className="w-full max-w-4xl"
      >
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl">
          {/* FORM BAŞLIĞI */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Hesap Oluştur</h1>

            <p className="text-slate-400 mt-2">
              Bilgilerinizi girerek hesabınızı oluşturun.
            </p>
          </div>

          {/* INPUTLAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            {/* KULLANICI ADI */}
            <div className="flex flex-col w-full">
              <label
                className="font-semibold text-slate-200 mb-1"
                htmlFor="register-username"
              >
                Kullanıcı adı
              </label>

              <input
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    username: e.target.value,
                  });
                }}
                className="w-full rounded-lg px-3 py-2 bg-white text-black border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="register-username"
                name="register-username"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col w-full">
              <label
                className="font-semibold text-slate-200 mb-1"
                htmlFor="register-email"
              >
                Email
              </label>

              <input
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  });
                }}
                className="w-full rounded-lg px-3 py-2 bg-white text-black border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="register-email"
                name="register-email"
              />
            </div>
            {/* AD */}
            <div className="flex flex-col w-full">
              <label
                className="font-semibold text-slate-200 mb-1"
                htmlFor="register-name"
              >
                Ad
              </label>

              <input
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    firstName: e.target.value,
                  });
                }}
                className="w-full rounded-lg px-3 py-2 bg-white text-black border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="register-name"
                name="register-name"
              />
            </div>
            {/* SOYAD */}
            <div className="flex flex-col w-full">
              <label
                className="font-semibold text-slate-200 mb-1"
                htmlFor="register-lastname"
              >
                Soyad
              </label>

              <input
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    lastName: e.target.value,
                  });
                }}
                className="w-full rounded-lg px-3 py-2 bg-white text-black border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="register-lastname"
                name="register-lastname"
              />
            </div>

            {/* ŞİFRE */}
            <div className="flex flex-col w-full">
              <label
                className="font-semibold text-slate-200 mb-1"
                htmlFor="register-password"
              >
                Şifre
              </label>

              <input
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  });
                }}
                className="w-full rounded-lg px-3 py-2 bg-white text-black border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="register-password"
                name="register-password"
              />

              <small className="text-xs text-slate-400 mt-1 leading-5">
                En az 8 karakter, bir büyük harf, bir küçük harf, bir rakam ve
                bir özel karakter içermelidir.
              </small>
            </div>

            {/* TC */}
            <div className="flex flex-col w-full">
              <label
                className="font-semibold text-slate-200 mb-1"
                htmlFor="register-nationalId"
              >
                T.C. Kimlik Numarası
              </label>

              <input
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    nationalId: e.target.value,
                  });
                }}
                className="w-full rounded-lg px-3 py-2 bg-white text-black border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="register-nationalId"
                name="register-nationalId"
                inputMode="numeric"
                maxLength={11}
              />
            </div>

            {/* DOĞUM TARİHİ */}
            <div className="flex flex-col w-full">
              <label
                className="font-semibold text-slate-200 mb-1"
                htmlFor="register-birthday"
              >
                Doğum Tarihi
              </label>

              <input
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    birthday: e.target.value,
                  });
                }}
                className="w-full rounded-lg px-3 py-2 bg-white text-black border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                type="date"
                id="register-birthday"
                name="register-birthday"
              />
            </div>

            {/* TELEFON */}
            <div className="flex flex-col w-full">
              <label
                className="font-semibold text-slate-200 mb-1"
                htmlFor="register-phone"
              >
                Telefon Numarası
              </label>

              <input
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    telephone: e.target.value,
                  });
                }}
                className="w-full rounded-lg px-3 py-2 bg-white text-black border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                type="tel"
                inputMode="tel"
                placeholder="05XX XXX XX XX"
                id="register-phone"
                name="register-phone"
                maxLength={11}
              />
            </div>

            {/* ŞEHİR */}
            <div className="flex flex-col w-full">
              <label
                className="font-semibold text-slate-200 mb-1"
                htmlFor="city"
              >
                Şehir
              </label>

              <select
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    city: e.target.value,
                  });
                }}
                className="w-full rounded-lg px-3 py-2 bg-white text-black border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                id="city"
                name="city"
              >
                <option value="">Şehir seçiniz</option>

                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* ADRES */}
            <div className="flex flex-col w-full md:col-span-2">
              <label
                className="font-semibold text-slate-200 mb-1"
                htmlFor="register-address"
              >
                Adres
              </label>

              <textarea
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  });
                }}
                className="w-full bg-white text-black p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                maxLength={250}
                name="register-address"
                rows={5}
                id="register-address"
                placeholder="Adresinizi giriniz..."
              />
            </div>
          </div>

          {/* BUTON */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 transition duration-200"
            >
              Kayıt Ol
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
