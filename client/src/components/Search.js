import React, {useState} from 'react';
import AddPost from "./AddPost";
import {useDispatch} from "react-redux";
import {setSearchWordAction} from "../redux/actions/gActions";

const Search = () => {

    const [searchWord, setSearchWord] = useState();
    const dispatch = useDispatch();

    const handleEnterKeyPress = () => {
        dispatch(setSearchWordAction(searchWord));
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEnterKeyPress();
        }
    }

    const handleOnChange = (event) =>
    {
        if(event.target.value){
            setSearchWord(event.target.value)
        }else{
            dispatch(setSearchWordAction(null));
        }
    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-1'></div>
                <div className='col-2'><AddPost/></div>
                <input id='searchInput' className='col-5 form-control-sm' placeholder='Search' type='search' onKeyDown={handleKeyDown}
                       onChange={handleOnChange}/>

            </div>
        </div>
    );
};

export default Search;