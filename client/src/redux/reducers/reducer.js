import {
    ADD_LIKE, DELETE_COMMENT,
    SET_PAGE,
    SET_SEARCH_WORD,
    SET_STATE, SET_TOTAL, SET_TOTAL_PAGES,
    SET_USERNAME
} from "../actions/gActions";


export const reducer = (state, action) => {
    switch (action.type) {
        case SET_USERNAME:
            if(action.payload){
                return {...state, userName: action.payload, gState: 1}
            }

            return {...state, gState: 0}

        case SET_PAGE:
            return {...state, pageNumber: action.payload};

        case SET_STATE:

            return {...state, gState: action.payload};


        case ADD_LIKE:

            const temp = {...state};
            temp.pageData.result[action.payload.currentPostIndex].likes = action.payload.likes;
            temp.pageData.result[action.payload.currentPostIndex].dislikes = action.payload.dislikes;

            return {...state, pageData: temp.pageData};

        case DELETE_COMMENT:
            const comments = state.pageData.result.filter(item => item.id === action.payload.result.postId)[0]
                .comments.filter(item=>item !==action.payload.result.id)
            return {...state.pageData.result[action.payload.result.postId], comments: comments}

        case SET_TOTAL_PAGES:

            return {...state, totalPages: action.payload}

        case SET_TOTAL:

            return {...state, total: action.payload}

        case SET_SEARCH_WORD:

            return {...state, searchWord: action.payload}

        default:
            return state;

    }
}

