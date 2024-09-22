import React from 'react';
import '../css/home.css';

function Home() {
    return (
        <div>
            <div className='hero'>
                <div className='hero-quote'>
                    <p>"Today a reader, tomorrow a leader"</p>
                </div>
                <div className='hero-content'>
                    <h1 className='hero-text'>The Reading Nook</h1>
                    <p className='hero-description'>
                        Welcome to The Reading Nook! Discover your next favorite read with our curated selection of books. Browse by genre, author, or new releases and find your perfect escape.
                    </p>
                </div>
                <div className='hero-img'></div>
            </div>

            {/* Footer Section */}
            <footer className='footer'>
                <p>© {new Date().getFullYear()} Chitransh. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
