import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


const ViewBookDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [dbdata, getDbdata] = useState([]);

    // Get Data fromDatabase
    useEffect(() => {
        // Get the details of that particuler book
        axios.get(`http://localhost:3001/book/${location.state.ID}`)
            .then((res) => {
                getDbdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const UpdateBook = (BookObject) => {
        console.log(BookObject)
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
                </thead>
                <tbody>
                    {dbdata.map((dbdata, key) => {
                        return <tr>
                            <td>{dbdata.Name}</td>
                            <td>{dbdata.ISBN}</td>
                            <td>{dbdata.Author}</td>
                            <td><button onClick={() => UpdateBook({ ID: dbdata.ID, Name: dbdata.Name, ISBN: dbdata.ISBN, Author: dbdata.Author })}>Update Book Data</button> </td>
                        </tr>
                    })}
                </tbody>

            </table>
        </div>
    );
};

export default ViewBookDetails;