import styles from "./BookCard.module.css";

export default function BookCard({ book }) {
    return (
        <div className={styles.card}>
            <img src={book.imageUrl} alt={book.title} className={styles.bookImage} />
            <div className={styles.overlay}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookAuthor}>{book.author}</p>
                <p className={styles.bookGenre}>{book.genre}</p>
                <p className={styles.bookDescription}>{book.description}</p>
            </div>
        </div>
    );
}