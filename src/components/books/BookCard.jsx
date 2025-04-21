import styles from "./BookCard.module.css";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function BookCard({ book, onDelete }) {
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onDelete(book.id);
    };

    return (
        <div className={styles.card}>
            <img src={book.imageUrl} alt={book.title} className={styles.bookImage} />
            <div className={styles.overlay}>
                <IconButton
                    className={styles.deleteButton}
                    onClick={handleDeleteClick}
                    aria-label="delete book"
                >
                    <Delete className={styles.icon}/>
                </IconButton>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookAuthor}>{book.author}</p>
                <p className={styles.bookGenre}>{book.genre}</p>
                <p className={styles.bookDescription}>{book.description}</p>
            </div>
        </div>
    );
}
