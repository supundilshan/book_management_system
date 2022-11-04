import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateBook = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState(location.state.Name);
    const [isbn, setISBN] = useState(location.state.ISBN);
    const [author, setAuthor] = useState(location.state.Author);

    const UpdateBook = (e) => {
        e.preventDefault();
        const object = { Name: name, ISBN: isbn, Author: author }
        axios.put(`http://localhost:3001/book/${location.state.ID}`, object)
            .then(() => {
                console.log("Value Updated");
            })
            .catch((err) => { console.log(err) });
        // Redirect to home page
        navigate(`/`);
    };

    return (
        <div>
            <h1>Update {location.state.Name} </h1>
            <p></p>
            <form onSubmit={UpdateBook}>
                <table>
                    <thead>
                        <th>Name</th>
                        <th>ISBN</th>
                        <th>Author</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" value={name} onChange={(event) => { setName(event.target.value) }} /></td>
                            <td><input type="text" value={isbn} onChange={(event) => { setISBN(event.target.value) }} /></td>
                            <td><input type="text" value={author} onChange={(event) => { setAuthor(event.target.value) }} /></td>
                            <td><button type="submit">Update</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>

        </div>
    );
};

export default UpdateBook;