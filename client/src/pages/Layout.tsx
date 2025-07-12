import "../styles/globals.scss";
import { ReactNode } from "react";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import styles from "./Layout.module.scss";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className="container">
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
