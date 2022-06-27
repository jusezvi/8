import React, { createContext, useReducer, useEffect } from 'react';
import Axios from "axios";
import {AppReducer} from './AppReducer';


const initialState = {
    books: []
}


export const GlobalContext = createContext(initialState);


export const GlobalProvider = (({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
        useEffect(() => {
            Axios.get("http://localhost:8080/read").then((response) => {
                dispatch({type: 'INITIAL_DATA', payload: response.data})
            });
        }, []);

  
    const removeBook = (id) => {
        dispatch({
            type: 'REMOVE_BOOK',
            payload: id
        })

    }

    const addBook = (book) => {
        dispatch({
            type: 'ADD_BOOK',
            payload: book
        })

        setTimeout(() => {
            Axios.get("http://localhost:3004/read").then((response) => {
                dispatch({type: 'INITIAL_DATA', payload: response.data})
            });  
        },500)
    }

    const editBook = (book) => {
        dispatch({
            type: 'EDIT_BOOK',
            payload: book,
        })
    }
     
    return(
        <GlobalContext.Provider value={{
            books: state.books,
            removeBook,
            addBook,
            editBook,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}) ;