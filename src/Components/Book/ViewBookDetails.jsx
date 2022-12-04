import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


const ViewBookDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [dbdata, getDbdata] = useState([]);

    // Get Data from Database
    useEffect(() => {
        // Get the details of that particuler book using ID
        axios.get(`http://localhost:3001/book/${location.state.ID}`)
            .then((res) => {
                getDbdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const DeleteBook = (id) => {
        axios.delete(`http://localhost:3001/book/${id}`)
            .then((res) => {
                getDbdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Navigate user to update existig book
    // We are sending the relevent details of the book with the BookObject
    // Book object consist of { ID, Name, ISBN, Author }
    const UpdateBook = (BookObject) => {
        navigate(`/updatebook`, { state: BookObject });
    }

    return (
        <div>
            <h2>{location.state.Name}</h2>
            <table>
                <thead>
                    <th> Name </th>
                    <th> ISBN </th>
                    <th> Author </th>
                    <th> Update </th>
                    <th> Delete </th>
                </thead>
                <tbody>
                    {dbdata.map((dbdata, key) => {
                        return <tr>
                            <td>{dbdata.Name}</td>
                            <td>{dbdata.ISBN}</td>
                            <td>{dbdata.Author}</td>
                            <td><button onClick={() => UpdateBook({ ID: dbdata.ID, Name: dbdata.Name, ISBN: dbdata.ISBN, Author: dbdata.Author })}>Update</button> </td>
                            <td><button onClick={() => DeleteBook(dbdata.ID)}>Delete</button> </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ViewBookDetails;