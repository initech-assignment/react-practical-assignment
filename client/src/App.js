import './App.css';
import {useSelector} from "react-redux";
import Login from "./components/Login";
import MainPage from "./components/MainPage";

function App() {

    const gState = useSelector(state => state.gState)

    switch (gState) {
        case 0:
            return <Login/>
        case 1:
            return <MainPage/>
        default:
            return <Login/>
    }
}

export default App;
