import React, { useState, useContext, useEffect, useRef } from "react";

import "./UserMenu.css";

import { deleteTokens } from "./../../utils/Token";

import avatar from "./../../assets/Navbar/Avatar.png";
import email from "./../../assets/Navbar/email.png";
import logout from "./../../assets/Navbar/logout.png";
import OrdersMe from "./../../assets/Navbar/OrdersMe.png";
import setting from "./../../assets/Navbar/setting.png";
import cart from "./../../assets/Navbar/shopping-cart.png";
import navbarProfileIcon from "./../../assets/Navbar/NavbarProfileIcon.png"

import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext<any>(AuthContext);

  // Logout işlemi
  const logOut = () => {
    deleteTokens();

    setTimeout(() => {
      setIsAuthenticated(false);
    }, 300);
  };

  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState<Number>(0);

  // UserMenu DOM referansı
  const menuRef = useRef<HTMLDivElement>(null);

  // Menü dışına tıklama kontrolü
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative libre-baskerville"
    >
      {/* Sepet ve profil alanı */}
      <div className="flex items-center gap-2">

        {/* Sepet butonu */}
        <button
          onClick={() => navigate("/cart")}
          className="group relative hidden md:flex select-none"
        >
          {/* Sepet ikonu */}
          <img
            className="w-14 object-contain transition-all duration-300 ease-out group-hover:scale-105"
            src={cart}
            alt="Sepet"
          />

          {/* Sepet sayacı */}
          <span
            className="absolute -right-1 -top-1 flex h-5 min-w-5
              items-center justify-center rounded-full
              bg-[#A45F2A] px-1.5
              text-[10px] font-bold leading-none text-[#FFF8EF]
              shadow-md ring-2 ring-[#F8F4EC]
              transition-all duration-300 ease-out
              group-hover:scale-110"
          >
            {cartCount}
          </span>
        </button>

        {/* Profil butonu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group hidden select-none md:flex"
        >
          <img
            className={`w-14 object-cover transition-all duration-300 ${
              isOpen
                ? "scale-110"
                : "group-hover:scale-110"
            }`}
            src={avatar}
            alt="Profil"
          />
        </button>

      </div>

      {/* Kullanıcı dropdown menüsü */}
      <div
        className={`absolute right-0 top-full z-20 mt-3 w-[360px]
          origin-top-right overflow-hidden rounded-xl
          border border-black/5 bg-[#F8F9FA]/95
          shadow-xl backdrop-blur-sm
          transition-all duration-300 ease-out ${
            isOpen
              ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
              : "pointer-events-none invisible -translate-y-2 scale-95 opacity-0"
          }`}
      >
        {/* Dropdown seçenekleri */}
        <div className="flex flex-col gap-1 p-3">

          {/* Hesabım */}
          <a
            href="/profile"
            className="group flex items-center gap-3 rounded-lg px-4 py-3
              transition-all duration-200 hover:bg-black/[0.06] hover:pl-5"
          >
            <img
              className="w-5 transition-transform duration-200 group-hover:scale-110"
              src={navbarProfileIcon}
              alt=""
            />

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              Hesabım
            </span>
          </a>

          {/* Tüm Siparişlerim */}
          <a
            href="/orders/me"
            className="group flex items-center gap-3 rounded-lg px-4 py-3
              transition-all duration-200 hover:bg-black/[0.06] hover:pl-5"
          >
            <img
              className="w-5 transition-transform duration-200 group-hover:scale-110"
              src={OrdersMe}
              alt=""
            />

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              Tüm Siparişlerim
            </span>
          </a>

          {/* Ayarlar */}
          <a
            href="/settings"
            className="group flex items-center gap-3 rounded-lg px-4 py-3
              transition-all duration-200 hover:bg-black/[0.06] hover:pl-5"
          >
            <img
              className="w-5 transition-transform duration-200 group-hover:scale-110"
              src={setting}
              alt=""
            />

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              Ayarlar
            </span>
          </a>

          {/* Mesajlarım */}
          <a
            href="/messages/me"
            className="group flex items-center gap-3 rounded-lg px-4 py-3
              transition-all duration-200 hover:bg-black/[0.06] hover:pl-5"
          >
            <img
              className="w-5 transition-transform duration-200 group-hover:scale-110"
              src={email}
              alt=""
            />

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              Mesajlarım
            </span>
          </a>

          {/* Çıkış Yap */}
          <button
            onClick={logOut}
            className="group flex w-full items-center gap-3 rounded-lg
              px-4 py-3 text-left
              transition-all duration-200 hover:bg-black/[0.06] hover:pl-5"
          >
            <img
              className="w-5 transition-transform duration-200 group-hover:scale-110"
              src={logout}
              alt=""
            />

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              Çıkış Yap
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default UserMenu;