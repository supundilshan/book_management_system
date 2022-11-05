import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewAuthors = () => {

    const navigate = useNavigate();
    const [dbdata, getDbdata] = useState([]);

    // Get Data fromDatabase
    useEffect(() => {
        axios.get('http://localhost:3001/authors')
            .then((res) => {
                getDbdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const ViewAuthor = (BookObject) => {
        navigate(`/author`, { state: BookObject });
    }

    const UpdateAuthor = (BookObject) => {
        navigate(`/updateauthor`, { state: BookObject });
    }

    return (
        <div>
            <h2>Book List</h2>
            <table>
                <thead>
                    <th>First Name</th>
                    <th>Last Name</th>
                </thead>
                <tbody>
                    {dbdata.map((dbdata, key) => {
                        return <tr className='data-table'>
                            <td> {dbdata.First_Name} </td>
                            <td> {dbdata.Last_Name}</td>
                            <td> <button onClick={() => ViewAuthor({ ID: dbdata.ID, Author: dbdata.Full_Name })}> Books By author </button></td>
                            <td> <button onClick={() => UpdateAuthor({ ID: dbdata.ID, First_name: dbdata.First_Name, Last_Name: dbdata.Last_Name })}> Update Author </button></td>
                        </tr>
                    })}
                </tbody>

            </table>
        </div>
    );
};

export default ViewAuthors;