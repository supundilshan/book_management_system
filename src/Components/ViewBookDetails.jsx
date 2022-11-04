import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const ViewBookDetails = (props) => {
    const location = useLocation();

    const [dbdata, getDbdata] = useState([]);

    // Get Data fromDatabase
    useEffect(() => {
        // The Id of particuler Book
        const id = location.state.id

        // Get the details of that particuler book
        axios.get(`http://localhost:3001/book/${id}`)
            .then((res) => {
                getDbdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const UpdateBook = () => {

    }

    return (
        <div>
            <h2>Book List</h2>
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
                            <td><button onClick={() => UpdateBook(dbdata.ID)}>Update Book Data</button> </td>
                        </tr>
                    })}
                </tbody>

            </table>
        </div>
    );
};

export default ViewBookDetails;