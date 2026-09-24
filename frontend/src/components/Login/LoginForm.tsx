import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { login } from "../../api/AuthService";
import { saveTokens } from "../../utils/Token";

import LoginFields from "./LoginFields";
import LoginActions from "./LoginActions";

import type { LoginRequest } from "../../types/auth";

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // Giriş formundaki kullanıcı bilgilerini tutar.
  const [formData, setFormData] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });

  // Giriş isteğinin devam edip etmediğini takip eder.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // LoginForm'un AuthProvider içerisinde kullanılmasını zorunlu kılar.
  if (!auth) {
    throw new Error("LoginForm, AuthProvider içerisinde kullanılmalıdır.");
  }

  const { setIsAuthenticated } = auth;

  // Form alanlarındaki değişiklikleri yönetir.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Kullanıcı giriş işlemini gerçekleştirir.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aynı anda birden fazla giriş isteği gönderilmesini engeller.
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Kimlik bilgilerini backend'e göndererek giriş yapar.
      const response = await login(formData);

      // Başarılı giriş sonrası access token'ı kaydeder.
      saveTokens(response.accessToken);

      // Uygulamanın oturum durumunu günceller.
      localStorage.setItem("sessionActive", "true");
      setIsAuthenticated(true);

      toast.success("Giriş başarılı, anasayfaya yönlendiriliyorsunuz.");

      // Başarılı girişten sonra kullanıcıyı ana sayfaya yönlendirir.
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      // Backend'den dönen HTTP hatalarını durum koduna göre yönetir.
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Kimlik doğrulama hatalarında backend'in gönderdiği hata mesajlarını gösterir.
          const errors: unknown = error.response.data?.errors;

          if (Array.isArray(errors)) {
            errors.forEach((message: unknown) => {
              if (typeof message === "string") {
                toast.error(message);
              }
            });
          } else {
            toast.error("Kullanıcı adı/e-posta veya şifre hatalı.");
          }
        } else if (error.response?.status && error.response.status >= 500) {
          toast.error(
            "Sunucuda bir sorun oluştu. Lütfen daha sonra tekrar deneyin.",
          );
        } else {
          toast.error("Beklenmeyen bir hata oluştu.");
        }
      } else {
        toast.error("Beklenmeyen bir hata oluştu.");
      }
    } finally {
      // İstek tamamlandığında butonu tekrar aktif hale getirir.
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6 py-8 sm:px-8 sm:py-10">
      {/* Giriş formu ve alt component'ler */}
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {/* Kullanıcı adı/e-posta ve şifre alanları */}
        <LoginFields
          formData={formData}
          handleChange={handleChange}
        />

        {/* Şifre sıfırlama, giriş ve kayıt ol işlemleri */}
        <LoginActions isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default LoginForm;