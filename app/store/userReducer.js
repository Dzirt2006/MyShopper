import axios from 'axios';

//action types
const GET_USER = 'GET_USER';
const CREATE_USER = 'CREATE_USER';//not in use, clear on deploy
const DELETE_POOL = 'DELETE_POOL';

//action creator
const getUser = user => ({
    type: GET_USER,
    user
})
const createUser = user => ({//not in use, clear on deploy
    type: GET_USER,
    name: user.name,
    pools: user.pools
})
const delPool = id => ({
    type: DELETE_POOL,
    id
})



//thunk
export const refUser = (pool_id) => async dispatch => {//not in use, clear on deploy
    const { data } = await axios.post(`/api/user/${pool_id}`)
    const action = createUser(data);
    dispatch(action);
}

export const newUser = () => async dispatch => {
    const { data } = await axios.get('/api/user/');
    const action = getUser(data);
    dispatch(action);
}


export const deletePool = (pool_id) => async dispatch => {
    await axios.delete(`/api/pool/${pool_id}`);
    const { data } = await axios.post('/api/user/');
    const action = createUser(data);
    dispatch(action);
    // const action = delPool(pool_id);
    // dispatch(action);
}

//initial state
const initialState = {
    name: '',
    imgUrl:'',
    pools: []
};

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return { ...state, name: action.user.userName, imgUrl: action.user.imgUrl, pools: action.user.pools };
        case CREATE_USER://not in use, clear on deploy
            return { ...state, name: action.name, pools: action.pools };
        case DELETE_POOL:
            let newListOfPools = state.pools.filter(pool => pool.id !== action.id)
            return { ...state, pools: newListOfPools };
        default:
            return state;
    }
};

export default reducer;