
import {createStore} from "redux";
import {reducer} from "./reducers/reducer";

let initialState = {pageNumber: 1, totalPages: 1, gState: 0, userName: null, posts: [], pageData: null};

export const store = createStore(reducer,initialState);
