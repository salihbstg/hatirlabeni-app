import { Link } from "react-router-dom";

interface ActivationResultProps {
  status: "success" | "already-activated" | "error";
}

const ActivationResult = ({ status }: ActivationResultProps) => {
  const isError = status === "error";
  const isAlreadyActivated = status === "already-activated";

  const title = isError
    ? "Mail Doğrulama Başarısız"
    : isAlreadyActivated
      ? "Mail Adresiniz Zaten Doğrulanmış"
      : "Mail Adresiniz Doğrulandı";

  const description = isError
    ? "Mail adresiniz doğrulanamadı. Aktivasyon bağlantısı geçersiz veya süresi dolmuş olabilir."
    : isAlreadyActivated
      ? "Mail adresiniz daha önce doğrulanmış. Hesabınızı kullanmaya devam edebilirsiniz."
      : "Mail adresiniz başarıyla doğrulandı. Artık hesabınızı kullanmaya devam edebilirsiniz.";

  const iconColor = isError
    ? "bg-red-100 text-red-600"
    : "bg-green-100 text-green-600";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0] px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-10 text-center">
        <div
          className={`mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full ${iconColor}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isError ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            )}
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          {title}
        </h1>

        <p className="text-gray-500 text-sm leading-6 mb-8">
          {description}
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center w-full bg-black text-white font-semibold rounded-lg px-5 py-3 hover:bg-gray-800 transition"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
};

export default ActivationResult;