import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { VKShareButton, VKIcon } from "react-share";
import { installPool, newProduct } from './store/poolReducer';

function Pool(props) {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({ productName: '', quantity: 1 });
    const id = useParams().id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(installPool(id));
    }, [])


    async function onClickHandler(event) {
        event.preventDefault();
        dispatch(newProduct(id, product));
        setProduct({ productName: '', quantity: 0 });
    }

    function onChangeEv(event) {
        setProduct({ ...product, [event.target.name]: event.target.value });
        console.log(product)
    }



    console.log(props.products[0])

    return (
        <div>
            <VKShareButton
                className="network__share-button"
                url={'http://localhost:8000'}
                title={'title'}
            >
                <VKIcon size={32} />
            </VKShareButton>
            <form onSubmit={onClickHandler}>
                <input type="text" id="name" name="productName" value={product.productName}
                    onChange={onChangeEv} />
                <select id="prod_qa" name="quantity" onChange={onChangeEv}  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <input type="submit" value="AddProduct" />
            </form>
            <br />
            {!!props.products &&
                props.products.map(product => (
                    <div key={product.id}>{product.productName} qantity:{product.quantity} </div>
                ))}
        </div>
    )
}

const mapState = state => {
    console.log('state', state.pool)
    return {
        products: state.pool,
    };
};

export default connect(
    mapState, null
)(Pool);