import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css';

function Navbar() {
    const navigate = useNavigate();

   
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        
        localStorage.removeItem('user');
        
       
        navigate('/login');
    };

    return (
        <nav className='navbar'>
            <div className='left'>
                <Link to="/" className='college'>The Reading Nook</Link>
            </div>
            <div className='right'>
                
                
                
                {user ? (
                    <>  
                        <Link to="/books" className="nav-link">BuyBook</Link> 
                        <Link to="/adds" className="nav-link">AddBook</Link>
                        <button onClick={handleLogout} className="nav-link btn-logout">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="nav-link">Signup</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                    </>
                )}
            </div>
        </nav>   
    );
}

export default Navbar;
