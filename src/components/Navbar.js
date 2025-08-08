import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const adminMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null); // Ref for the mobile menu button
  const mobileNavRef = useRef(null); // Ref for the mobile navigation panel

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Effect to handle clicks outside the admin menu and mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close admin menu if click is outside
      if (
        adminMenuRef.current &&
        !adminMenuRef.current.contains(event.target)
      ) {
        setAdminMenuOpen(false);
      }
      // Close mobile menu if click is outside, and not on the toggle button itself
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [adminMenuOpen, mobileMenuOpen]); // Depend on both states

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setAdminMenuOpen(false);
    setMobileMenuOpen(false); // Close mobile menu on logout
    window.location.href = "/";
  };

  const toggleAdminMenu = () => {
    setAdminMenuOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="text-2xl font-bold hover:text-purple-200 transition-colors"
          >
            <img src="/universitea.png" alt="Logo" className="w-40 " />
            <img src="/caminantes.png" alt="caminantes" />
          </Link>

          {/* Hamburger Menu Button (visible on small screens) */}
          <div className="md:hidden flex items-center">
            {user && ( // Show connected user info on mobile if logged in
              <div className="flex flex-col text-right text-sm leading-tight mr-4">
                <span className="font-semibold">{user.email}</span>
                <span className="text-purple-200 capitalize text-xs">
                  ({user.role})
                </span>
              </div>
            )}
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-md p-1"
              aria-label="Toggle mobile menu"
              ref={mobileMenuButtonRef} // Attach ref
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                )}
              </svg>
            </button>
          </div>

          {/* Main Navigation Links (visible on medium and larger screens) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="hover:text-purple-200 transition-colors text-lg"
            >
              Actividades
            </Link>
            <Link
              to="/modulos"
              className="hover:text-purple-200 transition-colors text-lg"
            >
              Módulos
            </Link>
            <Link
              to="/docentes"
              className="hover:text-purple-200 transition-colors text-lg"
            >
              Docentes
            </Link>

            {/* Admin Menu (conditionally rendered) */}
            {user?.role === "admin" && (
              <div className="relative" ref={adminMenuRef}>
                <button
                  onClick={toggleAdminMenu}
                  className="hover:text-purple-200 transition-colors flex items-center focus:outline-none text-lg"
                  aria-expanded={adminMenuOpen}
                  aria-haspopup="true"
                >
                  Admin
                  <svg
                    className={`w-5 h-5 ml-1 transition-transform ${
                      adminMenuOpen ? "transform rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {adminMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 py-1"
                    role="menu"
                  >
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-purple-800 hover:bg-purple-100 transition-colors"
                      role="menuitem"
                      onClick={() => {
                        setAdminMenuOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/actividades"
                      className="block px-4 py-2 text-sm text-purple-800 hover:bg-purple-100 transition-colors"
                      role="menuitem"
                      onClick={() => {
                        setAdminMenuOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      Gestionar Actividades
                    </Link>
                    <Link
                      to="/admin/modulos"
                      className="block px-4 py-2 text-sm text-purple-800 hover:bg-purple-100 transition-colors"
                      role="menuitem"
                      onClick={() => {
                        setAdminMenuOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      Gestionar Módulos
                    </Link>
                    <Link
                      to="/admin/docentes"
                      className="block px-4 py-2 text-sm text-purple-800 hover:bg-purple-100 transition-colors"
                      role="menuitem"
                      onClick={() => {
                        setAdminMenuOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      Gestionar Docentes
                    </Link>
                    <Link
                      to="/admin/usuarios"
                      className="block px-4 py-2 text-sm text-purple-800 hover:bg-purple-100 transition-colors"
                      role="menuitem"
                      onClick={() => {
                        setAdminMenuOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      Gestionar Usuarios
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Authentication Links/Info (visible on medium and larger screens) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex flex-col text-right text-sm leading-tight">
                  <span className="font-semibold">{user.email}</span>
                  <span className="text-purple-200 capitalize text-xs">
                    ({user.role})
                  </span>
                </div>
                <Link
                  to="/perfil"
                  className="hover:text-purple-200 transition-colors text-lg"
                >
                  Mi Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg transition-colors text-lg font-medium"
                >
                  Cerrar Sesión ➡️
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-purple-200 transition-colors text-lg"
                >
                  Iniciar Sesión ➡️
                </Link>
                <Link
                  to="/registro"
                  className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg transition-colors text-lg font-medium"
                >
                  Registrarse 📝
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel (conditionally visible) */}
      {mobileMenuOpen && (
        <div
          className="md:hidden bg-purple-700 pb-4 shadow-inner"
          ref={mobileNavRef}
        >
          <div className="flex flex-col items-center space-y-4 pt-2">
            <Link
              to="/"
              className="block text-white hover:text-purple-200 transition-colors text-lg"
              onClick={closeMobileMenu}
            >
              Actividades
            </Link>
            <Link
              to="/modulos"
              className="block text-white hover:text-purple-200 transition-colors text-lg"
              onClick={closeMobileMenu}
            >
              Módulos
            </Link>
            <Link
              to="/docentes"
              className="block text-white hover:text-purple-200 transition-colors text-lg"
              onClick={closeMobileMenu}
            >
              Docentes
            </Link>
            {user?.role === "admin" && (
              <>
                <div className="w-full border-t border-purple-500 my-2"></div>{" "}
                {/* Separator */}
                <span className="text-purple-200 text-base font-semibold">
                  Admin Menu:
                </span>
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-base text-purple-100 hover:bg-purple-800 rounded-md transition-colors w-full text-center"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/actividades"
                  className="block px-4 py-2 text-base text-purple-100 hover:bg-purple-800 rounded-md transition-colors w-full text-center"
                  onClick={closeMobileMenu}
                >
                  Gestionar Actividades
                </Link>
                <Link
                  to="/admin/modulos"
                  className="block px-4 py-2 text-base text-purple-100 hover:bg-purple-800 rounded-md transition-colors w-full text-center"
                  onClick={closeMobileMenu}
                >
                  Gestionar Módulos
                </Link>
                <Link
                  to="/admin/docentes"
                  className="block px-4 py-2 text-base text-purple-100 hover:bg-purple-800 rounded-md transition-colors w-full text-center"
                  onClick={closeMobileMenu}
                >
                  Gestionar Docentes
                </Link>
                <Link
                  to="/admin/usuarios"
                  className="block px-4 py-2 text-base text-purple-100 hover:bg-purple-800 rounded-md transition-colors w-full text-center"
                  onClick={closeMobileMenu}
                >
                  Gestionar Usuarios
                </Link>
              </>
            )}
            <div className="w-full border-t border-purple-500 my-2"></div>{" "}
            {/* Separator */}
            {user ? (
              <>
                <Link
                  to="/perfil"
                  className="block text-white hover:text-purple-200 transition-colors text-lg"
                  onClick={closeMobileMenu}
                >
                  Mi Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-purple-800 hover:bg-purple-900 px-4 py-2 rounded-lg transition-colors text-lg font-medium w-3/4"
                >
                  Cerrar Sesión ➡️
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-white hover:text-purple-200 transition-colors text-lg"
                  onClick={closeMobileMenu}
                >
                  Iniciar Sesión ➡️
                </Link>
                <Link
                  to="/registro"
                  className="bg-purple-800 hover:bg-purple-900 px-4 py-2 rounded-lg transition-colors text-lg font-medium w-3/4"
                  onClick={closeMobileMenu}
                >
                  Registrarse 📝
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
