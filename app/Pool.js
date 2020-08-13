import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { EmailShareButton, EmailIcon } from "react-share";
import { installPool, newProduct, changeBoughtStatus } from './store/poolReducer';
import io from 'socket.io-client'
const socket = io()



socket.on('connect', () => {
    console.log('Connected!')
    console.log('joined to ')
})



// socket.on('product_added', function() {
// console.log("product added");
// });

function Pool(props) {
    const [product, setProduct] = useState({ productName: '', quantity: 1 });
    const id = useParams().id;
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(installPool(id));
        console.log('action')
        socket.emit('subscribe', id);

        socket.on('product_added', function () {
            dispatch(installPool(id));
            console.log("product added");
        });

        socket.on('status_changed', function () {
            dispatch(installPool(id));
            console.log("status_changed");
        });

        //    ()=>{socket.removeAllListeners()}
    }, [socket])


    async function onClickHandler(event) {
        event.preventDefault();
        await dispatch(newProduct(id, product));
        socket.emit('product_added', product);
        setProduct({ productName: '' });
    }

    function onChangeEv(event) {
        setProduct({ ...product, [event.target.name]: event.target.value });
    }

    async function statusChangeHandler(event) {
        event.preventDefault();
        const idProduct = parseInt(event.target.id)
        const productJSON = props.products.filter(product => product.id === idProduct)[0];
        await dispatch(changeBoughtStatus(idProduct,
            {
                id: productJSON.id,
                poolId: productJSON.poolId,
                productName: productJSON.productName,
                quantity: productJSON.quantity,
                status: !productJSON.status
            }))
        socket.emit('status_changed')//this will cause status_change event on server->server emit status_changed on client->this emit will dispatch set pool and rerender
    }

    return (
        <div>
            <EmailShareButton
                className="network__share-button"
                url={`http://localhost:8000/${id}`}
                title={'Let\'s connect to my shopping pool!'}
            >
                <EmailIcon size={32} />
            </EmailShareButton>
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
                    <form key={product.id} >
                        {product.productName}    qantity:{product.quantity}
                        <input id={product.id} type="checkbox" name="boughtStatus" checked={product.status} onChange={statusChangeHandler} />
                    </form>
                ))}
        </div>
    )
}

const mapState = state => {
    return {
        products: state.pool,
    };
};

export default connect(
    mapState, null
)(Pool);