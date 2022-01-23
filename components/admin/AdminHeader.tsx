import Link from "next/link";
import React from "react";

// Header for admin pages
const AdminHeader = () => {
  // Handle logout
  const handleLogout = () => {
    console.log("Logging out");
  };
  return (
    <header>
      <nav className="flex items-end justify-between pt-2 border-b border-b-[#D1CFCF]">
        <div className="flex items-center">
          <h2 className="font-bold text-black text-2xl">
            <Link href="/admin">Abu Raihan</Link>
          </h2>
          <span className="text-xs font-light ml-1 text-black bg-yellow-400 px-1 mt-2">
            admin
          </span>
        </div>
        <div>
          <ul className="flex items-center">
            <li className="mx-2 font-normal text-base text-black border-b-2 hover:border-b-lime-600">
              <Link href={"/admin/add-post"}>
                <span className="material-icons cursor-pointer text-[#4B5563]">
                  add
                </span>
              </Link>
            </li>
            <li className="mx-2 font-normal text-base text-black border-b-2 hover:border-b-lime-600">
              <Link href={"/admin/manage-posts"}>
                <span className="material-icons cursor-pointer text-[#4B5563]">
                  manage_search
                </span>
              </Link>
            </li>
            <li className="mx-2 font-normal text-base text-black border-b-2 hover:border-b-lime-600">
              <Link href={"/admin/settings"}>
                <span className="material-icons cursor-pointer text-[#4B5563]">
                  settings
                </span>
              </Link>
            </li>
            <li
              className="mx-2 mr-0 font-normal text-base text-black border-b-2 hover:border-b-lime-600"
              onClick={handleLogout}
            >
              <Link href={""}>
                <span className="material-icons cursor-pointer text-[#4B5563]">
                  logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
