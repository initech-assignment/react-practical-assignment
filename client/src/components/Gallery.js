import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {MAIN_URL} from "../utils/constants";
import {setTotalAction, setTotalPages} from "../redux/actions/gActions";
import Post from "./Post";



const Gallery = () => {
    const pageNumber = useSelector(state => state.pageNumber);
    const [pageData, setPageData] = useState();
    const userName = useSelector(state => state.userName);
    const total = useSelector(state => state.total);
    const searchWord = useSelector(state => state.searchWord);
    const dispatch = useDispatch();


    useEffect(() => {

        if (searchWord) {
            fetch(`${MAIN_URL}/post/search/${searchWord}/`)
                .then(response => response.json())
                .then(data => {

                    setPageData(prevState => ({...prevState, result: data.result}))
                })
        } else {
            fetch(`${MAIN_URL}/post/page/${pageNumber}`)
                .then(response => response.json())
                .then(data => {

                    dispatch(setTotalPages(data.totalPages))
                    dispatch(setTotalAction(data.total))
                    setPageData(data);

                })
                .catch((e) => {
                    console.log(e);
                })
        }


    }, [pageNumber, userName, total, searchWord]);

    if (pageData) {

        return (

                <div className='container'>
                    <div className='row'>
                        {pageData.result.map((post, index) => <div key={index} className='col-lg-4 col-md-6 col-sm-12'>
                            <Post key={index}
                                  post={post} setPageData={setPageData}/>
                        </div>)}

                    </div>
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