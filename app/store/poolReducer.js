import axios from 'axios';

//action types
const SET_POOL = 'SET_POOL';
const ADD_PRODUCT = 'ADD_PRODUCT';
const CLEAN_POOL='CLEAN_POON';

//action creator
const setPool = pool => ({
    type: SET_POOL,
    products: pool.products
})
const addProduct = product => ({
    type: ADD_PRODUCT,
    product
})
const cleanFromPool=()=>({
    type:CLEAN_POOL
})



//thunk
export const installPool = (id,history) => async dispatch => {
    console.log(id)
    const { data } = await axios.get(`/api/pool/${id}`)
    .catch((error)=>{
        alert(`Sorry, but you have no access to this pool or pool has beed deleted.`);
        history.push('/');
    })
    const action = setPool(data);
    dispatch(action);
}
export const newProduct = (id, product) => async dispatch => {
    const { data } = await axios.post(`/api/product/${id}`, product)
        .catch((error) => {
            alert(`${product.productName} is already in your Pool`) // this will log an empty object with an error property
        })
    const action = addProduct(data);
    dispatch(action);
}
export const changeBoughtStatus = (prdctId, product) => async dispatch => {
    await axios.put(`api/product/${prdctId}`, product);
    //don't need to dispatch because socket broadcast will dispatch SET_POOL
}
export const cleanPool=()=>dispatch=>{
    const action=cleanFromPool();
    dispatch(action);
}

//initial state
const initialState = [];

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POOL:
            return action.products;
        case ADD_PRODUCT:
            return [...state, action.product];
            case CLEAN_POOL:
                return initialState;
        default:
            return state;
    }
};

export default reducer;