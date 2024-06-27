import {
    START_FETCHING_PRODUCT,
    NEXT_PAGE,
    PREV_PAGE,
    SET_CATEGORY,
    SET_KEYWORD,
    SET_PAGE,
    SET_TAGS,
    ERROR_FETCHING_PRODUCT,
    TOGGLE_TAG,
    SUCCESS_FETCHING_PRODUCT
} from './constants.js';

const statusList = {
    idle: 'idle',
    success: 'success',
    error: 'error',
    process: 'process',
}

const initialState = {
    data: [],
    currentPage: 1,
    totalItems: 1,
    perPage: 6,
    keyword: '',
    category: '',
    tags: [],
    status: statusList.idle,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_PRODUCT:
            return {...state, status: statusList.process};
        case ERROR_FETCHING_PRODUCT:
            return {...state, status: statusList.error};
        case SUCCESS_FETCHING_PRODUCT:
            return {...state, status: statusList.success, data: action.data, totalItems: action.count};
        case SET_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_KEYWORD:
            return {...state, keyword: action.keyword, category: '', tags: []};
        case SET_CATEGORY:
            return {...state, currentPage: 1, tags: [], category: action.category, keyword: ''};
        case SET_TAGS:
            return {...state, tags: action.tags}
        case TOGGLE_TAG:
            if (!state.tags.includes(action.tag)) {
                return {...state, currentPage: 1, tags: [...state.tags, action.tag]};
            } else {
                return {...state, currentPage: 1, tags: state.tags.filter(tag => tag !== action.tag)}
            }
        case NEXT_PAGE:
            return {...state, currentPage: state.currentPage + 1}
        case PREV_PAGE:
            return {...state, currentPage: state.currentPage - 1}
        default:
            return state;
    }
}