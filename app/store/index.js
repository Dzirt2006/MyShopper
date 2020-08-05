import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";
import userReducer from './userReducer';
import poolReducer from './poolReducer';
import productReducer from './productReducer';

const mainReducer = combineReducers({
    user: userReducer,
    pool: poolReducer,
    product: productReducer
})

const store = createStore(
    mainReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
  
  export default store;