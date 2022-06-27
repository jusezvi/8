import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./context/GlobalState";
import { BsPencil } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import Axios from "axios";
import styles from "./styles/BookList/BookList.module.css";
import Button from "./styles/UI/Button/Button.module.css";

const BookList = () => {
    const { books, removeBook } = useContext(GlobalContext);

    const removeHandler = (id) => {
        removeBook(id);
        Axios.delete(`http://localhost:3004/delete/${id}`);
    };

    return (
        <table className={styles["content-table"]}>
            <thead>
                <tr>
                    <th className={styles.title}>Knygos pavadinimas</th>
                    <th className={styles.author}>Autorius</th>
                    <th className={styles.category}>Kategorija</th>
                    <th className={styles.price}>??</th>
                    <th className={styles.price}>Statusas</th>
                </tr>
            </thead>
            {books.length > 0 && (
                <tbody>
                    {books.map((book) => {
                        return (
                            <tr key={book._id}>
                                <td>{book.bookName}</td>
                                <td>{book.bookAuthor}</td>
                                <td>{book.bookCategory}</td>
                                <td>{book.bookPrice}</td>
                                <td>
                                    <div className="actions">
                                        <Link
                                            to={`/edit/${book._id}`}
                                            id={styles.link}
                                            className={styles.link}
                                        >
                                            <BsPencil />
                                            Edit
                                        </Link>
                                        <Button
                                            onClick={() =>
                                                removeHandler(book._id)
                                            }
                                            className={styles.button}
                                        >
                                            <MdDeleteForever />
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            )}
        </table>
    );
};

export default BookList;
