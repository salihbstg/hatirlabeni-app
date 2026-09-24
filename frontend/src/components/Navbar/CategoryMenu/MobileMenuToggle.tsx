import navbarMenuIcon from "../../../assets/Navbar/MenuIcon.png";
import menuCloseIcon from "../../../assets/Navbar/MenuCloseIcon.png";

interface MobileMenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileMenuToggle = ({
  isOpen,
  onClick,
}: MobileMenuToggleProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation-menu"
      className="group relative h-15 w-15 overflow-hidden select-none"
    >
      {/* Menü kapalıyken görünen hamburger ikonu */}
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

      {/* Menü açıldığında görünen kapatma ikonu */}
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
  );
};

export default MobileMenuToggle;