import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          SaveClip
        </NavLink>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/platforms" onClick={closeMenu}>Platforms</NavLink></li>
          <li><NavLink to="/how-it-works" onClick={closeMenu}>How It Works</NavLink></li>
          <li><NavLink to="/faq" onClick={closeMenu}>FAQ</NavLink></li>
          <li><NavLink to="/history" onClick={closeMenu}>History</NavLink></li>
        </ul>

        <div className="navbar-right">
          <ThemeToggle />
          <button
            className={`burger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
