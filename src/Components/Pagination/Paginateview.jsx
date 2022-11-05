import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Paginateview = () => {
    const [postsPerPage] = useState(2);
    const [offset, setOffset] = useState(1);
    const [posts, setAllPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0)

    const getPostData = (data) => {
        return (
            data.map(post => <tr className="container" key={post.id}>
                <td>User ID: {post.ID}</td>
                <td>Title: {post.Name}</td>
            </tr>)
        )

    }

    // Get Data fromDatabase
    useEffect(() => {
        axios.get('http://localhost:3001/book')
            .then((res) => {

                const data = res.data;
                const slice = data.slice(offset - 1, offset - 1 + postsPerPage)

                // For displaying Data
                const postData = getPostData(slice)

                // Using Hooks to set value
                setAllPosts(postData)
                setPageCount(Math.ceil(data.length / postsPerPage))
            })
            .catch((err) => {
                console.log(err);
            });
    }, [offset]);

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setOffset(selectedPage + 1)
    };


    return (
        <div>

            {/* Display all the posts */}
            {posts}

            {/* Using React Paginate */}
            <ReactPaginate
                previousLabel={"previous"}
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

export default Paginateview;