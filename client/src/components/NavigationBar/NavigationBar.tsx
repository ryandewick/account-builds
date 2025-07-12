import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavigationBar.module.scss";

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={styles.navigationBar}>
      <button 
        className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="nav-menu"
      >
        <span className={styles.menuIcon}></span>
        <span className={styles.menuIcon}></span>
        <span className={styles.menuIcon}></span>
      </button>

      <ul id="nav-menu" className={`${styles.navItems} ${isMenuOpen ? styles.navOpen : ''}`} role="menu" aria-hidden={!isMenuOpen}>
        <div className={styles.navHeader}>
          <h2 className={styles.navTitle}>Menu</h2>
          <button 
            className={styles.closeButton}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
            aria-controls="nav-menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-hidden="true">
              <title>Close</title>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <li className={styles.navItem}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            to="/explore-builds" 
            className={`${styles.navLink} ${isActive('/explore-builds') ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Explore Builds
          </Link>
        </li>
      </ul>
      <div className={styles.navOverlay} onClick={() => setIsMenuOpen(false)}></div>
    </nav>
  );
}
