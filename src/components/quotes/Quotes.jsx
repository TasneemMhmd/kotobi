import { useState } from "react";
import styles from "./Quotes.module.css";
import quotesData from "../../utils/quotes";

export default function Quotes() {
    const [quotes, setQuotes] = useState(quotesData);
    const [newQuote, setNewQuote] = useState({ text: "", book: "", author: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewQuote({ text: "", book: "", author: "" });
        setErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewQuote((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const validationErrors = {};
        if (!newQuote.text.trim())
            validationErrors.text = "الرجاء إدخال نص الإقتباس";
        if (!newQuote.book.trim())
            validationErrors.book = "الرجاء إدخال اسم الكتاب";
        if (!newQuote.author.trim())
            validationErrors.author = "الرجاء إدخال اسم المؤلف";

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            setTimeout(() => {
                setQuotes([...quotes, { ...newQuote }]);
                setNewQuote({ text: "", book: "", author: "" });
                setIsSubmitting(false);
                closeModal();

                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 3000);
            }, 500);
        }
    };

    return (
        <section className={styles.quotes} id="quotes">
            <h2 className={styles.title}>📚 مقتبسات من الكتب</h2>

            <div className={styles.addButtonContainer}>
                <button onClick={openModal} className={styles.addButton}>
                    <span className={styles.addIcon}>+</span> إضافة إقتباس جديد
                </button>
            </div>

            {showSuccessMessage && (
                <div className={styles.successMessage}>
                    <span>✓</span> تمت إضافة الإقتباس بنجاح!
                </div>
            )}

            <div className={styles.quotesGrid}>
                {quotes.map((quote, index) => (
                    <div key={index} className={styles.quoteCard}>
                        <div className={styles.quoteIconContainer}>
                            <span className={styles.quoteIcon}>❝</span>
                        </div>
                        <p className={styles.quoteText}>{quote.text}</p>
                        <div className={styles.quoteDetails}>
                            <p className={styles.bookName}>— {quote.book}</p>
                            <p className={styles.authorName}>بقلم: {quote.author}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal} dir="rtl">
                        <div className={styles.modalHeader}>
                            <h3>إضافة إقتباس جديد</h3>
                            <button onClick={closeModal} className={styles.closeButton}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="text">نص الإقتباس</label>
                                <textarea
                                    id="text"
                                    name="text"
                                    value={newQuote.text}
                                    onChange={handleInputChange}
                                    className={`${styles.formInput} ${styles.textArea} ${errors.text ? styles.errorInput : ""
                                        }`}
                                />
                                {errors.text && (
                                    <p className={styles.errorText}>{errors.text}</p>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="book">اسم الكتاب</label>
                                <input
                                    type="text"
                                    id="book"
                                    name="book"
                                    value={newQuote.book}
                                    onChange={handleInputChange}
                                    className={`${styles.formInput} ${errors.book ? styles.errorInput : ""
                                        }`}
                                />
                                {errors.book && (
                                    <p className={styles.errorText}>{errors.book}</p>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="author">اسم المؤلف</label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={newQuote.author}
                                    onChange={handleInputChange}
                                    className={`${styles.formInput} ${errors.author ? styles.errorInput : ""
                                        }`}
                                />
                                {errors.author && (
                                    <p className={styles.errorText}>{errors.author}</p>
                                )}
                            </div>

                            <div className={styles.modalActions}>
                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "جاري الإضافة..." : "إضافة إقتباس"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
