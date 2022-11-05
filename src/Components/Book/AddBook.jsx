import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [name, setName] = useState("");
    const [isbn, setISBN] = useState("");
    const [author, setAuthor] = useState("");

    const navigate = useNavigate();

    const insertData = (e) => {
        e.preventDefault();
        // Create an object with the data
        const object = { Name: name, ISBN: isbn, Author: author }
        // Send Object to the Back end
        axios.post('http://localhost:3001/book', object)
            .then(() => {
                console.log("Object send to Server");
            })
            .catch((err) => { console.log(err) });

        // After inserting data avigate user to home page
        navigate(`/`);
    }

    return (
        <div>
            <h2>Insert Book</h2>

            <form onSubmit={insertData}>
                <div>
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
                </div>

                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;