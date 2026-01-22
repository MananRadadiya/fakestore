import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">⚡</span>
          FakeStore
        </Link>

        {/* Search */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Dark Mode Toggle */}
          <button
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Cart Icon */}
          <Link to="/checkout" className="icon-button cart-icon">
            🛒
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <Link to="/checkout" className="mobile-menu-item">
            Cart ({getTotalItems()})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
