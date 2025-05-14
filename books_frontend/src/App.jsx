import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import BookDetailPage from './pages/BookDetailPage.jsx';
import './App.css'
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AddBookPage from './pages/AddBookPage.jsx';
import EditBookPage from './pages/EditBookPage.jsx';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path='/books/:id' element={<BookDetailPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/add' element={<AddBookPage/>}/>
      <Route path='/edit/:id' element={<EditBookPage/>}/>
    </Routes>
  )
}

export default App
