import React, { useState, useContext, useReducer, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from "./styles/AddNewBook/AddNewBook.module.css";
import { GiCancel } from "react-icons/gi";
import Button from "./styles/UI/Button/Button.module.css";
import BookFormField from "./UI/BookFormField";
import SelectCategory from "./UI/SelectCategory";

const AddBook = () => {
    const { addBook } = useContext(GlobalContext);
    const history = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);

    const [bookTitle, dispatchBookTitle] = useReducer(
        (state, action) => {
            if(action.type === "BOOK_INPUT"){
                return {value: action.val, isValid: action.val.length > 5}
            }
            
            return {value: "", isValid: false}
        },
        {value: "", isValid: null}
    )

   
    const [bookAuthor, dispatchBookAuthor] = useReducer(
        (state, action) => {
            if(action.type === "BOOK_INPUT"){
                return {value: action.val, isValid: action.val.length > 5}
            }

            return {value: "", isValid: false}
        },
        {value: "", isValid: null}
    )

    
    const [bookPrice, dispatchBookPrice] = useReducer(
        (state, action) => {
            if(action.type === "BOOK_INPUT"){
                return {value: action.val, isValid: action.val.length >= 1}
            }

            return {value: "", isValid: false}
        },
        {value: "", isValid: null}
    )

    
    const [bookCategory, dispatchBookCategory] = useReducer(
        (state, action) => {
            if(action.type === 'BOOK_INPUT'){
                return {value: action.val, isValid: action.val !== ''}
            }

            return {value: '', invalid: false}
        },
        {value: '', isValid: false}
    )

    const { isValid: bookTitleIsValid} = bookTitle;
    const { isValid: bookAuthorIsValid} = bookAuthor;
    const { isValid: bookPriceIsValid} = bookPrice;
    const { isValid: bookCategoryIsValid} = bookCategory;

   
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFormValid(
                bookTitleIsValid &&
                bookAuthorIsValid &&
                bookPriceIsValid &&
                bookCategoryIsValid !== false
            );
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [bookTitleIsValid, bookAuthorIsValid, bookPriceIsValid, bookCategoryIsValid]);


    const onSubmit = function (e) {
        e.preventDefault()
        if(isFormValid !== true) return

        const newBook = {
            bookName: bookTitle.value,
            bookAuthor: bookAuthor.value,
            bookPrice: bookPrice.value,
            bookCategory: bookCategory.value,
        };

        Axios.post("http://localhost:8080/insert", {
            bookName: bookTitle.value,
            bookPrice: bookPrice.value,
            bookAuthor: bookAuthor.value,
            bookCategory: bookCategory.value,
        });
        addBook(newBook);
        history.push("/");
    };

    const onBookTitleChange = function (e) {
        dispatchBookTitle({type: "BOOK_INPUT", val: e.target.value} )
    };

    const onAuthorChange = function (e) {
        dispatchBookAuthor({type: 'BOOK_INPUT', val: e.target.value});
    };

    const onPriceChange = function (e) {
        dispatchBookPrice({type: "BOOK_INPUT", val: e.target.value})
        
    };

    const onCategoryChange = function (e) {
        dispatchBookCategory({type: "BOOK_INPUT", val: e.target.value});
    };

    return (
        <form onSubmit={onSubmit} className={`${styles.form}`}>
            <BookFormField
                label="Book Title"
                value={bookTitle.value}
                type="text"
                placeholder="enter book title"
                onChange={onBookTitleChange}
                className={`${bookTitle.isValid === false ? styles.invalid : ''}`}
            />

            <BookFormField
                label="Author"
                value={bookAuthor.value}
                type="text"
                placeholder="enter book Author"
                onChange={onAuthorChange}
                className={`${bookAuthor.isValid === false ? styles.invalid : ''}`}
            />

            <BookFormField
                label="Price"
                value={bookPrice.value}
                type="number"
                placeholder="enter book price"
                onChange={onPriceChange}
                className={`${bookPrice.isValid === false ? styles.invalid : ''}`}
            />

            <SelectCategory onChange={onCategoryChange}/>

            <div className={styles.buttons}>
                <Button type="submit" className={`${isFormValid ? styles.submit : styles.disabled}`}>
                    Submit
                </Button>
                <Link to="/" className={styles.link}>
                    <GiCancel /> Cancel
                </Link>
            </div>
        </form>
    );
};

export default AddBook;
