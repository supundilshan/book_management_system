import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ViewAuthorDetails = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [dbdata, getDbdata] = useState([]);

    // Get Data fromDatabase
    useEffect(() => {
        // Get the details of that particuler book
        axios.get(`http://localhost:3001/author/${location.state.ID}`)
            .then((res) => {
                getDbdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h2>list of {location.state.Author}'s Books</h2>
            <table>
                <thead>
                    <th> Name </th>
                    <th> ISBN </th>
                </thead>
                <tbody>
                    {dbdata.map((dbdata, key) => {
                        return <tr>
                            <td>{dbdata.Name}</td>
                            <td>{dbdata.ISBN}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAuthorDetails;