import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { MenuContext } from "../contexts";

const NavBar: React.FC = () => {
  let { pathname } = useRouter();
  pathname = pathname.slice(1);

  // Menu context
  const { menu, dispatchMenu } = useContext(MenuContext);

  // Handle menu
  useEffect(() => {
    handleMenu();

    // Resposive menu
    function handleMenu() {
      window.innerWidth > 640 && dispatchMenu({ isHidden: false });
      window.innerWidth < 640 && dispatchMenu({ isHidden: true });
    }
    window.addEventListener("resize", handleMenu);

    return () => {
      window.removeEventListener("resize", handleMenu);
    };
  }, []);

  return (
    <>
      {!menu.isHidden && (
        <nav
          className="mt-2 mb-4 border-b border-b-[#d1cfcf]"
          role="navigation"
          aria-label="Site categories links"
        >
          <ul className="sm:flex sm:items-center sm:flex-wrap block">
            <li
              className={`first:ml-0 last:mr-0 sm:mx-3 pb-2 text-base text-black border-b-2 border-b-transparent hover:border-b-blue-600 ${
                pathname === "" && "border-b-blue-600"
              }`}
            >
              <Link href={"/"}>Home</Link>
            </li>
            <li
              className={`first:ml-0 last:mr-0 sm:mx-3 pb-2 text-base text-black border-b-2 border-b-transparent hover:border-b-blue-600 ${
                pathname === "latest" && "border-b-blue-600"
              }`}
            >
              <Link href={"/latest"}>Latest</Link>
            </li>
            <li
              className={`first:ml-0 last:mr-0 sm:mx-3 pb-2 text-base text-black border-b-2 border-b-transparent hover:border-b-blue-600 ${
                pathname === "blog-posts" && "border-b-blue-600"
              }`}
            >
              <Link href={"/blog-posts"}>Blog posts</Link>
            </li>
            <li
              className={`first:ml-0 last:mr-0 sm:mx-3 pb-2 text-base text-black border-b-2 border-b-transparent hover:border-b-blue-600 ${
                pathname === "projects" && "border-b-blue-600"
              }`}
            >
              <Link href={"/projects"}>Projects</Link>
            </li>
            <li
              className={`first:ml-0 last:mr-0 sm:mx-3 pb-2 text-base text-black border-b-2 border-b-transparent hover:border-b-blue-600 ${
                pathname === "q-and-a" && "border-b-blue-600"
              }`}
            >
              <Link href={"/q-and-a"}>{"Question & answere"}</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default React.memo(NavBar);
