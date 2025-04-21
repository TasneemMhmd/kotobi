import { useState } from "react";
import styles from "./BooksList.module.css";
import books from "../../utils/data";
import BookCard from "./BookCard";
import AddBookModal from "./AddBookModal";
import DeleteConfirmationModal from "../deleteModal/DeleteConfirmation";

export default function BooksList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [selectedFilter, setSelectedFilter] = useState("الكل");
    const [booksList, setBooksList] = useState(books);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    const genres = ["الكل", ...new Set(booksList.map((book) => book.genre))];
    const authors = ["الكل", ...new Set(booksList.map((book) => book.author))];

    const filteredBooks = booksList.filter((book) => {
        const matchesSearch =
            searchTerm === "" ||
            book.title.includes(searchTerm) ||
            book.author.includes(searchTerm);

        let matchesFilter = true;
        if (filterType === "genre" && selectedFilter !== "الكل") {
            matchesFilter = book.genre === selectedFilter;
        } else if (filterType === "author" && selectedFilter !== "الكل") {
            matchesFilter = book.author === selectedFilter;
        }

        return matchesSearch && matchesFilter;
    });

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
        setSelectedFilter("الكل");
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteClick = (bookId) => {
        const book = booksList.find(b => b.id === bookId);
        setBookToDelete(book);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setBooksList(booksList.filter(book => book.id !== bookToDelete.id));
        setDeleteModalOpen(false);
        setBookToDelete(null);
    };

    const handleCancelDelete = () => {
        setDeleteModalOpen(false);
        setBookToDelete(null);
    };

    const handleAddBook = (newBook) => {
        const newId = booksList.length > 0
            ? Math.max(...booksList.map(book => book.id)) + 1
            : 1;

        setBooksList([...booksList, { ...newBook, id: newId }]);
        handleCloseModal();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <i className="fa-solid fa-book"></i> كتب مميزة
            </h1>

            <div className={styles.filtersContainer}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="ابحث عن كتاب أو مؤلف..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className={`fa-solid fa-search ${styles.searchIcon}`}></i>
                </div>

                <div className={styles.filterTypeContainer}>
                    <label htmlFor="filter-type" className={styles.filterlabel}>
                        تصفية حسب:
                    </label>
                    <select
                        id="filter-type"
                        value={filterType}
                        onChange={handleFilterTypeChange}
                        className={styles.filterSelect}
                    >
                        <option value="all">بدون تصفية</option>
                        <option value="genre">النوع الأدبي</option>
                        <option value="author">المؤلف</option>
                    </select>
                </div>

                {filterType !== "all" && (
                    <div className={styles.filterOptionsContainer}>
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className={styles.filterSelect}
                        >
                            {filterType === "genre"
                                ? genres.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre}
                                    </option>
                                ))
                                : authors.map((author) => (
                                    <option key={author} value={author}>
                                        {author}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}
            </div>

            <div className={styles.booksList}>
                {filteredBooks.length > 0 ? (
                    <>
                        {filteredBooks.map((book) => (
                            <BookCard 
                                key={book.id} 
                                book={book} 
                                onDelete={handleDeleteClick} 
                            />
                        ))}
                        <div
                            className={styles.addCard}
                            onClick={handleOpenModal}
                            role="button"
                            tabIndex={0}
                        >
                            <span>+</span>
                            <div className={styles.overlay}>
                                <p>أضف كتابك المميز</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className={styles.noResults}>لا توجد كتب مطابقة لبحثك</p>
                )}
            </div>

            <DeleteConfirmationModal
                open={deleteModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                bookTitle={bookToDelete?.title || ""}
            />

            {/* Add Book Modal */}
            <AddBookModal
                open={isModalOpen}
                handleClose={handleCloseModal}
                handleAddBook={handleAddBook}
            />
        </div>
    );
}