import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import logo from "../assets/Logo.png";
import { AuthContext } from "../context/AuthContext";

const API_URL = "http://localhost:8080/api/v1";

const GoogleRegisterPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        telephone: "",
        identityNumber: "",
        birthday: "",
    });

    const [loading, setLoading] = useState(false);
    const [fetchingGoogleInfo, setFetchingGoogleInfo] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    // Google OAuth2 üzerinden gelen bilgileri al
    useEffect(() => {
        const fetchGoogleInfo = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/auth/google/register-info`,
                    {
                        withCredentials: true,
                    }
                );

                setFormData((prev) => ({
                    ...prev,
                    firstName: response.data.firstName ?? "",
                    lastName: response.data.lastName ?? "",
                    email: response.data.email ?? "",
                }));
            } catch (error) {
                console.error("Google bilgileri alınamadı:", error);

                setErrorMessage(
                    "Google kayıt bilgileriniz alınamadı. Lütfen Google ile tekrar giriş yapın."
                );
            } finally {
                setFetchingGoogleInfo(false);
            }
        };

        fetchGoogleInfo();
    }, []);

    // Form alanlarını güncelle
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Google kayıt işlemi
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");

        if (!/^05\d{9}$/.test(formData.telephone)) {
            setErrorMessage("Geçerli bir telefon numarası girin.");
            return;
        }

        if (!/^\d{11}$/.test(formData.identityNumber)) {
            setErrorMessage("T.C. Kimlik numarası 11 haneli olmalıdır.");
            return;
        }

        if (!formData.username.trim()) {
            setErrorMessage("Kullanıcı adı boş bırakılamaz.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${API_URL}/auth/google/register`,
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    username: formData.username.trim(),
                    telephone: formData.telephone,
                    identityNumber: formData.identityNumber,
                    birthday: formData.birthday,
                },
                {
                    withCredentials: true,
                }
            );

            const { accessToken } = response.data;

            // Backend access token döndürmediyse oturum açma
            if (!accessToken) {
                throw new Error(
                    "Kayıt başarılı ancak access token alınamadı."
                );
            }

            // AuthContext üzerinden oturumu aç
            login(accessToken);

            toast.success("Google hesabınız başarıyla oluşturuldu!");

            // Ana sayfaya yönlendir
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Google kayıt hatası:", error);

            const message =
                error.response?.data?.message ||
                error.message ||
                "Kayıt oluşturulurken bir hata meydana geldi.";

            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-[#FAFAF8] px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#3F5B55] focus:ring-2 focus:ring-[#3F5B55]/10";

    const labelClass =
        "mb-2 block text-sm font-medium text-slate-700";

    // Google bilgileri yükleniyor
    if (fetchingGoogleInfo) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F4F1E8] px-4">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#3F5B55]/20 border-t-[#3F5B55]" />

                    <p className="text-sm text-slate-600">
                        Google hesap bilgileriniz yükleniyor...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F1E8] px-4 py-10">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center justify-center">
                <div className="w-full">
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">

                        {/* HEADER */}
                        <div className="bg-[#3F5B55] px-6 py-8 text-center sm:px-10">
                            <img
                                src={logo}
                                alt="Hatırla Beni"
                                className="mx-auto mb-4 h-16 w-auto object-contain"
                            />

                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                Kaydını Tamamla
                            </h1>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-emerald-50/80">
                                Google hesabınla giriş yaptın. HatırlaBeni
                                ailesine katılmak için bilgilerini tamamla.
                            </p>
                        </div>

                        {/* FORM */}
                        <div className="px-6 py-8 sm:px-10 sm:py-10">
                            {errorMessage && (
                                <div
                                    role="alert"
                                    className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                                >
                                    {errorMessage}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                {/* AD - SOYAD */}
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className={labelClass}
                                        >
                                            Ad
                                        </label>

                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            readOnly
                                            className={`${inputClass} cursor-not-allowed bg-slate-100`}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className={labelClass}
                                        >
                                            Soyad
                                        </label>

                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            readOnly
                                            className={`${inputClass} cursor-not-allowed bg-slate-100`}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* E-POSTA */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className={labelClass}
                                    >
                                        E-posta adresi
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        readOnly
                                        className={`${inputClass} cursor-not-allowed bg-slate-100`}
                                        required
                                    />

                                    <p className="mt-1.5 text-xs text-slate-400">
                                        Google hesabınızla doğrulanan e-posta
                                        adresi.
                                    </p>
                                </div>

                                {/* KULLANICI ADI */}
                                <div>
                                    <label
                                        htmlFor="username"
                                        className={labelClass}
                                    >
                                        Kullanıcı adı
                                    </label>

                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Kullanıcı adınızı belirleyin"
                                        className={inputClass}
                                        minLength={3}
                                        maxLength={30}
                                        autoComplete="username"
                                        required
                                    />
                                </div>

                                {/* TELEFON */}
                                <div>
                                    <label
                                        htmlFor="telephone"
                                        className={labelClass}
                                    >
                                        Telefon numarası
                                    </label>

                                    <input
                                        id="telephone"
                                        name="telephone"
                                        type="tel"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        placeholder="05XX XXX XX XX"
                                        className={inputClass}
                                        maxLength={11}
                                        pattern="05[0-9]{9}"
                                        autoComplete="tel"
                                        required
                                    />
                                </div>

                                {/* TC KİMLİK */}
                                <div>
                                    <label
                                        htmlFor="identityNumber"
                                        className={labelClass}
                                    >
                                        T.C. Kimlik No
                                    </label>

                                    <input
                                        id="identityNumber"
                                        name="identityNumber"
                                        type="text"
                                        inputMode="numeric"
                                        value={formData.identityNumber}
                                        onChange={handleChange}
                                        placeholder="11 haneli T.C. Kimlik Numaranız"
                                        className={inputClass}
                                        maxLength={11}
                                        pattern="[0-9]{11}"
                                        required
                                    />
                                </div>

                                {/* DOĞUM TARİHİ */}
                                <div>
                                    <label
                                        htmlFor="birthday"
                                        className={labelClass}
                                    >
                                        Doğum tarihi
                                    </label>

                                    <input
                                        id="birthday"
                                        name="birthday"
                                        type="date"
                                        value={formData.birthday}
                                        onChange={handleChange}
                                        className={inputClass}
                                        autoComplete="bday"
                                        required
                                    />
                                </div>

                                {/* BİLGİLENDİRME */}
                                <div className="rounded-xl border border-[#3F5B55]/10 bg-[#3F5B55]/5 px-4 py-3">
                                    <p className="text-xs leading-5 text-slate-600">
                                        Bilgileriniz hesabınızın oluşturulması
                                        ve profilinizin tamamlanması amacıyla
                                        kullanılacaktır.
                                    </p>
                                </div>

                                {/* SUBMIT */}
                                <button
                                    type="submit"
                                    disabled={
                                        loading ||
                                        !formData.email ||
                                        !formData.username.trim()
                                    }
                                    className="flex w-full items-center justify-center rounded-xl bg-[#3F5B55] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#344D47] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Kaydınız oluşturuluyor..."
                                        : "Kaydımı Tamamla"}
                                </button>

                                {/* LOGIN LINK */}
                                <p className="text-center text-sm text-slate-500">
                                    Zaten hesabınız var mı?{" "}
                                    <Link
                                        to="/login"
                                        className="font-semibold text-[#3F5B55] hover:underline"
                                    >
                                        Giriş yap
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>

                    <p className="mt-5 text-center text-xs text-slate-400">
                        HatırlaBeni · Geçmişten güzel anılar, geleceğe güzel
                        hatıralar.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GoogleRegisterPage;