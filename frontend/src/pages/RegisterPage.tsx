import React, { useState } from "react";
import logo from "./../assets/Logo.png";
import "./RegisterPage.css";
import type { RegisterForm } from "../types/Auth";
import { register } from "./../api/AuthService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function isValidTCKN(value: string): boolean {
  if (!/^\d{11}$/.test(value)) return false;
  if (value[0] === "0") return false;

  const digits = value.split("").map(Number);

  const oddSum =
    digits[0] +
    digits[2] +
    digits[4] +
    digits[6] +
    digits[8];

  const evenSum =
    digits[1] +
    digits[3] +
    digits[5] +
    digits[7];

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
    <div className="min-h-screen bg-[#F4F1E8] px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (!isValidTCKN(formData.nationalId)) {
              toast.error(
                "Lütfen T.C. standartlarına uygun bir kimlik numarası giriniz."
              );
              return;
            }

            try {
              const response = await register(formData);
              console.log(response);

              toast.success(
                "Kayıt başarılı, giriş sayfasına yönlendiriliyorsunuz."
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
              } else {
                toast.error("Beklenmeyen bir hata oluştu.");
              }
            }
          }}
          action=""
          className="w-full"
        >
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">

            {/* ÜST KISIM */}
            <div className="bg-[#3F5B55] px-6 py-10 text-center sm:px-10">
              <img
                className="mx-auto mb-5 h-20 w-auto object-contain"
                src={logo}
                alt="Hatırla Beni"
              />

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Hesap Oluştur
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-emerald-50/80">
                Hatırla Beni'ye katılmak için bilgilerinizi eksiksiz şekilde
                doldurun.
              </p>
            </div>

            {/* FORM */}
            <div className="px-6 py-8 sm:px-10 sm:py-10">

              {/* KİŞİSEL BİLGİLER */}
              <div className="mb-8">
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

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* KULLANICI ADI */}
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-semibold text-slate-700"
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
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                      type="text"
                      id="register-username"
                      name="register-username"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-semibold text-slate-700"
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
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                      type="email"
                      id="register-email"
                      name="register-email"
                    />
                  </div>

                  {/* AD */}
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-semibold text-slate-700"
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
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                      type="text"
                      id="register-name"
                      name="register-name"
                    />
                  </div>

                  {/* SOYAD */}
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-semibold text-slate-700"
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
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                      type="text"
                      id="register-lastname"
                      name="register-lastname"
                    />
                  </div>

                  {/* TC */}
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-semibold text-slate-700"
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
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                      type="text"
                      id="register-nationalId"
                      name="register-nationalId"
                      inputMode="numeric"
                      maxLength={11}
                    />
                  </div>

                  {/* DOĞUM TARİHİ */}
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-semibold text-slate-700"
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
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                      type="date"
                      id="register-birthday"
                      name="register-birthday"
                    />
                  </div>

                  {/* TELEFON */}
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-semibold text-slate-700"
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
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                      type="tel"
                      inputMode="tel"
                      placeholder="05XX XXX XX XX"
                      id="register-phone"
                      name="register-phone"
                      maxLength={11}
                    />
                  </div>

                </div>
              </div>

              {/* HESAP BİLGİLERİ */}
              <div className="border-t border-slate-100 pt-8">
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

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* ŞİFRE */}
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-semibold text-slate-700"
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
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                      type="password"
                      id="register-password"
                      name="register-password"
                    />

                    <small className="mt-2 text-xs leading-5 text-slate-400">
                      En az 8 karakter, bir büyük harf, bir küçük harf,
                      bir rakam ve bir özel karakter içermelidir.
                    </small>
                  </div>

                  {/* ŞİFRE TEKRAR */}
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-semibold text-slate-700"
                      htmlFor="register-password-repeat"
                    >
                      Şifreyi tekrar giriniz
                    </label>

                    <input
                      required
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#6B8F86] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                      type="password"
                      id="register-password-repeat"
                      name="register-password-repeat"
                    />
                  </div>

                </div>
              </div>

              {/* BUTON */}
              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#3F5B55] px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-900/10 transition duration-200 hover:bg-[#344C47] hover:shadow-xl active:scale-[0.99]"
                >
                  Kayıt Ol
                </button>

                <p className="mt-4 text-center text-xs text-slate-400">
                  Hesap oluşturarak kullanım koşullarını kabul etmiş olursunuz.
                </p>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;