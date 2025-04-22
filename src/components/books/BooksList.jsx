import { useState, useEffect } from "react";
import styles from "./BooksList.module.css";
import books from "../../utils/data";
import BookCard from "./BookCard";
import AddBookModal from "./AddBookModal";
import DeleteConfirmationModal from "../deleteModal/DeleteConfirmation";
import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder, Delete } from "@mui/icons-material";

export default function BooksList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [selectedFilter, setSelectedFilter] = useState("الكل");
    const [showFavorites, setShowFavorites] = useState(false);
    const [booksList, setBooksList] = useState(() => {
        return books.map((book) => ({ ...book, isFavorite: false }));
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    useEffect(() => {
        const savedBooks = localStorage.getItem("booksData");
        if (savedBooks) {
            setBooksList(JSON.parse(savedBooks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("booksData", JSON.stringify(booksList));
    }, [booksList]);

    const genres = ["الكل", ...new Set(booksList.map((book) => book.genre))];
    const authors = ["الكل", ...new Set(booksList.map((book) => book.author))];

    const filteredBooks = booksList.filter((book) => {
        const matchesSearch =
            searchTerm === "" ||
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesFilter = true;
        if (filterType === "genre" && selectedFilter !== "الكل") {
            matchesFilter = book.genre === selectedFilter;
        } else if (filterType === "author" && selectedFilter !== "الكل") {
            matchesFilter = book.author === selectedFilter;
        }

        const matchesFavorite = !showFavorites || book.isFavorite;

        return matchesSearch && matchesFilter && matchesFavorite;
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
        const book = booksList.find((b) => b.id === bookId);
        setBookToDelete(book);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setBooksList(booksList.filter((book) => book.id !== bookToDelete.id));
        setDeleteModalOpen(false);
        setBookToDelete(null);
    };

    const handleCancelDelete = () => {
        setDeleteModalOpen(false);
        setBookToDelete(null);
    };

    const handleAddBook = (newBook) => {
        const newId =
            booksList.length > 0
                ? Math.max(...booksList.map((book) => book.id)) + 1
                : 1;

        setBooksList([...booksList, { ...newBook, id: newId, isFavorite: false }]);
        handleCloseModal();
    };

    const handleToggleFavorite = (bookId) => {
        setBooksList(
            booksList.map((book) =>
                book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book
            )
        );
    };

    return (
        <div className={styles.container} id="books">
            <h1 className={styles.title}>
            📖 كتب مميزة
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
                    <Tooltip title="تصفية الكتب" arrow>
                        <label htmlFor="filter-type" className={styles.filterlabel}>
                            <i className="fa-solid fa-filter"></i>
                        </label>
                    </Tooltip>
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
                <Tooltip
                    title={showFavorites ? "إظهار جميع الكتب" : "إظهار الكتب المفضلة فقط"}
                    arrow
                >
                    <button
                        className={`${styles.favoriteToggle} ${showFavorites ? styles.active : ""
                            }`}
                        onClick={() => setShowFavorites(!showFavorites)}
                    >
                        {showFavorites ? (
                            <Favorite color="error" fontSize="small" />
                        ) : (
                            <FavoriteBorder fontSize="small" sx={{ borderRadius: "50%" }} />
                        )}
                    </button>
                </Tooltip>
            </div>

            <div className={styles.booksList}>
                {filteredBooks.length > 0 ? (
                    <>
                        {filteredBooks.map((book) => (
                            <div key={book.id} className={styles.bookCardContainer}>
                                <BookCard book={book} />
                                <div className={styles.cardButtons}>
                                    <IconButton
                                        className={`${styles.actionButton} ${styles.favoriteButton
                                            } ${book.isFavorite ? styles.favorited : ""}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleFavorite(book.id);
                                        }}
                                    >
                                        {book.isFavorite ? (
                                            <Favorite fontSize="small" />
                                        ) : (
                                            <FavoriteBorder fontSize="small" />
                                        )}
                                    </IconButton>
                                    <IconButton
                                        className={`${styles.actionButton} ${styles.deleteButton}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteClick(book.id);
                                        }}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </div>
                            </div>
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

            <AddBookModal
                open={isModalOpen}
                handleClose={handleCloseModal}
                handleAddBook={handleAddBook}
            />
        </div>
    );
}
