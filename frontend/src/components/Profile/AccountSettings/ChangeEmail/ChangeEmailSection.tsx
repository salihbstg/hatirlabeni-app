import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { sendChangeEmailLink } from "../../../../api/AuthService";

// Alt bileşenler
import ChangeEmailForm from "./ChangeEmailForm";
import ChangeEmailInfo from "./ChangeEmailInfo";

const ChangeEmailSection = () => {
  // Form alanlarının değerlerini ana component yönetir.
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  /**
   * E-posta değişikliği talebini gönderir.
   * Başarılı olursa form alanlarını temizler.
   * Hata durumunda backend yanıtına göre kullanıcıyı bilgilendirir.
   */
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    // Boş veya yalnızca boşluk içeren alanların gönderilmesini engeller.
    if (!newEmail.trim() || !currentPassword.trim()) {
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      await sendChangeEmailLink({
        newEmail: newEmail.trim(),
        password: currentPassword,
      });

      toast.success(
        "E-posta değişikliği için doğrulama bağlantısı yeni e-posta adresinize gönderildi.",
      );

      // İstek başarılı olduğunda hassas form verilerini temizle.
      setNewEmail("");
      setCurrentPassword("");
    } catch (error: unknown) {
      // Axios hatalarını güvenli şekilde ele alır.
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const backendMessage = error.response?.data?.message;

        if (status === 400) {
          toast.error(
            backendMessage ||
              "Girdiğiniz bilgiler geçersiz. Lütfen kontrol edin.",
          );
        } else if (status === 401) {
          toast.error("Mevcut parolanız yanlış.");
        } else if (status === 409) {
          toast.error(
            backendMessage || "Bu e-posta adresi zaten kullanılıyor.",
          );
        } else if (!error.response) {
          toast.error(
            "Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edin.",
          );
        } else {
          toast.error(
            backendMessage || "E-posta değiştirme isteği başarısız oldu.",
          );
        }

        return;
      }

      // Axios dışındaki beklenmeyen hatalar.
      toast.error("Beklenmeyen bir hata oluştu.");
    }
  };

  return (
    <div className="rounded-2xl border border-[#e8e0d2] bg-[#fffdf8] p-5 shadow-[0_4px_18px_rgba(63,52,35,0.04)] sm:p-6">
      {/* Section Header */}
      <div className="mb-6 border-b border-[#eee7da] pb-4">
        <h3 className="text-base font-semibold tracking-tight text-[#3f493e] sm:text-lg">
          E-posta Adresini Değiştir
        </h3>

        <p className="mt-1.5 text-xs leading-5 text-[#928878]">
          Hesabına bağlı e-posta adresini güncelleyebilirsin.
          Güvenliğin için mevcut şifreni doğrulaman gerekir.
        </p>
      </div>

      {/* E-posta değişikliği formu */}
      <ChangeEmailForm
        newEmail={newEmail}
        currentPassword={currentPassword}
        onNewEmailChange={setNewEmail}
        onCurrentPasswordChange={setCurrentPassword}
        onSubmit={handleSubmit}
      />

      {/* E-posta doğrulama süreci hakkında bilgilendirme */}
      <div className="mt-4">
        <ChangeEmailInfo />
      </div>
    </div>
  );
};

export default ChangeEmailSection;