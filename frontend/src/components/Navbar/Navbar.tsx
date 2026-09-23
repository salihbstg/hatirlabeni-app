import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import UserMenu from "./UserMenu";
import CategoryMenuDesktop from "./CategoryMenuDesktop";
import CategoryMenuMobile from "./CategoryMenuMobile";

import logo from "../../assets/Logo.png";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Navbar, AuthProvider içerisinde kullanılmalıdır.");
  }

  const { isAuthenticated } = authContext;

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e8e2d5] bg-[#faf8f2]/95 shadow-[0_4px_20px_rgba(60,45,25,0.045)] backdrop-blur-xl">
      {/* ================= TOP BAR ================= */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex min-h-[76px] items-center gap-4 sm:gap-6 lg:gap-10">
          {/* Logo */}
          <Link
            to="/"
            aria-label="HatırlaBeni ana sayfa"
            className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-80"
          >
            <img
              src={logo}
              alt="HatırlaBeni"
              className="h-auto w-[100px] object-contain sm:w-[115px]"
            />
          </Link>

          {/* Desktop Search */}
          <div className="hidden min-w-0 flex-1 md:block">
            <div className="mx-auto w-full max-w-[560px]">
              <div className="group flex h-[46px] items-center gap-3 rounded-full border border-[#e5ddce] bg-[#f5f1e8] px-5 transition-all duration-300 focus-within:border-[#b58a61] focus-within:bg-[#fffdf8] focus-within:shadow-[0_0_0_3px_rgba(181,138,97,0.09)] hover:border-[#d3c4ad]">
                {/* Search Icon */}
                <svg
                  className="h-[19px] w-[19px] shrink-0 text-[#958873] transition-colors group-focus-within:text-[#a45f2a]"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="10.8"
                    cy="10.8"
                    r="6.8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />

                  <path
                    d="M16 16L21 21"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Ürün, kategori veya anı ara..."
                  aria-label="Ürün, kategori veya anı ara"
                  className="h-full w-full bg-transparent text-sm text-[#46564a] outline-none placeholder:text-[#aaa08e]"
                />

                <span className="hidden shrink-0 text-[11px] tracking-wide text-[#b3a791] lg:block">
                  HATIRLA
                </span>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">
            {/* Desktop User Menu */}
            <div className="hidden items-center md:flex">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8d0bf] px-5 py-2.5 text-sm font-semibold text-[#3f5147] transition-all duration-200 hover:border-[#3f5147] hover:bg-[#3f5147] hover:text-white"
                >
                  Giriş Yap
                  <span className="mx-1.5 text-[#b4a991]">/</span>
                  Kayıt Ol
                </Link>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center md:hidden">
              <CategoryMenuMobile />
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-4 md:hidden">
          <div className="group flex h-[44px] items-center gap-3 rounded-full border border-[#e5ddce] bg-[#f5f1e8] px-4 transition-all duration-300 focus-within:border-[#b58a61] focus-within:bg-[#fffdf8] focus-within:shadow-[0_0_0_3px_rgba(181,138,97,0.09)]">
            <svg
              className="h-[18px] w-[18px] shrink-0 text-[#958873] transition-colors group-focus-within:text-[#a45f2a]"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10.8"
                cy="10.8"
                r="6.8"
                stroke="currentColor"
                strokeWidth="1.6"
              />

              <path
                d="M16 16L21 21"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Ürün, kategori veya anı ara..."
              aria-label="Ürün, kategori veya anı ara"
              className="h-full w-full bg-transparent text-sm text-[#46564a] outline-none placeholder:text-[#aaa08e]"
            />
          </div>
        </div>
      </div>

      {/* ================= CATEGORY BAR ================= */}
      <div className="hidden border-t border-[#eee8dc] md:block">
        <div className="mx-auto flex min-h-[52px] max-w-[1440px] items-center justify-center px-4 sm:px-6 lg:px-10">
          <nav
            aria-label="Ana kategori menüsü"
            className="flex items-center justify-center"
          >
            <CategoryMenuDesktop />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;