import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setUserNameAction} from "../redux/actions/gActions";

const Login = () => {
    const [userName, setName] = useState();
    const dispatch = useDispatch();


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ marginBottom: '10px' }}>
                <input className='form-control-sm'
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: '5px', fontSize: '16px', width: '200px' }}
                />
            </div>
            <div>
                <button className='btn btn-primary'
                    onClick={() => dispatch(setUserNameAction(userName))}
                    style={{ padding: '10px', fontSize: '18px', cursor: 'pointer' }}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;