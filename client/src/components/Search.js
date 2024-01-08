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
    const handleClearSearch = () =>{
        const searchInput = document.getElementById('searchInput');
        searchInput.value = null;
        dispatch(setSearchWordAction(null));
        setSearchWord('');
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-2 float-start'><AddPost/></div>
                <input id='searchInput' className='col-5' placeholder='Search' type='text' onKeyDown={handleKeyDown}
                       onChange={e => setSearchWord(e.target.value)}/>
                {searchWord &&
                <div className='col-1'>
                <button style={{fontSize: '20px'}} onClick={handleClearSearch}>X</button>
                </div>
                }


            </div>
        </div>
    );
};

export default Search;