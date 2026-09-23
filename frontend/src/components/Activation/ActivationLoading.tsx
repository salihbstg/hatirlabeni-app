const ActivationLoading = () => {
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
};

export default ActivationLoading;