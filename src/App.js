import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewBooks from './Components/ViewBooks';
import ViewAuthors from './Components/ViewAuthors';
import AddBook from './Components/AddBook';
import AddAuthor from './Components/AddAuthor';
import ViewBookDetails from './Components/ViewBookDetails';
import ViewAuthorDetails from './Components/ViewAuthorDetails';
import UpdateBook from './Components/UpdateBook';
import UpdateAuthor from './Components/UpdateAuthor';
import NavBar from './Components/NavBar';
import Paginateview from './Components/Paginateview';

function App() {
  return (
    <div className="App">
      <NavBar />

      <BrowserRouter>
        <Routes>
          {/* Show relevent details about books and authors */}
          <Route path='/' element={<ViewBooks />} />
          <Route path='/authors' element={<ViewAuthors />} />

          {/* Show all details about books and authors after user click*/}
          <Route path='/book' element={<ViewBookDetails />} />
          <Route path='/author' element={<ViewAuthorDetails />} />

          {/* Add book and author detail */}
          <Route path='/addbook' element={<AddBook />} />
          <Route path='/addauthor' element={<AddAuthor />} />

          {/* Update Book and Author details */}
          <Route path='/updatebook' element={<UpdateBook />} />
          <Route path='/updateauthor' element={<UpdateAuthor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
