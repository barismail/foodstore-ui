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
import {getProducts} from '../../api/product.js';
import debounce from 'debounce-promise';

const debounceFetchProducts = debounce(getProducts, 1000);

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        dispatch(startFetchingProducts());

        const perPage = getState().products.perPage || 9;
        const currentPage = getState().products.currentPage || 1;
        const tags = getState().products.tags || [];
        const keyword = getState().products.keyword || '';
        const category = getState().products.category || '';

        const params = {
            limit: perPage,
            skip: (currentPage * perPage) - perPage,
            q: keyword,
            tags,
            category,
        }

        try {
            const {data: {data, count}} = await debounceFetchProducts(params);
            dispatch(successFetchingProducts({data, count}));
        } catch (err) {
            dispatch(errorFetchingProducts())
        }
    }
}

export const goToPrevPage = () => {
    return {
        type: PREV_PAGE,
    }
}

export const goToNextPage = () => {
    return {
        type: NEXT_PAGE,
    }
}

export const toggleTag = (tag) => {
    return {
        type: TOGGLE_TAG,
        tag,
    }
}

export const clearTags = () => {
    return setTags([]);
}

export const setTags = (tags) => {
    return {
        type: SET_TAGS,
        tags,
    }
}

export const setCategory = (category) => {
    return {
        type: SET_CATEGORY,
        category,
    }
}

export const setKeyword = (keyword) => {
    return {
        type: SET_KEYWORD,
        keyword,
    }
}

export const setPage = (number = 1) => {
    return {
        type: SET_PAGE,
        currentPage: number,
    }
}

export const startFetchingProducts = () => {
    return {
        type: START_FETCHING_PRODUCT,
    }
}

export const successFetchingProducts = ({data, count}) => {
    return {
        type: SUCCESS_FETCHING_PRODUCT,
        data,
        count,
    }
}

export const errorFetchingProducts = () => {
    return {
        type: ERROR_FETCHING_PRODUCT,
    }
}