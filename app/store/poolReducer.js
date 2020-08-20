import axios from 'axios';

//action types
const SET_POOL = 'SET_POOL';
const ADD_PRODUCT='ADD_PRODUCT';


//action creator
const setPool = pool => ({
    type: SET_POOL,
    products: pool.products
})
const addProduct=product=>({
    type:ADD_PRODUCT,
    product
})


//thunk
export const installPool = (id) => async dispatch => {
    const { data } = await axios.get(`/api/pool/${id}`);
    const action = setPool(data);
    dispatch(action);
}
export const newProduct = (id,product) => async dispatch => {
    const { data } =  await axios.post(`/api/product/${id}`, product)
            .catch((error) => {
                alert(`${product.productName} is already in your Pool`) // this will log an empty object with an error property
            })
    const action = addProduct(data);
    dispatch(action);
}
export const changeBoughtStatus = (prdctId,product) => async dispatch =>{
    await axios.put(`api/product/${prdctId}`,product);
    //don't need to dispatch because socket broadcast will dispatch SET_POOL
}

//initial state
const initialState = [];

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POOL:
            return action.products;
        case ADD_PRODUCT:
                return [...state,action.product];
        default:
            return state;
    }
};

export default reducer;