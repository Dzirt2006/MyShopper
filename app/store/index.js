import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
// import loggerMiddleware from "redux-logger";
import userReducer from './userReducer';
import poolReducer from './poolReducer';

const mainReducer = combineReducers({
    user: userReducer,
    pool: poolReducer,
})

const store = createStore(
    mainReducer,
    applyMiddleware(thunkMiddleware)
  );
  
  export default store;