import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {MAIN_URL} from "../utils/constants";
import {setPageDataAction, setPostsAction, setTotalPagesAction} from "../redux/actions/gActions";
import Post from "./Post";


const Gallery = () => {
    const pageNumber = useSelector(state => state.pageNumber);
    const pageData = useSelector(state => state.pageData);
    const dispatch = useDispatch();

    useEffect(() => {

        fetch(`${MAIN_URL}/post/page/${pageNumber}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)

                dispatch(setPostsAction(data.result));
                dispatch(setTotalPagesAction(data.totalPages));
                dispatch(setPageDataAction(data));

            })
            .catch(() => {
                dispatch(setPostsAction(null));
            })


    }, [pageNumber]);

    if (pageData) {
        return (
            <div style={{ display: 'flex' , flexWrap: 'wrap' }}>
                {pageData.result.map(post => <div style={{ flex: '0 0 33.33%' }}><Post key={post.id} id={post.id}/></div>)}
            </div>

        );
    } else {
        return (
            <div>
                <p>Posts not found</p>
            </div>
        )

    }


};

export default Gallery;