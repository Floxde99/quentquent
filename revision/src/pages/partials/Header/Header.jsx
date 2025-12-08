import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`app-header${isScrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <h1 className="app-logo">My App</h1>
        <nav className="nav">
          <NavLink
            to="/users"
            className={({ isActive }) => `nav-link nav-pill nav-pill-pair ${isActive ? 'active' : ''}`}
          >
            Users
          </NavLink>
          <NavLink
            to="/form"
            className={({ isActive }) => `nav-link nav-pill nav-pill-impair ${isActive ? 'active' : ''}`}
          >
            Form
          </NavLink>
          <NavLink
            to="/film"
            className={({ isActive }) => `nav-link nav-pill nav-pill-pair ${isActive ? 'active' : ''}`}
          >
            Film
          </NavLink>
          <NavLink
            to="/suzon"
            className={({ isActive }) => `nav-link nav-pill nav-pill-impair ${isActive ? 'active' : ''}`}
          >
            Suzon
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
