import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyMail, me } from "../api/AuthService";

const ActivationPage = () => {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [alreadyActivated, setAlreadyActivated] = useState(false);

  const token = searchParams.get("token");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        // Önce JWT ile mevcut kullanıcıyı kontrol et
        try {
          const response = await me();

          if (response.user.mailActivation) {
            console.log("Mail adresi zaten doğrulanmış.");
            setAlreadyActivated(true);
            return;
          }
        } catch (error) {
          // Kullanıcı giriş yapmamış olabilir.
          // Bu durumda activation token ile devam edeceğiz.
          console.log(
            "Me isteği başarısız oldu, activation token ile devam ediliyor."
          );
        }

        // Kullanıcının maili aktif değilse token gerekli
        if (!token) {
          setError(true);
          return;
        }

        console.log("Aktivasyon isteği gönderiliyor...");
        console.log("Token:", token);

        await verifyMail({
          token: token,
        });

        console.log("Aktivasyon başarılı.");
      } catch (error) {
        console.error("Mail aktivasyon hatası:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    activateAccount();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0] px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-10 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gray-100">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Mail Adresiniz Kontrol Ediliyor
          </h1>

          <p className="text-gray-500 text-sm leading-6">
            Lütfen bekleyin...
          </p>
        </div>
      </div>
    );
  }

  if (alreadyActivated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0] px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-10 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Mail Adresiniz Zaten Doğrulanmış
          </h1>

          <p className="text-gray-500 text-sm leading-6 mb-8">
            Mail adresiniz daha önce doğrulanmış. Hesabınızı kullanmaya devam
            edebilirsiniz.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center w-full
                       bg-black text-white font-semibold
                       rounded-lg px-5 py-3
                       hover:bg-gray-800 transition"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0] px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-10 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Mail Doğrulama Başarısız
          </h1>

          <p className="text-gray-500 text-sm leading-6 mb-8">
            Mail adresiniz doğrulanamadı. Aktivasyon bağlantısı geçersiz veya
            süresi dolmuş olabilir.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center w-full
                       bg-black text-white font-semibold
                       rounded-lg px-5 py-3
                       hover:bg-gray-800 transition"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0] px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-10 text-center">
        <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Mail Adresiniz Doğrulandı
        </h1>

        <p className="text-gray-500 text-sm leading-6 mb-8">
          Mail adresiniz başarıyla doğrulandı. Artık hesabınızı kullanmaya
          devam edebilirsiniz.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center w-full
                     bg-black text-white font-semibold
                     rounded-lg px-5 py-3
                     hover:bg-gray-800 transition"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
};

export default ActivationPage;