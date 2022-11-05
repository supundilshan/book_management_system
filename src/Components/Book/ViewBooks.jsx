import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const ViewBooks = () => {

    const [pageNo, setPageNo] = useState(1);
    const [pageCount, setPageCount] = useState(0)
    const [dbdata, setDbdata] = useState([]);

    const navigate = useNavigate();

    // Get Data fromDatabase
    useEffect(() => {
        axios.get(`http://localhost:3001/book?page=${pageNo}`)
            .then((res) => {

                const data = res.data;
                setDbdata(data)

                // Set Page count
                // setPageCount(Math.ceil(data.length / postsPerPage))
                setPageCount(5)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [pageNo]);

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

    // Handle pagination clicks
    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setPageNo(selectedPage + 1)
    };


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
                <thead>
                    <th>Book Name</th>
                    <th>View Details</th>
                </thead>
                <tbody>
                    {dbdata.map((dbdata, key) => {
                        return <tr className='data-table'>
                            <td> {dbdata.Name} </td>
                            <td> <button onClick={() => ViewBook({ ID: dbdata.ID, Name: dbdata.Name })}>View Details</button> </td>
                        </tr>
                    })}
                </tbody>
            </table>

            {/* Using React Paginate */}
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />

        </div>
    );
};

export default ViewBooks;