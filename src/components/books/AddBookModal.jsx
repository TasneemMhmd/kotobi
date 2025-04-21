import React, { useState, useRef } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { Close, CloudUpload, Delete } from "@mui/icons-material";
import styles from "./AddBookModal.module.css";

const AddBookModal = ({ open, handleClose, handleAddBook }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const handleSubmit = () => {
        if (!title || !author || !genre || !description || !imageUrl) {
            setError("من فضلك، املأ جميع الحقول");
            return;
        }

        const newBook = { title, author, genre, description, imageUrl };
        handleAddBook(newBook);
        setTitle("");
        setAuthor("");
        setGenre("");
        setDescription("");
        setImageUrl("");
        setError("");
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason !== "backdropClick") handleClose();
            }}
            classes={{ paper: styles.dialogPaper }}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle className={styles.dialogTitle}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        className={styles.closeButton}
                    >
                        <Close sx={{ color: "white" }} />
                    </IconButton>
                    <Typography variant="h6" className={styles.title}>
                        إضافة كتاب جديد
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent className={styles.dialogContent}>
                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.formLayout}>
                    <div className={styles.row}>
                        <TextField
                            variant="standard"
                            label="عنوان الكتاب"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.textField}
                            InputProps={{ className: styles.textFieldInput }}
                            InputLabelProps={{ className: styles.textFieldLabel }}
                            sx={{
                                "& .MuiInput-underline:before": {
                                    borderBottomColor: "var(--main-color)",
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                    borderBottomColor: "var(--main-color)",
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "var(--main-color)",
                                },
                            }}
                        />
                        <TextField
                            variant="standard"
                            label="اسم المؤلف"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className={styles.textField}
                            InputProps={{ className: styles.textFieldInput }}
                            InputLabelProps={{ className: styles.textFieldLabel }}
                            sx={{
                                "& .MuiInput-underline:before": {
                                    borderBottomColor: "var(--main-color)",
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                    borderBottomColor: "var(--main-color)",
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "var(--main-color)",
                                },
                            }}
                        />
                    </div>

                    <div className={styles.row}>
                        <TextField
                            variant="standard"
                            label="نوع الكتاب"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className={styles.textField}
                            InputProps={{ className: styles.textFieldInput }}
                            InputLabelProps={{ className: styles.textFieldLabel }}
                            sx={{
                                "& .MuiInput-underline:before": {
                                    borderBottomColor: "var(--main-color)",
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                    borderBottomColor: "var(--main-color)",
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "var(--main-color)",
                                },
                            }}
                        />
                        <div className={styles.imageSection}>
                            <div className={styles.imageUploadContainer}>
                                {!imageUrl ? (
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        startIcon={<CloudUpload />}
                                        onClick={() => fileInputRef.current.click()}
                                        sx={{
                                            border: "1px solid var(--main-color)",
                                            color: "var(--main-color)",
                                            "&:hover": {
                                                backgroundColor: "var(--main-color)",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        &nbsp; تحميل صورة الكتاب
                                    </Button>
                                ) : (
                                    <div className={styles.imagePreviewWrapper}>
                                        <img
                                            src={imageUrl}
                                            alt="معاينة"
                                            className={styles.imagePreview}
                                        />
                                        <IconButton
                                            onClick={removeImage}
                                            size="small"
                                            className={styles.deleteImageButton}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <TextField
                            variant="standard"
                            label="وصف الكتاب"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.descriptionField}
                            multiline
                            InputProps={{ className: styles.textFieldInput }}
                            InputLabelProps={{ className: styles.textFieldLabel }}
                            sx={{
                                "& .MuiInput-underline:before": {
                                    borderBottomColor: "var(--main-color)",
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                    borderBottomColor: "var(--main-color)",
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "var(--main-color)",
                                },
                            }}
                        />
                    </div>
                </div>
            </DialogContent>

            <DialogActions sx={{borderTop:"1px solid #ddd"}}>
                <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    sx={{
                        border: "1px solid var(--main-color)",
                        color: "var(--main-color)",
                        "&:hover": {
                            backgroundColor: "var(--main-color)",
                            color: "white",
                        },
                    }}
                >
                    إضافة الكتاب
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBookModal;
