import React from 'react';
import Gallery from "./Gallery";
import Paginator from "./Paginator";
import {useSelector} from "react-redux";


const Content = () => {
    const searchWord = useSelector(state => state.searchWord);

    return (
        <div className='container'>
            <Gallery/>
            {!searchWord &&
                <Paginator/>
            }
        </div>
    );
};

export default Content;