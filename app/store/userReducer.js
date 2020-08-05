import axios from 'axios';

//action types
const GET_USER = 'GET_USER';
const CREATE_USER = 'CREATE_USER';


//action creator
const getUser = user => ({
    type: GET_USER,
    name: user.name,
    pools: user.pools
})
const createUser = user => ({
    type: GET_USER,
    name: user.name
})


//thunk
export const fetchUser = () => async dispatch => {
    const { data } = await axios.get('/api/user/');
    const action = getUser(data);
    dispatch(action);
}
export const newUser = () => async dispatch => {
    const { data } = await axios.post('/api/user/');
    const action = createUser(data);
    dispatch(action);
}

//initial state
const initialState = {
    name: '',
    pools: []
};

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return { ...state, name: action.name, pools: action.pools };
        case CREATE_USER:
            return { ...state, name: action.name};
        default:
            return state;
    }
};

export default reducer;