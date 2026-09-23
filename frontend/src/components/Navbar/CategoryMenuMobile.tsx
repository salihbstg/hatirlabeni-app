import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import navbarMenuIcon from "../../assets/Navbar/MenuIcon.png";
import menuCloseIcon from "../../assets/Navbar/MenuCloseIcon.png";

import avatar from "../../assets/Navbar/Avatar.png";
import email from "../../assets/Navbar/email.png";
import logout from "../../assets/Navbar/logout.png";
import OrdersMe from "../../assets/Navbar/OrdersMe.png";
import setting from "../../assets/Navbar/setting.png";
import mobileMenuCart from "../../assets/Navbar/MobileMenuCart.png";
import navbarProfileIcon from "../../assets/Navbar/NavbarProfileIcon.png";

import { categories } from "../../data/categories";
import { AuthContext } from "../../context/AuthContext";
import { deleteTokens } from "../../utils/Token";

const CategoryMenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("CategoryMenuMobile must be used within AuthProvider");
  }

  const { isAuthenticated, setIsAuthenticated } = authContext;

  const navigate = useNavigate();

  // Menüyü kapat ve açık kategoriyi sıfırla
  const closeMenu = () => {
    setIsOpen(false);
    setSelectedEra(null);
  };

  // Menü dışına tıklama ve Escape tuşu kontrolü
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Ana menüyü aç / kapat
  const handleMenuToggle = () => {
    setIsOpen((current) => !current);
  };

  // Kategori dönemini aç / kapat
  const handleEraToggle = (era: string) => {
    setSelectedEra((current) => (current === era ? null : era));
  };

  // Sayfaya yönlendir ve menüyü kapat
  const handleNavigate = (path: string) => {
    navigate(path);
    closeMenu();
  };

  // Kullanıcı çıkışı
  const handleLogout = () => {
    deleteTokens();
    setIsAuthenticated(false);
    closeMenu();

    navigate("/login");
  };

  return (
    <div ref={menuRef} className="relative md:hidden">
      {/* Mobile Menu Toggle */}
      <button
        type="button"
        onClick={handleMenuToggle}
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
        className="group relative h-15 w-15 overflow-hidden select-none"
      >
        {/* Menu Icon */}
        <img
          src={navbarMenuIcon}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-contain
            transition-all duration-300 ease-out ${
              isOpen
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100 group-hover:scale-105"
            }`}
        />

        {/* Close Icon */}
        <img
          src={menuCloseIcon}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-contain
            transition-all duration-300 ease-out ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
        />
      </button>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-navigation-menu"
        aria-hidden={!isOpen}
        className={`absolute right-0 top-full z-50 mt-3
          w-[min(320px,calc(100vw-2rem))]
          origin-top-right overflow-hidden rounded-2xl
          border border-black/5 bg-[#F8F9FA]/95
          shadow-xl backdrop-blur-sm
          transition-all duration-300 ease-out ${
            isOpen
              ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
              : "pointer-events-none invisible -translate-y-3 scale-95 opacity-0"
          }`}
      >
        <div className="flex max-h-[calc(100dvh-100px)] flex-col overflow-y-auto p-3">
          {/* Categories */}
          <div className="mb-2 border-b border-black/10 pb-2">
            {Object.entries(categories).map(([era, eraCategories]) => {
              const isEraOpen = selectedEra === era;

              return (
                <div key={era}>
                  {/* Era Button */}
                  <button
                    type="button"
                    onClick={() => handleEraToggle(era)}
                    aria-expanded={isEraOpen}
                    className="group flex w-full items-center justify-between
                      rounded-lg px-4 py-3 text-left font-bold
                      transition-colors duration-200
                      hover:bg-black/[0.06]
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-black/30"
                  >
                    <span>{era}</span>

                    <span
                      aria-hidden="true"
                      className={`text-xs transition-transform duration-300 ${
                        isEraOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {/* Era Categories */}
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-out ${
                      isEraOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0">
                      <div className="ml-3 flex flex-col border-l border-black/10 pb-1 pl-3">
                        {eraCategories.map((category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => {
                              // Kategori yönlendirmesi mevcut değil.
                              // Route yapısı belirlendiğinde buraya eklenecek.
                              closeMenu();
                            }}
                            className="rounded-lg px-3 py-2 text-left
                              text-sm font-normal
                              transition-all duration-200
                              hover:bg-black/[0.06] hover:pl-5
                              focus-visible:outline-none
                              focus-visible:ring-2 focus-visible:ring-black/30"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Authenticated User Menu */}
          {isAuthenticated ? (
            <div className="flex flex-col gap-1">
              {/* Cart */}
              <button
                type="button"
                onClick={() => handleNavigate("/cart")}
                className="group flex w-full items-center gap-3
                  rounded-lg px-4 py-3 text-left
                  transition-all duration-200
                  hover:bg-black/[0.06] hover:pl-5"
              >
                <img
                  src={mobileMenuCart}
                  alt=""
                  aria-hidden="true"
                  className="w-5 transition-transform duration-200
                    group-hover:scale-110"
                />

                <span>Sepetim</span>
              </button>

              {/* Profile */}
              <button
                type="button"
                onClick={() => handleNavigate("/profile")}
                className="group flex w-full items-center gap-3
                  rounded-lg px-4 py-3 text-left
                  transition-all duration-200
                  hover:bg-black/[0.06] hover:pl-5"
              >
                <img
                  src={navbarProfileIcon}
                  alt=""
                  aria-hidden="true"
                  className="w-5 transition-transform duration-200
                    group-hover:scale-110"
                />

                <span>Hesabım</span>
              </button>

              {/* Orders */}
              <button
                type="button"
                onClick={() => handleNavigate("/orders/me")}
                className="group flex w-full items-center gap-3
                  rounded-lg px-4 py-3 text-left
                  transition-all duration-200
                  hover:bg-black/[0.06] hover:pl-5"
              >
                <img
                  src={OrdersMe}
                  alt=""
                  aria-hidden="true"
                  className="w-5 transition-transform duration-200
                    group-hover:scale-110"
                />

                <span>Tüm Siparişlerim</span>
              </button>

              {/* Settings */}
              <button
                type="button"
                onClick={() => handleNavigate("/settings")}
                className="group flex w-full items-center gap-3
                  rounded-lg px-4 py-3 text-left
                  transition-all duration-200
                  hover:bg-black/[0.06] hover:pl-5"
              >
                <img
                  src={setting}
                  alt=""
                  aria-hidden="true"
                  className="w-5 transition-transform duration-200
                    group-hover:scale-110"
                />

                <span>Ayarlar</span>
              </button>

              {/* Messages */}
              <button
                type="button"
                onClick={() => handleNavigate("/messages/me")}
                className="group flex w-full items-center gap-3
                  rounded-lg px-4 py-3 text-left
                  transition-all duration-200
                  hover:bg-black/[0.06] hover:pl-5"
              >
                <img
                  src={email}
                  alt=""
                  aria-hidden="true"
                  className="w-5 transition-transform duration-200
                    group-hover:scale-110"
                />

                <span>Mesajlarım</span>
              </button>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="group mt-1 flex w-full items-center gap-3
                  rounded-lg border-t border-black/10
                  px-4 py-3 pt-4 text-left
                  transition-all duration-200
                  hover:bg-black/[0.06] hover:pl-5"
              >
                <img
                  src={logout}
                  alt=""
                  aria-hidden="true"
                  className="w-5 transition-transform duration-200
                    group-hover:scale-110"
                />

                <span>Çıkış Yap</span>
              </button>
            </div>
          ) : (
            /* Login / Register */
            <button
              type="button"
              onClick={() => handleNavigate("/login")}
              className="group flex w-full items-center gap-3
                rounded-lg px-4 py-3 text-left font-bold
                transition-all duration-200
                hover:bg-black/[0.06] hover:pl-5"
            >
              <img
                src={avatar}
                alt=""
                aria-hidden="true"
                className="w-5 transition-transform duration-200
                  group-hover:scale-110"
              />

              <span>Giriş Yap / Kayıt Ol</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenuMobile;