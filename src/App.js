import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './Components/NavBar';

import AddBook from './Components/Book/AddBook';
import ViewBooks from './Components/Book/ViewBooks';
import ViewBookDetails from './Components/Book/ViewBookDetails';
import UpdateBook from './Components/Book/UpdateBook';

import AddAuthor from './Components/Author/AddAuthor';
import ViewAuthors from './Components/Author/ViewAuthors';
import ViewAuthorDetails from './Components/Author/ViewAuthorDetails';
import UpdateAuthor from './Components/Author/UpdateAuthor';
import { Pagination } from '@mui/material';
import Paginateview from './Components/Pagination/Paginateview';

function App() {
    return (
        <div className="App">
            {/* <Paginateview /> */}

            <NavBar />
            <div className='App-body'>
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
        </div>
    );
}

export default App;
