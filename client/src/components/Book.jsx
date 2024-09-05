import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/book.css"

function Book() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3008/books')
            .then(res => {
                if (res.data.success) {
                    setBooks(res.data.books);
                } else {
                    console.log("Failed to fetch books:", res.data.message);
                }
            })
            .catch(err => console.log("Error:", err));
    }, []);

    return (
        <div className='book-page'>
            <h2>Books Available</h2>
            <div className='book-container'>
                {books.map((book, index) => (
                    <div className='book-card' key={index}>
                        <h3>{book.title}</h3>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Price:</strong> {book.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Book;
