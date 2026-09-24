import logo from "../../../assets/Logo.png";

import { GOOGLE_REGISTER_PAGE_CONTENT } from "../googleRegister.constants";

const GoogleRegisterHeader = () => {
    return (
        <div className="bg-[#3F5B55] px-6 py-8 text-center sm:px-10">
            {/* HatırlaBeni logosu */}
            <img
                src={logo}
                alt="Hatırla Beni"
                className="mx-auto mb-4 h-16 w-auto object-contain"
            />

            {/* Sayfa başlığı */}
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {GOOGLE_REGISTER_PAGE_CONTENT.title}
            </h1>

            {/* Google kayıt sürecini açıklayan metin */}
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-emerald-50/80">
                {GOOGLE_REGISTER_PAGE_CONTENT.description}
            </p>
        </div>
    );
};

export default GoogleRegisterHeader;