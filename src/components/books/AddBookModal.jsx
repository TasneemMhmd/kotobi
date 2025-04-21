import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import styles from "./AddBookModal.module.css";

export default function AddBookModal({ open, onClose, onAddBook }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState(null);

    function handleAddBook() {
        if (!title || !author || !genre || !description || !imageUrl) {
            setError("يرجى ملء جميع الحقول المطلوبة.");
            return;
        }

        const book = {
            title,
            author,
            genre,
            description,
            imageUrl,
        };
        onAddBook(book);  // إرسال الكتاب للمكون الأب
        onClose();  // إغلاق المودال بعد إضافة الكتاب
    }

    return (
        <Dialog open={open} onClose={onClose} className={styles.dialog}>
            <DialogTitle>إضافة كتاب جديد</DialogTitle>
            <DialogContent>
                {error && <p className={styles.error}>{error}</p>}
                <TextField
                    label="عنوان الكتاب"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="اسم المؤلف"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="نوع الكتاب"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="وصف الكتاب"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <TextField
                    label="رابط صورة الكتاب"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">إلغاء</Button>
                <Button onClick={handleAddBook} color="primary">إضافة الكتاب</Button>
            </DialogActions>
        </Dialog>
    );
}
