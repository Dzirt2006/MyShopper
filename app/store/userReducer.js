import axios from 'axios';

//action types
const GET_USER = 'GET_USER';
const DELETE_POOL = 'DELETE_POOL';

//action creator
const getUser = user => ({
    type: GET_USER,
    user
})


//thunk
export const newUser = () => async dispatch => {
    const { data } = await axios.get('/api/user/');
    const action = getUser(data);
    dispatch(action);
}
export const deletePool = (pool_id) => async dispatch => {
    await axios.delete(`/api/pool/${pool_id}`);
    const { data } = await axios.get('/api/user/');
    const action = getUser(data);
    dispatch(action);
}
export const refUser = (pool_id) => async dispatch => {//not in use, clear on deploy
    const { data } = await axios.post(`/api/user/${pool_id}`);
    const action = getUser(data);
    dispatch(action);
}

//initial state
const initialState = {
    name: '',
    imgUrl: '',
    pools: []
};

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return { ...state, name: action.user.userName, imgUrl: action.user.imgUrl, pools: action.user.pools };
        case DELETE_POOL:
            let newListOfPools = state.pools.filter(pool => pool.id !== action.id)
            return { ...state, pools: newListOfPools };
        default:
            return state;
    }
};

export default reducer;