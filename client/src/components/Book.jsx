import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/book.css";

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

    const handleDelete = async (id) => {
        console.log("Deleting book with ID:", id);
        await axios.delete(`http://localhost:3009/deletebook/${id}`)
            .then(res => {
                if (res.data.success) {
                    setBooks(oldBooks => oldBooks.filter(book => book._id !== id));
                } else {
                    console.log("Failed to delete book:", res.data.message);
                }
            })
            .catch(err => console.log("Error deleting book:", err));
    };

    const handleUpdate = async (id, updatedBook) => {
        try {
            const response = await axios.put(`http://localhost:3009/edit/${id}`, updatedBook);
            if (response.data.success) {
                setBooks(books.map(book => (book._id === id ? response.data.updatedBook : book)));
            } else {
                console.log("Failed to update book:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    const toggleEditMode = (id) => {
        setBooks(books.map(book => 
            book._id === id ? { ...book, isEditing: !book.isEditing } : book
        ));
    };

    return (
        <div className='book-page'>
            <h2>Books Available</h2>
            <div className='book-container'>
                {books.map((book) => (
                    <div className='book-card' key={book._id}>
                        {book.isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    placeholder='Enter new title'
                                    value={book.title}
                                    onChange={(e) => {
                                        const updatedBook = { ...book, title: e.target.value };
                                        setBooks(books.map(b => (b._id === book._id ? updatedBook : b)));
                                    }}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder='Enter new author'
                                    value={book.author}
                                    onChange={(e) => {
                                        const updatedBook = { ...book, author: e.target.value };
                                        setBooks(books.map(b => (b._id === book._id ? updatedBook : b)));
                                    }}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder='Enter new price'
                                    value={book.price}
                                    onChange={(e) => {
                                        const updatedBook = { ...book, price: e.target.value };
                                        setBooks(books.map(b => (b._id === book._id ? updatedBook : b)));
                                    }}
                                    required
                                />
                                <input
                                    type="url"
                                    placeholder='Enter new link'
                                    value={book.buylink}
                                    onChange={(e) => {
                                        const updatedBook = { ...book, buylink: e.target.value };
                                        setBooks(books.map(b => (b._id === book._id ? updatedBook : b)));
                                    }}
                                />
                                <button onClick={() => {
                                    handleUpdate(book._id, { title: book.title, author: book.author, price: book.price, buylink: book.buylink });
                                    toggleEditMode(book._id);
                                }}>Update</button>
                                <button onClick={() => toggleEditMode(book._id)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{book.title}</h3>
                                <p><strong>Author:</strong> {book.author}</p>
                                <p><strong>Price:</strong> {book.price}</p>
                                {book.buylink && (
                                    <a href={book.buylink} target="_blank" rel="noopener noreferrer" className='buy-link'>
                                        Buy Now
                                    </a>
                                )}
                                <button className='delete-btn' onClick={() => handleDelete(book._id)}>Delete</button>
                                <button className='edit-btn' onClick={() => toggleEditMode(book._id)}>Edit</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Book;
