const GoogleRegisterLoading = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F4F1E8] px-4">
            <div className="text-center">
                {/* Yüklenme animasyonu */}
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#3F5B55]/20 border-t-[#3F5B55]" />

                {/* Google hesap bilgileri yüklenirken gösterilen mesaj */}
                <p className="text-sm text-slate-600">
                    Google hesap bilgileriniz yükleniyor...
                </p>
            </div>
        </div>
    );
};

export default GoogleRegisterLoading;