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

    const ViewBook = (BookObject) => {
        navigate(`/book`, { state: BookObject });
    }

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {dbdata.map((dbdata, key) => {
                    return <li className='data-table'>
                        {/* {dbdata.Name}
                        <button onClick={() => ViewBook({ ID: dbdata.ID, Name: dbdata.Name })}>View Book Data</button> */}
                        <button onClick={() => ViewBook({ ID: dbdata.ID, Name: dbdata.Name })}> {dbdata.Name} </button>
                    </li>
                })}
            </ul>
        </div>
    );
};

export default ViewBooks;