import React, { useContext, useEffect, useRef, useState } from "react";

import navbarMenuIcon from "./../../assets/Navbar/MenuIcon.png";
import menuCloseIcon from "./../../assets/Navbar/MenuCloseIcon.png";

import avatar from "./../../assets/Navbar/Avatar.png";
import email from "./../../assets/Navbar/email.png";
import logout from "./../../assets/Navbar/logout.png";
import OrdersMe from "./../../assets/Navbar/OrdersMe.png";
import setting from "./../../assets/Navbar/setting.png";
import mobileMenuCart from "./../../assets/Navbar/MobileMenuCart.png";
import navbarProfileIcon from "./../../assets/Navbar/NavbarProfileIcon.png";

import { categories } from "../../data/categories";

import { AuthContext } from "../../context/AuthContext";

import { deleteTokens } from "../../utils/Token";

import { useNavigate } from "react-router-dom";

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

  // Menü dışına tıklama
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedEra(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Ana menüyü aç / kapat
  const handleMenuClick = () => {
    setIsOpen((current) => !current);
  };

  // Era menüsünü aç / kapat
  const handleEraClick = (era: string) => {
    setSelectedEra((current) => (current === era ? null : era));
  };

  // Logout
  const logOut = () => {
    deleteTokens();

    setTimeout(() => {
      setIsAuthenticated(false);
      setIsOpen(false);
    }, 300);
  };

  // Menüden sayfaya git
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setSelectedEra(null);
  };

  return (
    <div ref={menuRef} className="relative md:hidden">
      {/* Mobile Navbar Icon */}
      <button
        onClick={handleMenuClick}
        className="group relative h-15 w-15 overflow-hidden select-none"
      >
        {/* Menu Icon */}
        <img
          className={`absolute inset-0 h-full w-full object-contain
            transition-all duration-300 ease-out ${
              isOpen
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100 group-hover:scale-105"
            }`}
          src={navbarMenuIcon}
          alt="navbar_icon"
        />

        {/* Close Icon */}
        <img
          className={`absolute inset-0 h-full w-full object-contain
            transition-all duration-300 ease-out ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          src={menuCloseIcon}
          alt="menu_close_icon"
        />
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute right-0 top-full z-50 mt-3 w-[320px]
          origin-top-right overflow-hidden rounded-2xl
          border border-black/5 bg-[#F8F9FA]/95
          shadow-xl backdrop-blur-sm
          transition-all duration-300 ease-out ${
            isOpen
              ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
              : "pointer-events-none invisible -translate-y-3 scale-95 opacity-0"
          }`}
      >
        <div className="flex flex-col p-3">
          {/* Categories */}
          <div className="mb-2 border-b border-black/10 pb-2">
            {Object.keys(categories).map((era) => {
              return (
                <div key={era}>
                  {/* Era */}
                  <button
                    onClick={() => handleEraClick(era)}
                    className="group flex w-full items-center justify-between
                      rounded-lg px-4 py-3 text-left font-bold
                      transition-all duration-200 hover:bg-black/[0.06]"
                  >
                    <span>{era}</span>

                    <span
                      className={`text-xs transition-transform duration-300 ${
                        selectedEra === era ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {/* Era Categories */}
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-out ${
                      selectedEra === era
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0">
                      <div className="ml-3 flex flex-col border-l border-black/10 pl-3 pb-1">
                        {categories[era].map((category) => {
                          return (
                            <button
                              key={category}
                              className="rounded-lg px-3 py-2 text-left text-sm
                                font-normal transition-all duration-200
                                hover:bg-black/[0.06] hover:pl-5"
                            >
                              {category}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {isAuthenticated ? (
            <>
              {/* User Menu */}
              <div className="flex flex-col gap-1">
                {/* Cart */}
                <button
                  onClick={() => handleNavigate("/cart")}
                  className="group flex w-full items-center gap-3 rounded-lg
                    px-4 py-3 text-left transition-all duration-200
                    hover:bg-black/[0.06] hover:pl-5"
                >
                  <img
                    className="w-5 transition-transform duration-200 group-hover:scale-110"
                    src={mobileMenuCart}
                    alt=""
                  />

                  <span>Sepetim</span>
                </button>

                {/* Profile */}
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="group flex w-full items-center gap-3 rounded-lg
                    px-4 py-3 text-left transition-all duration-200
                    hover:bg-black/[0.06] hover:pl-5"
                >
                  <img
                    className="w-5 transition-transform duration-200 group-hover:scale-110"
                    src={navbarProfileIcon}
                    alt=""
                  />

                  <span>Hesabım</span>
                </button>

                {/* Orders */}
                <button
                  onClick={() => handleNavigate("/orders/me")}
                  className="group flex w-full items-center gap-3 rounded-lg
                    px-4 py-3 text-left transition-all duration-200
                    hover:bg-black/[0.06] hover:pl-5"
                >
                  <img
                    className="w-5 transition-transform duration-200 group-hover:scale-110"
                    src={OrdersMe}
                    alt=""
                  />

                  <span>Tüm Siparişlerim</span>
                </button>

                {/* Settings */}
                <button
                  onClick={() => handleNavigate("/settings")}
                  className="group flex w-full items-center gap-3 rounded-lg
                    px-4 py-3 text-left transition-all duration-200
                    hover:bg-black/[0.06] hover:pl-5"
                >
                  <img
                    className="w-5 transition-transform duration-200 group-hover:scale-110"
                    src={setting}
                    alt=""
                  />

                  <span>Ayarlar</span>
                </button>

                {/* Messages */}
                <button
                  onClick={() => handleNavigate("/messages/me")}
                  className="group flex w-full items-center gap-3 rounded-lg
                    px-4 py-3 text-left transition-all duration-200
                    hover:bg-black/[0.06] hover:pl-5"
                >
                  <img
                    className="w-5 transition-transform duration-200 group-hover:scale-110"
                    src={email}
                    alt=""
                  />

                  <span>Mesajlarım</span>
                </button>

                {/* Logout */}
                <button
                  onClick={logOut}
                  className="group mt-1 flex w-full items-center gap-3
                    rounded-lg border-t border-black/10 px-4 py-3 pt-4
                    text-left transition-all duration-200
                    hover:bg-black/[0.06] hover:pl-5"
                >
                  <img
                    className="w-5 transition-transform duration-200 group-hover:scale-110"
                    src={logout}
                    alt=""
                  />

                  <span>Çıkış Yap</span>
                </button>
              </div>
            </>
          ) : (
            /* Login / Register */
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleNavigate("/login")}
                className="group flex w-full items-center gap-3 rounded-lg
                  px-4 py-3 text-left font-bold
                  transition-all duration-200 hover:bg-black/[0.06] hover:pl-5"
              >
                <img
                  className="w-5 transition-transform duration-200 group-hover:scale-110"
                  src={avatar}
                  alt=""
                />

                <span>Giriş Yap / Kayıt Ol</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenuMobile;