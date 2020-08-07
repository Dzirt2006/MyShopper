import axios from 'axios';

//action types
const SET_POOL = 'SET_POOL';//not in use, clear on deploy
const ADD_PRODUCT='ADD_PRODUCT';


//action creator
const setPool = pool => ({//not in use, clear on deploy
    type: SET_POOL,
    products: pool.products
})
const addProduct=product=>({
    type:ADD_PRODUCT,
    product
})


//thunk
export const installPool = (id) => async dispatch => {//not in use, clear on deploy
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