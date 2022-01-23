import React, { useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { MenuContext } from "../contexts";

const Header: React.FC = () => {
  // Menu context
  const { menu, dispatchMenu } = useContext(MenuContext);

  // Search toggle state (only for small devices)
  const [isSearchHidden, setIsSearchHidden] = useState(false);

  return (
    <header
      className=" mt-3 border-b border-b-[#d1cfcf] pb-2"
      aria-label="Header"
    >
      <nav
        className="flex items-center justify-between"
        aria-label="Navigation bar"
        role="navigation"
      >
        <div
          className="block sm:hidden"
          aria-label="Mobile navigation collaps button"
        >
          <button
            className="border hover:border-[#D1CFCF] flex items-center justify-center p-1"
            onClick={() => dispatchMenu({ isHidden: !menu.isHidden })}
          >
            <span className="material-icons-outlined">menu</span>
          </button>
        </div>
        <div aria-label="Site logo section">
          <h2 title="Abu Raihan - home page">
            <Link href={"/"}>
              <a className="font-bold text-2xl text-black cursor-pointer">
                Abu Raihan
              </a>
            </Link>
          </h2>
        </div>
        <div className="flex-1 mx-5 hidden sm:block" aria-label="Search form">
          <form>
            <input
              type="search"
              placeholder="Search..."
              className="w-full max-w-[700px] mx-auto block py-2 px-3 border font-normal text-base border-[#d1cfcf] hover:border-blue-600 focus:border-blue-600 focus:outline-none"
              title="Search"
              role="search"
            />
          </form>
        </div>
        <div aria-label="Toggle dark mode" className="hidden sm:block">
          <span
            className="cursor-pointer"
            tabIndex={0}
            title="Toggle dark mode"
          >
            <span className="material-icons-outlined">dark_mode</span>
          </span>
        </div>
        <div className="block sm:hidden" aria-label="Search form for mobile">
          <button
            className="border hover:border-[#D1CFCF] flex items-center justify-center p-1"
            role="button"
            onClick={() => setIsSearchHidden(!isSearchHidden)}
          >
            <span className="material-icons-outlined">search</span>
          </button>
          {isSearchHidden && (
            <form
              className="sm:hidden block w-full absolute right-1 pl-2 top-2.5"
              role="form"
              aria-label="Mobile search form"
            >
              <input
                type="search"
                placeholder="Search..."
                className="w-full max-w-[700px] mx-auto block py-2 px-3 border font-normal text-base border-[#d1cfcf] hover:border-blue-600 focus:border-blue-600 focus:outline-none"
                title="Search"
                role="search"
              />
              <button
                onClick={() => setIsSearchHidden(!isSearchHidden)}
                className="absolute top-0 right-0 h-full px-3 bg-black text-white"
                role="button"
              >
                Close
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);
