import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { categories } from "../../../data/Categories";
import { AuthContext } from "../../../context/AuthContext";
import { deleteTokens } from "../../../utils/Token";

// Menü alt bileşenleri
import MobileMenuToggle from "./MobileMenuToggle";
import MobileCategorySection from "./MobileCategorySection";
import MobileUserActions from "./MobileUserActions";

const CategoryMenuMobile = () => {
  // Menü ve kategori açılma durumlarını yönetir.
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  // Menü dışına tıklamayı algılamak için kullanılır.
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("CategoryMenuMobile must be used within AuthProvider");
  }

  const { isAuthenticated, setIsAuthenticated } = authContext;

  /**
   * Menüyü kapatır ve açık olan kategori dönemini sıfırlar.
   *
   * useCallback sayesinde fonksiyon referansı sabit kalır.
   * Böylece useEffect gereksiz yere yeniden çalışmaz.
   */
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setSelectedEra(null);
  }, []);

  /**
   * Menü dışına tıklanınca veya Escape tuşuna basılınca
   * mobil menüyü kapatır.
   */
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

    // Component kaldırıldığında event listener'ları temizler.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeMenu]);

  /**
   * Mobil menüyü açar veya kapatır.
   */
  const handleMenuToggle = () => {
    setIsOpen((current) => !current);
  };

  /**
   * Seçilen dönemin kategorilerini açar veya kapatır.
   * Aynı döneme tekrar tıklanırsa kategori listesi kapanır.
   */
  const handleEraToggle = (era: string) => {
    setSelectedEra((current) => (current === era ? null : era));
  };

  /**
   * İlgili sayfaya yönlendirir ve mobil menüyü kapatır.
   */
  const handleNavigate = (path: string) => {
    navigate(path);
    closeMenu();
  };

  /**
   * Kullanıcının oturumunu kapatır.
   * Token'ları temizler, auth state'ini günceller
   * ve kullanıcıyı giriş sayfasına yönlendirir.
   */
  const handleLogout = () => {
    deleteTokens();
    setIsAuthenticated(false);

    closeMenu();
    navigate("/login");
  };

  /**
   * Kategori seçildiğinde menüyü kapatır.
   *
   * Kategori yönlendirmeleri henüz tanımlanmadığı için
   * burada mevcut davranış korunmuştur.
   */
  const handleCategoryClick = () => {
    closeMenu();
  };

  return (
    <div ref={menuRef} className="relative md:hidden">
      {/* Mobil menüyü açıp kapatan buton */}
      <MobileMenuToggle
        isOpen={isOpen}
        onClick={handleMenuToggle}
      />

      {/* Mobil navigasyon menüsü */}
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
          {/* Kategori dönemleri ve dönemlere ait kategoriler */}
          <MobileCategorySection
            categories={categories}
            selectedEra={selectedEra}
            onEraToggle={handleEraToggle}
            onCategoryClick={handleCategoryClick}
          />

          {/* Oturum durumuna göre kullanıcı işlemleri */}
          <MobileUserActions
            isAuthenticated={isAuthenticated}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryMenuMobile;