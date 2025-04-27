import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            VoltMasters
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className={`transition-colors ${
              isActive("/")
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            خانه
          </Link>
          <Link
            to="/products"
            className={`transition-colors ${
              isActive("/products")
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            محصولات
          </Link>
          <a
            href="#contact"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            تماس با ما
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              خانه
            </Link>
            <Link
              to="/products"
              className={`transition-colors ${
                isActive("/products")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              محصولات
            </Link>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              تماس با ما
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
