import React from "react";
import { Link } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <div>
      <header className="flex justify-between items-center bg-indigo-600 p-4 shadow-lg">
        <h1 className="text-white text-2xl font-bold">
          <Link to="/">Home</Link>
        </h1>
        <nav>
          <h1 className="text-white text-2xl font-bold">
            <Link to="/pagination" className="hover:text-indigo-200 transition duration-300">
              Pagination
            </Link>
          </h1>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}

export default MainLayout;
