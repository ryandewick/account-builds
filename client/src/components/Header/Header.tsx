import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { NavigationBar } from "../NavigationBar/NavigationBar";

export function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>
              {/*<span className={styles.logoText}>ABG</span>*/}
              <span className={styles.logoText}>Account Build Guides</span>
            </Link>
          </div>
          <NavigationBar />
        </div>
      </div>
    </header>
  );
}