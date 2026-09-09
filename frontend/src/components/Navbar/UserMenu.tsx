import React, { useState, useContext } from "react";
import "./UserMenu.css";
import { deleteTokens } from "./../../utils/Token";
import avatar from "./../../assets/Navbar/Avatar.png";
import email from "./../../assets/Navbar/email.png";
import logout from "./../../assets/Navbar/logout.png";
import OrdersMe from "./../../assets/Navbar/OrdersMe.png";
import setting from "./../../assets/Navbar/setting.png";
import { AuthContext } from "../../context/AuthContext";
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const logOut = () => {
    deleteTokens();
    setTimeout(() => {
      setIsAuthenticated(false);
    }, 300);
  };
  return (
    <div className="relative text-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-7 rounded-full overflow-hidden hidden md:flex hover:bg-[#ddd]"
      >
        <img
          className={"w-full h-full object-cover"}
          src={avatar}
          alt="Profil"
        />
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg
          transition-all duration-200 origin-top-right min-w-[360px] pt-7
          ${
            isOpen
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }`}
      >
        <div className="p-2 ">
          <a
            href="/profile"
            className="block px-3 py-2 rounded-md hover:bg-[#ccc] flex gap-2 items-center"
          >
           <img className="w-6" src={avatar} alt="" /> <span>Hesabım</span>
          </a>
          <a
            href="/orders/me"
            className="block px-3 py-2 rounded-md hover:bg-[#ccc] flex gap-2 items-center"
          >
             <img className="w-6" src={OrdersMe} alt="" /> <span>Tüm Siparişlerim</span>
          </a>
          <a
            href="/settings"
            className="block px-3 py-2 rounded-md hover:bg-[#ccc] flex gap-2 items-center"
          >
            <img className="w-6" src={setting} alt="" /> <span>Ayarlar</span>
          </a>

          <a
            href="/messages/me"
            className="block px-3 py-2 rounded-md hover:bg-[#ccc] flex gap-2 items-center"
          >
            <img className="w-6" src={email} alt="" /> <span>Mesajlarım</span>
          </a>

          <button
            onClick={logOut}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-[#ccc] flex gap-2 items-center"
          >
            <img className="w-6" src={logout} alt="" /><span>Çıkış Yap</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
