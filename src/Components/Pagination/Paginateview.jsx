import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Box, List, Tag, ListItem, Divider } from "@chakra-ui/core";
import { Pagination } from "@material-ui/lab";
import usePagination from "./Pagination/Pagination";
// import { default as data } from "./MOCK_DATA.json";

const Paginateview = () => {
    const navigate = useNavigate();
    const [dbdata, getDbdata] = useState([]);

    // Get Data fromDatabase
    useEffect(() => {
        axios.get('http://localhost:3001/pagibooks')
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

    let [page, setPage] = useState(1);
    const PER_PAGE = 4;

    const count = Math.ceil(10 / PER_PAGE);
    const _DATA = usePagination(dbdata, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <div>
            <h2>Book List</h2>
            <Box p="5">
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                />

                <List p="10" pt="3" spacing={2}>
                    {_DATA.currentData().map(v => {
                        return (
                            <ListItem key={v.id} listStyleType="disc">
                                <span>{v.sku}</span>{" "}
                                <Divider display="inline" orientation="vertical" />
                                <span> {v.category_type}</span>{" "}
                                <Divider display="inline" orientation="vertical" />
                                <span>
                                    <Tag color="#0f4211">${v.msrp}</Tag>
                                </span>
                            </ListItem>
                        );
                    })}
                </List>

                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                />
            </Box>

        </div>
    );
};

export default Paginateview;