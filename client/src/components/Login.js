import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setUserNameAction} from "../redux/actions/gActions";

const Login = () => {
    const [userName, setName] = useState();
    const dispatch = useDispatch();


    return (
        <div>
            <div><input placeholder={"Username"} onChange={e => setName(e.target.value)} /></div>
            <div><button onClick={() => dispatch(setUserNameAction(userName))}>Login</button></div>
        </div>
    );
};

export default Login;