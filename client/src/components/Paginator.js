import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import {useDispatch, useSelector} from "react-redux";
import {setPageAction} from "../redux/actions/gActions";

const Paginator = () => {
    const totalPages = useSelector(state => state.totalPages);
    const pageNumber = useSelector(state => state.pageNumber);
    const dispatch = useDispatch();
    const paginatorItems = [];

    for(let i = 1; i<=totalPages; i++){
        paginatorItems.push(
            <Pagination.Item key={i} active={i === pageNumber} onClick={() => setPage(i)}>
                {i}
            </Pagination.Item>
        )
    }

    const setPage = (page) =>{
        dispatch(setPageAction(page));
    }



    return (
        <div className="d-flex justify-content-center">
            <Pagination>
                <Pagination.First disabled={pageNumber === 1} onClick={() => setPage(1)}/>
                <Pagination.Prev disabled={pageNumber === 1} onClick={() => setPage(pageNumber - 1)} />
                {paginatorItems}
                <Pagination.Next disabled={pageNumber === totalPages} onClick={() => setPage(pageNumber + 1)} />
                <Pagination.Last disabled={pageNumber === totalPages} onClick={() => setPage(totalPages)} />
            </Pagination>
        </div>
    );
};

export default Paginator;