import useGoogleRegister from "./hooks/useGoogleRegister";

import GoogleRegisterForm from "./components/GoogleRegisterForm";
import GoogleRegisterHeader from "./components/GoogleRegisterHeader";
import GoogleRegisterLoading from "./components/GoogleRegisterLoading";

const GoogleRegisterPage = () => {
    const {
        formData,
        loading,
        fetchingGoogleInfo,
        errorMessage,
        handleChange,
        handleSubmit,
    } = useGoogleRegister();

    // Google hesap bilgileri yüklenirken loading ekranını göster.
    if (fetchingGoogleInfo) {
        return <GoogleRegisterLoading />;
    }

    return (
        <div className="min-h-screen bg-[#F4F1E8] px-4 py-10">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center justify-center">
                <div className="w-full">
                    {/* Sayfa başlığı ve Google kayıt açıklaması */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
                        <GoogleRegisterHeader />

                        {/* Kayıt formu */}
                        <GoogleRegisterForm
                            formData={formData}
                            loading={loading}
                            errorMessage={errorMessage}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>

                    {/* Sayfa alt bilgisi */}
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