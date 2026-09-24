// API
export const GOOGLE_REGISTER_API_URL =
    "http://localhost:8080/api/v1";

// Form input styles
export const GOOGLE_REGISTER_INPUT_CLASS =
    "w-full rounded-xl border border-slate-200 bg-[#FAFAF8] px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#3F5B55] focus:ring-2 focus:ring-[#3F5B55]/10";

export const GOOGLE_REGISTER_LABEL_CLASS =
    "mb-2 block text-sm font-medium text-slate-700";

// Validation messages
export const GOOGLE_REGISTER_VALIDATION_MESSAGES = {
    telephone: "Geçerli bir telefon numarası girin.",
    identityNumber: "T.C. Kimlik numarası 11 haneli olmalıdır.",
    username: "Kullanıcı adı boş bırakılamaz.",
} as const;

// Google OAuth messages
export const GOOGLE_REGISTER_MESSAGES = {
    googleInfoError:
        "Google kayıt bilgileriniz alınamadı. Lütfen Google ile tekrar giriş yapın.",

    registrationSuccess:
        "Google hesabınız başarıyla oluşturuldu!",

    registrationError:
        "Kayıt oluşturulurken bir hata meydana geldi.",

    missingAccessToken:
        "Kayıt başarılı ancak access token alınamadı.",

    loadingGoogleInfo:
        "Google hesap bilgileriniz yükleniyor...",

    submitting:
        "Kaydınız oluşturuluyor...",

    submit:
        "Kaydımı Tamamla",
} as const;

// Page content
export const GOOGLE_REGISTER_PAGE_CONTENT = {
    title: "Kaydını Tamamla",

    description:
        "Google hesabınla giriş yaptın. HatırlaBeni ailesine katılmak için bilgilerini tamamla.",

    information:
        "Bilgileriniz hesabınızın oluşturulması ve profilinizin tamamlanması amacıyla kullanılacaktır.",

    emailHint:
        "Google hesabınızla doğrulanan e-posta adresi.",

    loginPrompt: "Zaten hesabınız var mı?",

    loginLink: "Giriş yap",

    footer:
        "HatırlaBeni · Geçmişten güzel anılar, geleceğe güzel hatıralar.",
} as const;