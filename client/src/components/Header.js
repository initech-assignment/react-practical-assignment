import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setPageAction, setStateAction} from "../redux/actions/gActions";

const Header = () => {
    const userName = useSelector(state => state.userName);
    const dispatch = useDispatch();
    return (
        <div className="container">
            <h1>{userName}</h1>
            <button onClick={() =>dispatch(setStateAction(0))}>Logout</button>

        </div>

    );
};

export default Header;