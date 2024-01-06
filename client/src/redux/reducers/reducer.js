import {
    ADD_LIKE,
    SET_PAGE,
    SET_PAGE_DATA,
    SET_POSTS,
    SET_STATE,
    SET_TOTAL_PAGES,
    SET_USERNAME
} from "../actions/gActions";


export const reducer = (state, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return {...state, userName: action.payload, gState: 1}

        case SET_PAGE:
            return {...state, pageNumber: action.payload};

        case SET_STATE:

            return {...state, gState: action.payload};

        case SET_POSTS:

            return {...state, posts: action.payload};

        case SET_TOTAL_PAGES:

            return {...state, totalPages: action.payload};

        case SET_PAGE_DATA:

            return {...state, pageData: action.payload}

        case ADD_LIKE:

            const temp = {...state};
            temp.pageData.result[action.payload.currentPostIndex].likes = action.payload.likes;
            temp.pageData.result[action.payload.currentPostIndex].dislikes = action.payload.dislikes;

            return {...state, pageData: temp.pageData};

        default:
            return state;

    }
}

