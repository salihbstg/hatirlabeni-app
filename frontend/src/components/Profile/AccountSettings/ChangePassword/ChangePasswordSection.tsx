import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

import { changePassword } from "../../../../api/AuthService";

import ChangePasswordForm from "./ChangePasswordForm";
import ChangePasswordInfo from "./ChangePasswordInfo";

const ChangePasswordSection = () => {
  // Form state'leri
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // İşlem durumu
  const [isLoading, setIsLoading] = useState(false);

  // Şifre değiştirme işlemi
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Yeni şifrelerin eşleşmesini kontrol et
    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifreler birbiriyle eşleşmiyor.");
      return;
    }

    // Yeni şifrenin mevcut şifreyle aynı olmasını engelle
    if (currentPassword === newPassword) {
      toast.error("Yeni şifren mevcut şifrenle aynı olamaz.");
      return;
    }

    try {
      setIsLoading(true);

      await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success("Şifre değişikliği tamamlandı.");

      // İşlem başarılı olursa formu temizle
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Şifre değiştirme hatası:", error);

      toast.error(
        "Şifre değiştirilemedi. Mevcut şifreni kontrol et."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#e8e0d2] bg-[#fffdf8] p-5 shadow-[0_4px_18px_rgba(63,52,35,0.04)] sm:p-6">
      {/* Bilgilendirme alanı */}
      <div className="mb-6 border-b border-[#eee7da] pb-4">
        <ChangePasswordInfo />
      </div>

      {/* Şifre değiştirme formu */}
      <ChangePasswordForm
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        isLoading={isLoading}
        onCurrentPasswordChange={setCurrentPassword}
        onNewPasswordChange={setNewPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChangePasswordSection;