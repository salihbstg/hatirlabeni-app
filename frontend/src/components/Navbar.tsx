import React, { useState } from "react";
import navbarMenu from "./../assets/NavbarMenuIcon.jpg";
import logo from "./../assets/Logo.png";
import {categories} from "./../data/categories";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);



  // Ana kategoriye tıklanınca dropdown aç/kapat
  const handleCategoryClick = (category: string) => {
    setActiveCategory(
      activeCategory === category ? null : category
    );
  };

  // Alt kategori seçildiğinde
  const handleSubcategoryClick = (
    category: string,
    subcategory: string
  ) => {
    console.log("Seçilen dönem:", category);
    console.log("Seçilen kategori:", subcategory);

    setActiveCategory(null);
    setIsOpen(false);
  };

  return (
    <header className="bg-[#F5F1E8] text-[#354545] libre-baskerville border-b border-[#ddd6c8]">
      
      {/* NAVBAR */}
      <div className="navbar-wrapper w-full max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="h-16 flex items-center justify-between">

          {/* LOGO */}
          <a
            href="/"
            className="flex items-center h-16 shrink-0"
          >
            <img
              className="h-14 w-auto object-contain"
              src={logo}
              alt="Hatırla Beni"
            />
          </a>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center gap-10 lg:gap-10 font-bold text-sm">

              {Object.keys(categories).map((category) => (
                <li
                  key={category}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                    className="
                      inline-flex
                      items-center
                      gap-1
                      py-5
                      transition-colors
                      duration-200
                      hover:text-stone-500
                    "
                  >
                    {category}

                    <span
                      className={`
                        text-xs
                        transition-transform
                        duration-200
                        ${
                          activeCategory === category
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    >
                      ▼
                    </span>
                  </button>

                  {/* DESKTOP DROPDOWN */}
                  {activeCategory === category && (
                    <div
                      className="
                        absolute
                        top-full
                        left-1/2
                        -translate-x-1/2
                        z-50
                        min-w-[180px]
                        bg-[#F5F1E8]
                        border
                        border-[#d8d0c2]
                        rounded-lg
                        shadow-lg
                        py-2
                      "
                    >
                      {categories[
                        category as keyof typeof categories
                      ].map((subcategory) => (
                        <button
                          key={subcategory}
                          type="button"
                          onClick={() =>
                            handleSubcategoryClick(
                              category,
                              subcategory
                            )
                          }
                          className="
                            block
                            w-full
                            text-left
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            transition-colors
                            duration-200
                            hover:bg-[#e9e3d8]
                            hover:text-stone-600
                          "
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              ))}

            </ul>
          </nav>

          {/* LOGIN - DESKTOP */}
          <div className="hidden md:flex shrink-0">
            <a
              className="
                font-bold
                text-sm
                whitespace-nowrap
                transition-colors
                duration-200
                hover:text-stone-500
              "
              href="/login"
            >
              Giriş Yap / Üye Ol
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label="Menüyü aç"
            aria-expanded={isOpen}
            onClick={() => {
              setIsOpen(!isOpen);
              setActiveCategory(null);
            }}
            className="
              md:hidden
              flex
              items-center
              justify-center
              w-11
              h-11
              rounded-lg
              transition-colors
              duration-200
              hover:bg-[#e9e3d8]
            "
          >
            <img
              className="w-8 h-8 object-contain"
              src={navbarMenu}
              alt=""
            />
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`
            md:hidden
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            ${
              isOpen
                ? "max-h-[600px] opacity-100 pb-5"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div className="border-t border-[#ddd6c8] pt-4">

            <h3 className="font-bold text-sm mb-2">
              Kategoriler
            </h3>

            <ul className="flex flex-col gap-1">

              {Object.keys(categories).map((category) => (
                <li key={category}>

                  {/* CATEGORY BUTTON */}
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                    className="
                      w-full
                      flex
                      items-center
                      justify-between
                      py-2
                      font-bold
                      text-sm
                      transition-colors
                      duration-200
                      hover:text-stone-500
                    "
                  >
                    <span>{category}</span>

                    <span
                      className={`
                        text-xs
                        transition-transform
                        duration-200
                        ${
                          activeCategory === category
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    >
                      ▼
                    </span>
                  </button>

                  {/* MOBILE SUBCATEGORIES */}
                  <div
                    className={`
                      overflow-hidden
                      transition-all
                      duration-300
                      ease-in-out
                      ${
                        activeCategory === category
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }
                    `}
                  >
                    <div className="ml-4 mb-2 border-l border-[#d8d0c2]">

                      {categories[
                        category as keyof typeof categories
                      ].map((subcategory) => (
                        <button
                          key={subcategory}
                          type="button"
                          onClick={() =>
                            handleSubcategoryClick(
                              category,
                              subcategory
                            )
                          }
                          className="
                            block
                            w-full
                            text-left
                            px-4
                            py-2
                            text-sm
                            text-stone-600
                            transition-colors
                            duration-200
                            hover:text-stone-900
                          "
                        >
                          {subcategory}
                        </button>
                      ))}

                    </div>
                  </div>

                </li>
              ))}

            </ul>

            {/* LOGIN */}
            <a
              className="
                block
                mt-4
                pt-4
                border-t
                border-[#ddd6c8]
                font-bold
                text-sm
                transition-colors
                duration-200
                hover:text-stone-500
              "
              href="/login"
            >
              Giriş Yap / Üye Ol
            </a>

          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;