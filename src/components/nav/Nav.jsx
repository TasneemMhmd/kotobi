import { useState } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <h1>كتبي</h1>
            </div>

            <button
                className={`${styles.menuBtn} ${isMenuOpen ? styles.activeMenuBtn : ""
                    }`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div
                className={`${styles.overlay} ${isMenuOpen ? styles.showOverlay : ""}`}
                onClick={closeMenu}
            />

            <div
                className={`${styles.navLinksContainer} ${isMenuOpen ? styles.showMenu : ""
                    }`}
            >
                <div className={styles.menuHeader}>
                    <span>كتبي</span>
                    <button
                        className={styles.closeBtn}
                        onClick={closeMenu}
                        aria-label="Close menu"
                    >
                        ×
                    </button>
                </div>
                <ul className={styles.navLinks}>
                    <li>
                        <a href="#" onClick={closeMenu}>
                            الرئيسية
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={closeMenu}>
                            من نحن
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={closeMenu}>
                            الكتب
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={closeMenu}>
                            تواصل معنا
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
