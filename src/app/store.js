import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from '../features/Auth/reducer.js';
import productReducer from '../features/Products/reducer.js';
import cartReducer from '../features/Cart/reducer.js';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,

});
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export {store};