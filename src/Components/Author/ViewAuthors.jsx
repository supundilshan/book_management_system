import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

const ViewAuthors = () => {

    const [postsPerPage] = useState(5);
    const [offset, setOffset] = useState(1);
    const [pageCount, setPageCount] = useState(0)
    const [dbdata, setDbdata] = useState([]);

    const navigate = useNavigate();

    // Get Data fromDatabase
    useEffect(() => {
        axios.get('http://localhost:3001/author')
            .then((res) => {
                const data = res.data;

                // Slice Data for Display
                const slice = data.slice(offset - 1, offset - 1 + postsPerPage)
                setDbdata(slice)

                // Set Page count
                setPageCount(Math.ceil(data.length / postsPerPage))
            })
            .catch((err) => {
                console.log(err);
            });
    }, [offset]);

    // Navigate user to view details of one author
    // We are sending the relevent details of the book with the AuthorObject
    // AuthorObject consist of { ID, Name }
    const ViewAuthor = (AuthorObject) => {
        navigate(`/author`, { state: AuthorObject });
    }

    // Navigate user to update existing author
    // We are sending the relevent details of the author with the AuthorObject
    // AuthorObject consist of { ID, First_name, Last_Name}
    const UpdateAuthor = (AuthorObject) => {
        navigate(`/updateauthor`, { state: AuthorObject });
    }

    // Navigate user to add new author
    const AddAuthor = () => {
        navigate(`/addauthor`);
    }

    // Handle pagination clicks
    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setOffset(selectedPage + 1)
    };

    return (
        <div>
            <div className='row'>
                <div className='col-sm'>
                    <h2>List Of Authors</h2>
                </div>
                <div className='col-sm'>
                    <button className='add-btn' onClick={AddAuthor}> Add Author </button>
                </div>
            </div>

            <table>
                <thead>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Show Books</th>
                    <th>Update Author</th>
                    {/* <th colSpan={2}></th> */}
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

            {/* Using React Paginate */}
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
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

export default ViewAuthors;