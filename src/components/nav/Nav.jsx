import { useEffect, useState } from "react";
import styles from "./Nav.module.css";
import logo from "../../assets/images/logo.png";

export default function Nav() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.logo}>
                <img src={logo} alt="Logo" className={styles.logoImage} />
            </div>

            <button
                className={`${styles.menuBtn} ${isMenuOpen ? styles.activeMenuBtn : ""}`}
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
                className={`${styles.navLinksContainer} ${isMenuOpen ? styles.showMenu : ""}`}
            >
                <div className={styles.menuHeader}>
                    <img src={logo} alt="Logo" className={styles.logoImage} />
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
                        <a href="#hero" onClick={closeMenu}>
                            الرئيسية
                        </a>
                    </li>
                    <li>
                        <a href="#about" onClick={closeMenu}>
                            من نحن
                        </a>
                    </li>
                    <li>
                        <a href="#books" onClick={closeMenu}>
                            الكتب
                        </a>
                    </li>
                    <li>
                        <a href="#quotes" onClick={closeMenu}>
                            إقتباسات
                        </a>
                    </li>
                    <li>
                        <a href="#contact-us" onClick={closeMenu}>
                            تواصل معنا
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
