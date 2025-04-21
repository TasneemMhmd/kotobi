import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <h2> لأن لكل قارئ حكاية.. ولكل كتاب أثر.🌟 </h2>
                <h6>جميع الحقوق محفوظة &copy; 2025</h6>
                <h3>تصميم وتطوير تسنيم💖</h3>
            </div>
        </footer>
    );
}
