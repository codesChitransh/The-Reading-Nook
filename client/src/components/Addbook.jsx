import React, { useState } from 'react';
import axios from 'axios';
import { Navigate,useNavigate } from 'react-router-dom';
import "../css/Addbook.css"


function AddBook(){
    
    const[title,setTitle]=useState('');
    const[author,setAuthor]=useState('');
    const[price,setPrice]=useState('')
    const Navigate=useNavigate();

    const handleSubmit=()=>{
    axios.post('http://localhost:3008/add',{title,author,price})
    .then(res=>{
        if(res.data.success){
            console.log("successfully added",res.data.book)
            Navigate('/')
            
        }
        else{
            console.log("adding failed",res.data.message)
        }
    })
    .catch(err=>console.log("Error:",err));
    }   

    return(
        <div className='Add-page'>
            <div className='Add-container'>
                <h2>ADD BOOk</h2><br/>
                <div className='Form-grp'>
                    <label htmlFor="title">Title</label>
                    <input
                    type="text"
                    id="title"
                    placeholder='Title'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    /><br/>
                     <label htmlFor="author">Author:</label>
                    <input
                    type="text"
                    id="author"
                    placeholder='Author'
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                    /><br/>
                     <label htmlFor="price">Price:</label>
                    <input
                    type="number"
                    id="price"
                    placeholder='Price'
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    /><br/>

                </div>
                <button className='btn-add' onClick={handleSubmit}>Add</button>
            </div>
        </div>
    )


}
export default AddBook;