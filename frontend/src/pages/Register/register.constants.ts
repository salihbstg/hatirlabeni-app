// register.constants.ts

export const REGISTER_PAGE_CONTENT = {
  title: "Hesap Oluştur",
  description: "HatırlaBeni ailesine katıl, anılarını biriktirmeye başla.",
};

export const REGISTER_FORM_TEXTS = {
  personalInfoTitle: "Kişisel Bilgiler",
  accountInfoTitle: "Hesap Bilgileri",

  firstName: "Ad",
  lastName: "Soyad",
  telephone: "Telefon",
  birthday: "Doğum Tarihi",
  tckn: "T.C. Kimlik Numarası",

  email: "E-posta",
  username: "Kullanıcı Adı",
  password: "Şifre",
  repeatPassword: "Şifre Tekrarı",

  submit: "Hesap Oluştur",
  loading: "Hesap oluşturuluyor...",
};

export const REGISTER_PLACEHOLDERS = {
  firstName: "Adınızı girin",
  lastName: "Soyadınızı girin",
  telephone: "05XX XXX XX XX",
  tckn: "T.C. kimlik numaranızı girin",
  email: "E-posta adresinizi girin",
  username: "Kullanıcı adı belirleyin",
  password: "Şifre belirleyin",
  repeatPassword: "Şifrenizi tekrar girin",
};

export const REGISTER_MESSAGES = {
  success: "Hesabınız başarıyla oluşturuldu!",
  genericError: "Kayıt sırasında bir hata oluştu.",
  passwordMismatch: "Şifreler eşleşmiyor.",
};

export const REGISTER_REDIRECT = {
  path: "/login",
  delay: 1500,
};

export const REGISTER_STYLES = {
  input:
    "w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#8B5E3C]",
  label: "mb-1.5 block text-sm font-medium text-gray-700",
  sectionTitle: "mb-4 text-lg font-semibold text-gray-800",
  button:
    "w-full rounded-lg bg-[#8B5E3C] px-4 py-3 font-semibold text-white transition hover:bg-[#754C30] disabled:cursor-not-allowed disabled:opacity-60",
};