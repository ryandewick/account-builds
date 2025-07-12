import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Account Build Guides</h4>
            <p className={styles.footerText}>
              Your go-to resource for optimizing your OSRS account builds.
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/explore-builds">Explore Builds</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Resources</h4>
            <ul className={styles.footerLinks}>
              <li><a href="https://oldschool.runescape.com/" target="_blank" rel="noopener noreferrer">OSRS Official Site</a></li>
              <li><a href="https://oldschool.runescape.wiki/" target="_blank" rel="noopener noreferrer">OSRS Wiki</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Account Build Guides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}