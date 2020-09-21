import axios from 'axios';
import { useCallback } from 'react';

//action types
const SET_POOL = 'SET_POOL';
const ADD_PRODUCT = 'ADD_PRODUCT';
const CLEAN_POOL = 'CLEAN_POON';

//action creator
const setPool = pool => ({
    type: SET_POOL,
    products: pool.products,
    poolName: pool.poolName
})
const addProduct = product => ({
    type: ADD_PRODUCT,
    product
})
const cleanFromPool = () => ({
    type: CLEAN_POOL
})


//thunk
export const installPool = (id, history) => async dispatch => {
    const { data } = await axios.get(`/api/pool/${id}`)
        .catch(() => {
            alert(`Sorry, but you have no access to this pool or pool has beed deleted.`);
            history.push('/');
        })
    console.log(data)
    const action = setPool(data);
    dispatch(action);
}


/**now will be the magic!
 * @param poolNameInput - name of the Pool
 * @param callback - function where will be pased data from db
 */
export const createPool = (poolNameInput, callback) => async dispatch => {
    if (!poolNameInput) {
        alert(`Please enter valid pool name.`);
        return;
    }
    const pool = { poolName: poolNameInput.toUpperCase().replace(/[^\w\s]/gi, '').trim() }
    return await axios.post('/api/pool/', pool)
        .then(res => callback(res)).catch(() => {
            alert(`You already have Pool with name:${pool.poolName}`) // this will log an empty object with an error property
        });
}

export const newProduct = (poolId, product) => async dispatch => {
    if (!product.productName || product.productName.length < 2) {
        alert(`Please enter valid product name.`);
        return;
    }
    const newProduct = {
        productName: product.productName.toLowerCase().replace(/[^\w\s]/gi, '').trim(),
        quantity: product.quantity
    }
    const { data } = await axios.post(`/api/product/${poolId}`, newProduct)
        .catch(() => {
            alert(`${product.productName} is already in your Pool`) // this will log an empty object with an error property
        })
    const action = addProduct(data);
    dispatch(action);
}

export const changeBoughtStatus = (prdctId, product) => async dispatch => {
    await axios.put(`api/product/${prdctId}`, product);
    //don't need to dispatch because socket broadcast will dispatch SET_POOL
}

export const cleanPool = () => dispatch => {
    const action = cleanFromPool();
    dispatch(action);
}

export const deleteProductFromPool = (prdctId) => async dispatch => {
    await axios.delete(`api/product/${prdctId}`);
    //don't need to dispatch because socket broadcast will dispatch SET_POOL
}

//initial state
const initialState = { poolName: '', products: [] };

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POOL:
            return { poolName: action.poolName, products: action.products };
        case ADD_PRODUCT:
            return { poolName: state.poolName, products: [...state.products, action.product] };
        case CLEAN_POOL:
            return initialState;
        default:
            return state;
    }
};

export default reducer;