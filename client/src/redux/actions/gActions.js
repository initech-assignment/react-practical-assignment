export const SET_USERNAME = 'SET USERNAME'
export const SET_PAGE = 'SET PAGE';
export const SET_STATE = 'SET STATE';
export const ADD_LIKE = 'ADD LIKE';
export const DELETE_COMMENT = 'DELETE COMMENT'
export const SET_TOTAL_PAGES = 'SET TOTAL PAGES'
export const SET_TOTAL = 'SET TOTAL'
export const SET_SEARCH_WORD = 'SET SEARCH WORD'


export const setSearchWordAction = searchWord =>
    (
        {
            type: SET_SEARCH_WORD,
            payload: searchWord
        }
    )
export const setTotalPages = totalPages =>
    (
        {
            type: SET_TOTAL_PAGES,
            payload: totalPages
        }
    )
export const setTotalAction = total =>
    (
        {
            type: SET_TOTAL,
            payload: total
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