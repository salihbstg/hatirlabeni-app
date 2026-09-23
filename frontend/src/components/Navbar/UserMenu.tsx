import { useContext, useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import avatar from "../../assets/Navbar/Avatar.png";
import email from "../../assets/Navbar/email.png";
import logout from "../../assets/Navbar/logout.png";
import OrdersMe from "../../assets/Navbar/OrdersMe.png";
import setting from "../../assets/Navbar/setting.png";
import cart from "../../assets/Navbar/shopping-cart.png";
import navbarProfileIcon from "../../assets/Navbar/NavbarProfileIcon.png";

import { AuthContext } from "../../context/AuthContext";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement>(null);

  if (!authContext) {
    throw new Error("UserMenu, AuthProvider içerisinde kullanılmalıdır.");
  }

  const { isAuthenticated, handleLogout } = authContext;

  const closeMenu = () => setIsOpen(false);

  const logOut = async () => {
    try {
      await handleLogout();
    } finally {
      closeMenu();
      navigate("/login", { replace: true });
    }
  };

  // Menü dışına tıklanınca veya Escape tuşuna basılınca kapat.
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

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    {
      label: "Hesabım",
      path: "/profile",
      icon: navbarProfileIcon,
    },
    {
      label: "Tüm Siparişlerim",
      path: "/orders/me",
      icon: OrdersMe,
    },
    {
      label: "Ayarlar",
      path: "/settings",
      icon: setting,
    },
    {
      label: "Mesajlarım",
      path: "/messages/me",
      icon: email,
    },
  ];

  return (
    <div ref={menuRef} className="relative">
      {/* Sepet ve Profil */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Sepet */}
        <button
          type="button"
          onClick={() => navigate("/cart")}
          aria-label="Sepetim"
          className="group relative flex h-10 w-10 items-center justify-center rounded-full text-[#3f5147] transition-colors hover:bg-[#eae7dc]"
        >
          <img
            src={cart}
            alt=""
            className="h-5 w-5 object-contain transition-transform duration-200 group-hover:scale-110"
          />

          {/* Sepet sayacı */}
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#a45f2a] px-1 text-[10px] font-bold text-white ring-2 ring-[#faf8f2]">
            0
          </span>
        </button>

        {/* Profil Menüsü Butonu */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Kullanıcı menüsünü aç"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className={`group flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 transition-all duration-200 ${
            isOpen
              ? "border-[#a45f2a] ring-2 ring-[#a45f2a]/10"
              : "border-[#e4dfd3] hover:border-[#a45f2a]"
          }`}
        >
          <img
            src={avatar}
            alt=""
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </button>
      </div>

      {/* Dropdown Menü */}
      <div
        role="menu"
        aria-hidden={!isOpen}
        className={`absolute right-0 top-full z-50 mt-2 w-[min(300px,calc(100vw-2rem))] origin-top-right rounded-xl border border-[#e8e2d5] bg-[#fffdf8] p-1.5 shadow-[0_12px_35px_rgba(45,38,25,0.12)] transition-all duration-200 ${
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        {/* Menü Başlığı */}
        <div className="border-b border-[#eee8dc] px-3 py-2">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#9b8e78]">
            Hesabım
          </p>

          <p className="mt-0.5 text-[13px] font-semibold text-[#3f5147]">
            HatırlaBeni
          </p>
        </div>

        {/* Menü Linkleri */}
        <nav aria-label="Kullanıcı menüsü" className="py-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              role="menuitem"
              onClick={closeMenu}
              className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-[#4b5149] transition-colors duration-150 hover:bg-[#f2eee4] hover:text-[#a45f2a]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f3f0e8] transition-colors group-hover:bg-white">
                <img
                  src={item.icon}
                  alt=""
                  className="h-4 w-4 object-contain"
                />
              </span>

              <span className="flex-1">{item.label}</span>

              <span className="text-base text-[#c5b9a5] transition-transform group-hover:translate-x-0.5">
                ›
              </span>
            </Link>
          ))}
        </nav>

        {/* Çıkış */}
        <div className="border-t border-[#eee8dc] pt-1">
          <button
            type="button"
            role="menuitem"
            onClick={logOut}
            className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-semibold text-[#a34c40] transition-colors duration-150 hover:bg-[#fbeeea]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f8e9e5]">
              <img
                src={logout}
                alt=""
                className="h-4 w-4 object-contain"
              />
            </span>

            <span className="flex-1">Çıkış Yap</span>

            <span className="text-base opacity-50">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;