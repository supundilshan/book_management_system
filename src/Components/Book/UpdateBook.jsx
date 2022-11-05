import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateBook = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Receive book details 
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
        // After updating data navigate user to home page
        navigate(`/`);
    };

    return (
        <div>
            <h2>Update {location.state.Name} </h2>

            <form onSubmit={UpdateBook}>
                <table>
                    <thead>
                        <th>Name</th>
                        <th>ISBN</th>
                        <th>Author</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" value={name} onChange={(event) => { setName(event.target.value) }} /></td>
                            <td><input type="text" value={isbn} onChange={(event) => { setISBN(event.target.value) }} /></td>
                            <td><input type="text" value={author} onChange={(event) => { setAuthor(event.target.value) }} /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Update</button>
            </form>

        </div>
    );
};

export default UpdateBook;