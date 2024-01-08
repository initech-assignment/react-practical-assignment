import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setStateAction} from "../redux/actions/gActions";

const Header = () => {
    const userName = useSelector(state => state.userName);
    const dispatch = useDispatch();
    return (
        <div className='container mb-3'>
            <div className='row'>
                <h1 className='col-10'>User: {userName}</h1>
                <button className='btn btn-secondary btn-sm float-end col-2 col-sm'
                        onClick={() => dispatch(setStateAction(0))}>Logout
                </button>
            </div>
        </div>

    );
};

export default Header;