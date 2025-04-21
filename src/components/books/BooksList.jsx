// BooksList.jsx
import { useState } from "react";
import styles from "./BooksList.module.css";
import books from "../../utils/data";
import BookCard from "./BookCard";

export default function BooksList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all"); // all, genre, author
    const [selectedFilter, setSelectedFilter] = useState("الكل");

    const genres = ["الكل", ...new Set(books.map((book) => book.genre))];
    const authors = ["الكل", ...new Set(books.map((book) => book.author))];

    const filteredBooks = books.filter((book) => {
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
        const newFilterType = e.target.value;
        setFilterType(newFilterType);
        setSelectedFilter("الكل");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <i className="fa-solid fa-book"></i> كتب مميزة{" "}
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
                        تصفية حسب:{" "}
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
                            <BookCard key={book.id} book={book} />
                        ))}
                        <div
                            className={`${styles.addCard}`}
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
        </div>
    );
}
