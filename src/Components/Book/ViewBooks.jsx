import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewBooks = () => {

    const navigate = useNavigate();

    const [dbdata, getDbdata] = useState([]);

    // Get Data fromDatabase
    useEffect(() => {
        axios.get('http://localhost:3001/book')
            .then((res) => {
                getDbdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Navigate user to view details of one book
    // We are sending the relevent details of the book with the BookObject
    // BookObject consist of { ID, Name }
    const ViewBook = (BookObject) => {
        navigate(`/book`, { state: BookObject });
    }

    // Navigate user to add new book
    const AddBook = (BookObject) => {
        navigate(`/addbook`);
    }


    return (
        <div className='view-books'>
            <div className='row'>
                <div className='col-sm'>
                    <h2>List Of Awailable Books</h2>
                </div>
                <div className='col-sm'>
                    <button className='add-btn' onClick={AddBook}> Add New Book</button>
                </div>
            </div>

            <table>
                {dbdata.map((dbdata, key) => {
                    return <tr className='data-table'>
                        {/* {dbdata.Name}
                        <button onClick={() => ViewBook({ ID: dbdata.ID, Name: dbdata.Name })}>View Book Data</button> */}
                        <td><button className='book-list-btn' onClick={() => ViewBook({ ID: dbdata.ID, Name: dbdata.Name })}> {dbdata.Name} </button> </td>
                    </tr>
                })}
            </table>
        </div>
    );
};

export default ViewBooks;