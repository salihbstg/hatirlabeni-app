import React, { useState } from "react";
import navbarMenu from "./../assets/NavbarMenuIcon.jpg";
import "./Navbar.css";

import logo from "./../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-[#F5F1E8] text-[#354545] px-5">
      <div
        className="
          navbar-wrapper
          flex
          flex-row
          items-center
          h-[55px]
          justify-around
          libre-baskerville
        "
      >
        <div>
          <a className="flex justify-center h-[55px]" href="/home">
            <img className="" src={logo} alt="" />
          </a>
        </div>

        <div
          className="
            hidden
            md:flex
            categories-wrapper
            flex
            items-center
            justify-center
            w-4/5
            text-sm
          "
        >
          <nav className="w-3/5">
            <ul
              className="
                h-[55px]
                flex
                flex-row
                items-end
                justify-around
                gap-5
                font-bold
              "
            >
              <li>
                <a
                  className="
                    transition-colors
                    duration-100
                    ease
                    hover:text-stone-700
                  "
                  href="#"
                >
                  80'ler
                </a>
              </li>

              <li>
                <a
                  className="
                    transition-colors
                    duration-200
                    ease
                    hover:text-stone-500
                  "
                  href="#"
                >
                  90'lar
                </a>
              </li>

              <li>
                <a
                  className="
                    transition-colors
                    duration-200
                    ease
                    hover:text-stone-500
                  "
                  href="#"
                >
                  2000'ler
                </a>
              </li>

              <li>
                <a
                  className="
                    transition-colors
                    duration-200
                    ease
                    hover:text-stone-500
                  "
                  href="#"
                >
                  2010'lar
                </a>
              </li>

              <li>
                <a
                  className="
                    transition-colors
                    duration-200
                    ease
                    hover:text-stone-500
                  "
                  href="#"
                >
                  2020'ler
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <a
            className="
              hidden
              md:flex
              font-bold
              text-sm
              transition-colors
              duration-200
              ease
              hover:text-stone-500
            "
            href="/login"
          >
            Giriş Yap/Üye Ol
          </a>
        </div>
        <div>
          <button
            className="
              navbar-hamburger-button
              flex
              md:hidden
              h-[55px]
              justify-center
              items-center
              font-bold
              text-sm
              transition-colors
              duration-200
              ease
              hover:text-stone-500
            "
            href="#"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img className="w-10" src={navbarMenu} alt="" />
          </button>
        </div>
      </div>
      <div
        className={`
    mobile-nav-menu
    md:hidden
    transition-all
    duration-35 0
    ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
  `}
      >
        <h3 className="font-bold">Kategoriler</h3>
        <ul
          className="
                w-full 
                flex
                font-bold
                flex-col
                p-3
                gap-2
              "
        >
          <li>
            <a
              className="
                    transition-colors
                    duration-100
                    ease
                    hover:text-stone-700
                  "
              href="#"
            >
              80'ler
            </a>
          </li>

          <li>
            <a
              className="
                    transition-colors
                    duration-200
                    ease
                    hover:text-stone-500
                  "
              href="#"
            >
              90'lar
            </a>
          </li>

          <li>
            <a
              className="
                    transition-colors
                    duration-200
                    ease
                    hover:text-stone-500
                  "
              href="#"
            >
              2000'ler
            </a>
          </li>

          <li>
            <a
              className="
                    transition-colors
                    duration-200
                    ease
                    hover:text-stone-500
                  "
              href="#"
            >
              2010'lar
            </a>
          </li>

          <li>
            <a
              className="
                    transition-colors
                    duration-200
                    ease
                    hover:text-stone-500
                  "
              href="#"
            >
              2020'ler
            </a>
          </li>
        </ul>
        <div className="mt-2">
          <a
            className="
                    transition-colors
                    font-bold
                    duration-200
                    ease
                    hover:text-stone-500
                  "
            href="/login"
          >
            Giriş Yap/Üye Ol
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
