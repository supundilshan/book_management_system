import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBooks = () => {
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

    const ViewBook = () => {

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
            {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {dbdata.map((dbdata, key) => {
                        return <tr className='data-table'>
                            <td>{dbdata.Name}</td>
                            <td> <button onClick={() => deleteData(dbdata.ID)}>Delete</button> </td>
                            <td> <button onClick={() => updateData(dbdata.ID)}>Update</button> </td>
                        </tr>
                    })}
                </tbody>
            </table> */}
        </div>
    );
};

export default ViewBooks;