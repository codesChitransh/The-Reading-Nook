
import{BrowserRouter,Routes,Route}from 'react-router-dom'
import Home from './components/home'
import Navbar from './components/navbar';
import Book from './components/Book';
import Login from './components/Login';
import Signup from './components/Signup';
import AddBook from './components/Addbook';



function App() {
 
  
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/"element={<Home/>}></Route>
      <Route path="/books"element={<Book/>}></Route>
      <Route path="/login"element={<Login/>}></Route>
      <Route path='/signup'element={<Signup/>}></Route>
      <Route path="/adds"element={<AddBook/>}></Route>
      
      
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
