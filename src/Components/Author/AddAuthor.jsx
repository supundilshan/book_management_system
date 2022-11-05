import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAuthor = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const navigate = useNavigate();

    const insertData = (e) => {
        e.preventDefault();
        // Create an object with the data
        const object = { First_Name: fname, Last_Name: lname }
        // Send Object to the Back end
        axios.post('http://localhost:3001/author', object)
            .then(() => {
                console.log("Object send to Server");
            })
            .catch((err) => { console.log(err) });

        //  After inserting data navigate user to authorspage
        navigate(`/authors`);
    }

    return (
        <div>
            <h2>Insert Author</h2>

            <form onSubmit={insertData}>
                <div>
                    <table>
                        <thead>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" value={fname} onChange={(event) => { setFname(event.target.value) }} /></td>
                                <td><input type="text" value={lname} onChange={(event) => { setLname(event.target.value) }} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button type="submit">Add Author</button>
            </form>
        </div>
    );
};

export default AddAuthor;