import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

import {
    GOOGLE_REGISTER_INPUT_CLASS,
    GOOGLE_REGISTER_LABEL_CLASS,
    GOOGLE_REGISTER_MESSAGES,
    GOOGLE_REGISTER_PAGE_CONTENT,
} from "../googleRegister.constants";

interface GoogleRegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    telephone: string;
    identityNumber: string;
    birthday: string;
}

interface GoogleRegisterFormProps {
    formData: GoogleRegisterFormData;
    loading: boolean;
    errorMessage: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const GoogleRegisterForm = ({
    formData,
    loading,
    errorMessage,
    handleChange,
    handleSubmit,
}: GoogleRegisterFormProps) => {
    return (
        <div className="px-6 py-8 sm:px-10 sm:py-10">
            {/* Kayıt sırasında oluşan hata mesajı */}
            {errorMessage && (
                <div
                    role="alert"
                    className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                >
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Ad ve soyad alanları */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="firstName"
                            className={GOOGLE_REGISTER_LABEL_CLASS}
                        >
                            Ad
                        </label>

                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            readOnly
                            className={`${GOOGLE_REGISTER_INPUT_CLASS} cursor-not-allowed bg-slate-100`}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className={GOOGLE_REGISTER_LABEL_CLASS}
                        >
                            Soyad
                        </label>

                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            readOnly
                            className={`${GOOGLE_REGISTER_INPUT_CLASS} cursor-not-allowed bg-slate-100`}
                            required
                        />
                    </div>
                </div>

                {/* Google hesabından alınan e-posta adresi */}
                <div>
                    <label
                        htmlFor="email"
                        className={GOOGLE_REGISTER_LABEL_CLASS}
                    >
                        E-posta adresi
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        readOnly
                        className={`${GOOGLE_REGISTER_INPUT_CLASS} cursor-not-allowed bg-slate-100`}
                        required
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                        {GOOGLE_REGISTER_PAGE_CONTENT.emailHint}
                    </p>
                </div>

                {/* Kullanıcının belirleyeceği kullanıcı adı */}
                <div>
                    <label
                        htmlFor="username"
                        className={GOOGLE_REGISTER_LABEL_CLASS}
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
                        className={GOOGLE_REGISTER_INPUT_CLASS}
                        minLength={3}
                        maxLength={30}
                        autoComplete="username"
                        required
                    />
                </div>

                {/* Telefon numarası */}
                <div>
                    <label
                        htmlFor="telephone"
                        className={GOOGLE_REGISTER_LABEL_CLASS}
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
                        className={GOOGLE_REGISTER_INPUT_CLASS}
                        maxLength={11}
                        pattern="05[0-9]{9}"
                        autoComplete="tel"
                        required
                    />
                </div>

                {/* T.C. Kimlik numarası */}
                <div>
                    <label
                        htmlFor="identityNumber"
                        className={GOOGLE_REGISTER_LABEL_CLASS}
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
                        className={GOOGLE_REGISTER_INPUT_CLASS}
                        maxLength={11}
                        pattern="[0-9]{11}"
                        required
                    />
                </div>

                {/* Doğum tarihi */}
                <div>
                    <label
                        htmlFor="birthday"
                        className={GOOGLE_REGISTER_LABEL_CLASS}
                    >
                        Doğum tarihi
                    </label>

                    <input
                        id="birthday"
                        name="birthday"
                        type="date"
                        value={formData.birthday}
                        onChange={handleChange}
                        className={GOOGLE_REGISTER_INPUT_CLASS}
                        autoComplete="bday"
                        required
                    />
                </div>

                {/* Kullanıcıya veri kullanım amacı hakkında bilgi */}
                <div className="rounded-xl border border-[#3F5B55]/10 bg-[#3F5B55]/5 px-4 py-3">
                    <p className="text-xs leading-5 text-slate-600">
                        {GOOGLE_REGISTER_PAGE_CONTENT.information}
                    </p>
                </div>

                {/* Kayıt işlemini başlatan buton */}
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
                        ? GOOGLE_REGISTER_MESSAGES.submitting
                        : GOOGLE_REGISTER_MESSAGES.submit}
                </button>

                {/* Giriş sayfasına yönlendirme */}
                <p className="text-center text-sm text-slate-500">
                    {GOOGLE_REGISTER_PAGE_CONTENT.loginPrompt}{" "}

                    <Link
                        to="/login"
                        className="font-semibold text-[#3F5B55] hover:underline"
                    >
                        {GOOGLE_REGISTER_PAGE_CONTENT.loginLink}
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default GoogleRegisterForm;