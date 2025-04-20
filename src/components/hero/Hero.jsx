import styles from './Hero.module.css';

export default function Hero() {
    return (
        <div className={styles.hero} id='hero'>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <h1>مرحبًا بكم في كتبي</h1>
                <p>اصنع عالمًا من كتبك المميزة</p>
                <button className={styles.ctaBtn}>ابدأ رحلتك</button>
            </div>
        </div>
    );
}
