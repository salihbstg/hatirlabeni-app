import { useEffect, useRef, useState } from "react";

import { categories } from "../../data/Categories";

const CategoryMenuDesktop = () => {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleEraClick = (era: string) => {
    setSelectedEra((current) => (current === era ? null : era));
  };

  const closeMenu = () => {
    setSelectedEra(null);
  };

  // Menü dışına tıklanınca kapat
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

  return (
    <div
      ref={menuRef}
      className="flex w-full items-center justify-center"
    >
      {/* Main Navigation */}
      <nav
        aria-label="Ana kategori menüsü"
        className="flex items-center justify-center gap-5 lg:gap-10 xl:gap-14"
      >
        {Object.entries(categories).map(([era, eraCategories], index) => {
          const isSelected = selectedEra === era;

          return (
            <div key={era} className="relative">
              {/* Era Button */}
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

                {/* Chevron */}
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

                {/* Underline */}
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

              {/* Dropdown */}
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
                <div
                  className="overflow-hidden rounded-[22px] border
                    border-[#e9e1d3] bg-[#fffdf8]
                    shadow-[0_24px_65px_rgba(57,45,29,0.14)]"
                >
                  {/* Dropdown Header */}
                  <div
                    className="relative overflow-hidden border-b
                      border-[#eee7da] bg-[#f7f2e8] px-7 py-6"
                  >
                    {/* Decorative Background */}
                    <div
                      aria-hidden="true"
                      className="absolute -right-8 -top-10 h-36 w-36
                        rounded-full bg-[#e8d6b9]/35"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute -right-1 top-12 h-16 w-16
                        rounded-full border border-[#d9c4a5]/30"
                    />

                    <div className="relative">
                      <div className="mb-3 flex items-center gap-2.5">
                        <span className="h-px w-6 bg-[#b17a4b]" />

                        <span
                          className="text-[10px] font-bold uppercase
                            tracking-[0.2em] text-[#a45f2a]"
                        >
                          Hatıralara Yolculuk
                        </span>
                      </div>

                      <h3
                        className="text-xl font-semibold tracking-tight
                          text-[#3f493e]"
                      >
                        {era}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-[#928878]">
                        Bu dönemin özel koleksiyonlarını keşfet.
                      </p>
                    </div>
                  </div>

                  {/* Category List */}
                  <div className="px-4 py-5">
                    {/* List Header */}
                    <div
                      className="mb-3 flex items-center
                        justify-between px-3"
                    >
                      <span
                        className="text-[10px] font-bold uppercase
                          tracking-[0.16em] text-[#aaa08e]"
                      >
                        Kategoriler
                      </span>

                      <span
                        className="rounded-full bg-[#f3eee4]
                          px-2.5 py-1 text-[10px] font-semibold
                          text-[#93856f]"
                      >
                        {eraCategories.length} kategori
                      </span>
                    </div>

                    {/* Category Items */}
                    <div className="flex flex-col gap-1.5">
                      {eraCategories.map((category, categoryIndex) => (
                        <button
                          key={category}
                          type="button"
                          onClick={closeMenu}
                          className="group flex w-full items-center
                            justify-between rounded-xl px-3.5 py-3.5
                            text-left text-[13px] font-medium
                            text-[#52594e] transition-all duration-200
                            hover:bg-[#f5f0e6] hover:text-[#a45f2a]
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[#a45f2a]/30"
                        >
                          <span className="flex items-center gap-3.5">
                            {/* Category Number */}
                            <span
                              className="flex h-7 w-7 shrink-0
                                items-center justify-center rounded-lg
                                bg-[#f5f0e6] text-[10px] font-semibold
                                text-[#a18d70] transition-colors duration-200
                                group-hover:bg-[#eadcc8]
                                group-hover:text-[#a45f2a]"
                            >
                              {String(categoryIndex + 1).padStart(2, "0")}
                            </span>

                            <span>{category}</span>
                          </span>

                          {/* Arrow */}
                          <svg
                            className="h-4 w-4 shrink-0 -translate-x-1
                              text-[#c7b9a3] opacity-0
                              transition-all duration-200
                              group-hover:translate-x-0
                              group-hover:text-[#a45f2a]
                              group-hover:opacity-100"
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M4 10H16M10 4L16 10L10 16"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dropdown Footer */}
                  <div
                    className="border-t border-[#eee7da]
                      bg-[#fcfaf5] px-6 py-4"
                  >
                    <p
                      className="text-center text-[10px]
                        tracking-wide text-[#a49a88]"
                    >
                      Geçmişten bugüne, her anı sakla.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default CategoryMenuDesktop;