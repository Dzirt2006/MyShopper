import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { EmailShareButton, EmailIcon } from "react-share";
import { installPool, newProduct } from './store/poolReducer';
import io from 'socket.io-client'
const socket = io(window.location.origin)


function Pool(props) {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({ productName: '', quantity: 1 });
    const id = useParams().id;
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(installPool(id)); 
        socket.emit('subscribe', id);  
    }, [])


    async function onClickHandler(event) {
        event.preventDefault();
        dispatch(newProduct(id, product));
        socket.emit('message',product);
        setProduct({ productName: '' });
    }

    function onChangeEv(event) {
        setProduct({ ...product, [event.target.name]: event.target.value });
    }



    socket.on('connect', () => {
        console.log('Connected!')
        
        console.log('joined to ',id)
    })

    
 
    socket.on('message', function(data) {
   console.log('Incoming message:', data);
});


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