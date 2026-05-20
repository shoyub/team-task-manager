import { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logoutHandler = () => {

    localStorage.removeItem("user");

    navigate("/");
  };

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Tasks",
      path: "/tasks",
    },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer"
          >

            <h1 className="text-3xl font-bold text-blue-600">
              Team Task Manager
            </h1>

          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">

            {/* Navigation Links */}
            <div className="flex items-center gap-8">

              {
                navLinks.map((link) => (

                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`font-medium transition duration-200
                      
                      ${
                        location.pathname === link.path
                          ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                          : "text-gray-700 hover:text-blue-600"
                      }
                    `}
                  >
                    {link.name}
                  </button>
                ))
              }

            </div>

            {/* User Section */}
            <div className="flex items-center gap-5 border-l pl-6">

              <div className="text-right">

                <p className="font-semibold text-gray-800 text-sm uppercase">
                  {user?.name}
                </p>

                <p className="text-xs text-gray-500">
                  {user?.role}
                </p>

              </div>

              <button
                onClick={logoutHandler}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition duration-200"
              >
                Logout
              </button>

            </div>

          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {
        menuOpen && (

          <div className="md:hidden bg-white border-t px-6 py-5 space-y-5">

            {/* Links */}
            <div className="flex flex-col gap-4">

              {
                navLinks.map((link) => (

                  <button
                    key={link.path}
                    onClick={() => {
                      navigate(link.path);
                      setMenuOpen(false);
                    }}
                    className={`text-left font-medium
                      
                      ${
                        location.pathname === link.path
                          ? "text-blue-600"
                          : "text-gray-700"
                      }
                    `}
                  >
                    {link.name}
                  </button>
                ))
              }

            </div>

            {/* User */}
            <div className="border-t pt-4">

              <p className="font-semibold">
                {user?.name}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                {user?.role}
              </p>

              <button
                onClick={logoutHandler}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                Logout
              </button>

            </div>

          </div>
        )
      }

    </nav>
  );
};

export default Navbar;