import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewBooks = () => {
    const navigate = useNavigate();
    const [dbdata, getDbdata] = useState([]);

    // Get Data fromDatabase
    useEffect(() => {
        axios.get('http://localhost:3001/books')
            .then((res) => {
                getDbdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const ViewBook = (ID) => {
        navigate(`/book`, { state: { id: ID } });
    }

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {dbdata.map((dbdata, key) => {
                    return <li className='data-table'>
                        {dbdata.Name}
                        <button onClick={() => ViewBook(dbdata.ID)}>View Book Data</button>
                    </li>
                })}
            </ul>
        </div>
    );
};

export default ViewBooks;