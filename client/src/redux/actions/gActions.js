export const SET_USERNAME = 'SET USERNAME'
export const SET_PAGE = 'SET PAGE';
export const SET_STATE = 'SET STATE';
export const SET_POSTS = 'SET POSTS';
export const SET_TOTAL_PAGES = 'SET TOTAL PAGES';
export const SET_PAGE_DATA = 'SET PAGE DATA';
export const ADD_LIKE = 'ADD LIKE';

export const addLikeAction = likeData =>
    (
        {
            type: ADD_LIKE,
            payload: likeData
        }
    )

export const setPageDataAction = pageData =>
    (
        {
            type: SET_PAGE_DATA,
            payload: pageData
        }
    )

export const setTotalPagesAction = totalPages =>
    (
        {
            type: SET_TOTAL_PAGES,
            payload: totalPages
        }
    )

export const setPostsAction = posts =>
    (
        {
            type: SET_POSTS,
            payload: posts
        }
    )


export const setUserNameAction = userName =>
    (
        {
            type: SET_USERNAME,
            payload: userName
        }
    )
export const setPageAction = pageNumber =>
    (
        {
            type: SET_PAGE,
            payload: pageNumber
        }
    )
export const setStateAction = gState =>
    (
        {
            type: SET_STATE,
            payload: gState
        }
    )