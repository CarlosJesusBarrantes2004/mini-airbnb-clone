import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Menu, X } from "lucide-react"; // Reemplazamos las imágenes SVG por iconos de Lucide

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative border-b border-gray-200 shadow-sm py-4 px-6 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-[#ff07c1] font-bold text-3xl sm:text-4xl uppercase"
        >
          Bibin
        </Link>

        {!isAuthenticated && (
          <nav className="block">
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  to="/register"
                  className="link text-sm text-gray-600 hover:text-[#ff07c1] transition-colors"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="link text-sm text-gray-600 hover:text-[#ff07c1] transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        )}

        {/* Botón Menú Móvil */}
        {isAuthenticated && (
          <button
            onClick={toggleMenu}
            className="sm:hidden z-50 relative"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        )}

        {/* Overlay para el menú móvil */}
        {isAuthenticated && isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 sm:hidden z-40"
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}

        {/* Menú Móvil */}
        {isAuthenticated && (
          <div
            className={`
              fixed top-0 right-0 h-screen w-64 bg-white shadow-lg
              transform transition-transform duration-300 ease-out z-50
              ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
              sm:hidden
            `}
          >
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button onClick={() => toggleMenu()}>
                    <X className="w-6 h-6 text-gray-600"></X>
                  </button>
                </div>

                <p className="text-gray-600">
                  Welcome{" "}
                  <span className="font-bold text-[#ff07c1]">
                    {user?.username}!
                  </span>
                </p>

                <nav>
                  <ul className="space-y-4 text-base">
                    <li>
                      <Link
                        to="/properties"
                        className="block text-gray-600 hover:text-[#ff07c1] transition-colors"
                        onClick={toggleMenu}
                      >
                        Properties
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/bookings"
                        className="block text-gray-600 hover:text-[#ff07c1] transition-colors"
                        onClick={toggleMenu}
                      >
                        Bookings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          toggleMenu();
                        }}
                        className="text-gray-600 hover:text-[#ff07c1] transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Menú Desktop Autenticado */}
        {isAuthenticated && (
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-6">
              <li>
                <span className="text-gray-600">
                  Welcome{" "}
                  <span className="font-medium text-[#ff07c1]">
                    {user?.username}!
                  </span>
                </span>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="link hover:text-[#ff07c1] transition-colors"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/bookings"
                  className="link hover:text-[#ff07c1] transition-colors"
                >
                  Bookings
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="link hover:text-[#ff07c1] transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
