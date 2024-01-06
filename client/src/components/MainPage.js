import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {MAIN_URL} from "../utils/constants";
import Header from "./Header";
import Search from "./Search";
import Content from "./Content";

const MainPage = () => {

    return (
        <div className="container">
            <Header/>
            <Search/>
            <Content/>

        </div>
    );
};

export default MainPage;