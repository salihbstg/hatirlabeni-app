import React, { useEffect, useRef, useState } from "react";

import { categories } from "../../data/Categories";

const CategoryMenuDesktop = () => {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleEraClick = (era: string) => {
    setSelectedEra((current) => (current === era ? null : era));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setSelectedEra(null);
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
      className="flex gap-8 lg:gap-16 navbar-font font-bold"
    >
      {Object.keys(categories).map((era) => {
        return (
          <div key={era} className="relative">

            {/* Era Button */}
            <div className="flex items-center select-none">
              <button
                onClick={() => handleEraClick(era)}
                className="group relative py-2"
              >
                <span
                  className={`relative inline-block pb-1 transition-all duration-200 text-[#8B4E2F] ${
                    selectedEra === era
                      ? "text-black"
                      : "text-black/90 group-hover:text-black"
                  }`}
                >
                  {era}

                  {/* Animated underline */}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] w-full origin-center rounded-full bg-[#A45F2A] transition-transform duration-300 ease-out ${
                      selectedEra === era
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-75"
                    }`}
                  />
                </span>
              </button>
            </div>

            {/* Dropdown */}
            <div
              className={`absolute right-0 top-full z-10 mt-3 w-80 overflow-hidden rounded-xl transition-all duration-300 ease-out ${
                selectedEra === era
                  ? "pointer-events-auto visible translate-y-0 opacity-100"
                  : "pointer-events-none invisible -translate-y-2 opacity-0"
              }`}
            >
              {/* Dropdown Content */}
              <div className="flex flex-col gap-1 rounded-xl border border-black/5 bg-[#F8F9FA]/95 p-3 shadow-xl backdrop-blur-sm">
                {categories[era].map((category) => {
                  return (
                    <button
                      key={category}
                      className="group flex items-center rounded-lg px-4 py-3 text-left font-medium transition-all duration-200 hover:bg-black/[0.06] hover:pl-5"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        {category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default CategoryMenuDesktop;