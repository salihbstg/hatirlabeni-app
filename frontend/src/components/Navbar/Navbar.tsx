import React, { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import UserMenu from "./UserMenu";
import CategoryMenuDesktop from "./CategoryMenuDesktop";
import CategoryMenuMobile from "./CategoryMenuMobile";

import logo from "./../../assets/Logo.png";
import cart from "./../../assets/Navbar/shopping-cart.png";
import avatar from "./../../assets/Navbar/Avatar.png";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // Kullanıcının giriş yapıp yapmadığını AuthContext üzerinden alıyoruz.
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  // Sepetteki ürün sayısını tutuyoruz.
  const [cartCount, setCartCount] = useState<Number>(0);

  // React Router üzerinden sayfa yönlendirmesi yapmak için kullanılır.
  const navigate = useNavigate();

  return (
    // Navbar'ın ana container'ı
    <div className="flex items-center justify-between px-10 md:px-5 lg:px-10 max-h-[88px] bg-[#f4fabf]">
      {/* Logo */}
      <a href="/">
        <img className="w-28" src={logo} alt="" />
      </a>

      {/* Desktop kategori menüsü */}
      <div className="hidden md:flex">
        <CategoryMenuDesktop></CategoryMenuDesktop>
      </div>
      {/*Mobil kategori menüsü */}
      <div className="flex md:hidden">
        <CategoryMenuMobile></CategoryMenuMobile>
      </div>
      {isAuthenticated ? (
        // Kullanıcı giriş yapmışsa gösterilecek alan
        <div className="gap-10 hidden md:flex">
          <UserMenu></UserMenu>
        </div>
      ) : (
        // Kullanıcı giriş yapmamışsa gösterilecek alan
        <div className="hidden md:flex items-center h-[88px]">
          {/* Giriş / Kayıt bağlantısı */}
          <a
            className="navbar-font font-bold text-md hover:opacity-70 transition-all duration-100"
            href="/login"
          >
            Giriş Yap / Kayıt Ol
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
