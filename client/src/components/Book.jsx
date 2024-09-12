import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/book.css"

function Book() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3009/books')
            .then(res => {
                if (res.data.success) {
                    setBooks(res.data.books);
                } else {
                    console.log("Failed to fetch books:", res.data.message);
                }
            })
            .catch(err => console.log("Error:", err));
    }, []);

    const handleDelete = async(id) => {
        console.log("Deleting book with ID:", id); 
        await axios.delete(`http://localhost:3009/deletebook/${id}`)
            .then(res => {
                if (res.data.success) {
                    setBooks(oldBooks => oldBooks.filter(book => book._id !== id)); // Use _id to filter out the deleted book
                } else {
                    console.log("Failed to delete book:", res.data.message);
                }
            })
            .catch(err => console.log("Error deleting book:", err));
    };
    
    return (
        <div className='book-page'>
            <h2>Books Available</h2>
            <div className='book-container'>
                {books.map((book) => (
                    <div className='book-card' key={book._id}> {/* Use the book._id as the key */}
                        <h3>{book.title}</h3>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Price:</strong> {book.price}</p>
                        {book.buylink && (
                            <a href={book.buylink} target="_blank" rel="noopener noreferrer" className='buy-link'>
                                Buy Now
                            </a>
                        )}
                        <button className='delete-btn' onClick={() => handleDelete(book._id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Book;
