import React, { useState,useContext } from "react";
import "./UserMenu.css";
import {deleteTokens} from "./../../utils/Token";
import avatar from "./../../assets/Profile-Avatar.jpg";
import { AuthContext } from "../../context/AuthContext";
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {isAuthenticated,setIsAuthenticated}=useContext(AuthContext);
  const logOut=()=>{
    deleteTokens();
    setTimeout(()=>{
        setIsAuthenticated(false);
    },300)
    
  }
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden hidden md:flex"
      >
        <img
          className={"w-full h-full object-cover"}
          src={avatar}
          alt="Profil"
        />
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg
          transition-all duration-200 origin-top-right
          ${
            isOpen
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }`}
      >
        <div className="p-2">
          <a
            href="/profile"
            className="block px-3 py-2 rounded-md hover:bg-stone-100"
          >
            Profil
          </a>

          <a
            href="/settings"
            className="block px-3 py-2 rounded-md hover:bg-stone-100"
          >
            Ayarlar
          </a>

          <button
          onClick={logOut}
          className="w-full text-left px-3 py-2 rounded-md hover:bg-stone-100">
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
