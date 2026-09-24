import { useEffect, useRef, useState } from "react";

import { categories } from "../../../data/Categories";
import DesktopEraDropdown from "./DesktopEraDropdown";

const CategoryMenuDesktop = () => {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  // Seçilen dönemin dropdown menüsünü açar veya kapatır.
  const handleEraClick = (era: string) => {
    setSelectedEra((current) => (current === era ? null : era));
  };

  // Açık olan dropdown menüsünü kapatır.
  const closeMenu = () => {
    setSelectedEra(null);
  };

  // Menü dışına tıklanınca veya Escape tuşuna basılınca menüyü kapat.
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

    // Component kaldırıldığında event listener'ları temizle.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="flex w-full items-center justify-center"
    >
      {/* Ana navigasyon menüsü */}
      <nav
        aria-label="Ana kategori menüsü"
        className="flex items-center justify-center gap-5 lg:gap-10 xl:gap-14"
      >
        {Object.entries(categories).map(([era, eraCategories], index) => {
          const isSelected = selectedEra === era;

          return (
            <div key={era} className="relative">
              {/* Dönem seçme butonu */}
              <button
                type="button"
                onClick={() => handleEraClick(era)}
                aria-expanded={isSelected}
                aria-haspopup="true"
                aria-controls={`era-dropdown-${index}`}
                className={`group relative inline-flex items-center gap-2.5
                  whitespace-nowrap py-4 text-[13px] font-semibold
                  tracking-[0.04em] transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#a45f2a]/40 focus-visible:ring-offset-4
                  ${
                    isSelected
                      ? "text-[#a45f2a]"
                      : "text-[#596052] hover:text-[#a45f2a]"
                  }`}
              >
                <span>{era}</span>

                {/* Dönem seçimine göre dönen ok ikonu */}
                <svg
                  className={`h-3.5 w-3.5 transition-all duration-300 ${
                    isSelected
                      ? "rotate-180 text-[#a45f2a]"
                      : "text-[#aaa18f] group-hover:text-[#a45f2a]"
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5.5 7.5L10 12L14.5 7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Seçili veya hover durumunda görünen alt çizgi */}
                <span
                  className={`absolute bottom-1 left-0 h-[2px]
                    rounded-full bg-[#a45f2a] transition-all duration-300
                    ${
                      isSelected
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                />
              </button>

              {/* İlgili dönemin dropdown component'i */}
              <div
                id={`era-dropdown-${index}`}
                className={`absolute left-1/2 top-full z-50
                  w-[340px] -translate-x-1/2 pt-3
                  transition-all duration-250 ease-out ${
                    isSelected
                      ? "visible translate-y-0 opacity-100"
                      : "pointer-events-none invisible -translate-y-2 opacity-0"
                  }`}
              >
                <DesktopEraDropdown
                  era={era}
                  categories={eraCategories}
                  isOpen={isSelected}
                  onCategoryClick={closeMenu}
                  onClose={closeMenu}
                />
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default CategoryMenuDesktop;