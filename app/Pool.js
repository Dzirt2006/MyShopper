import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';


export default function Pool() {
    const [products, setProducts] = useState(null);
    const [product, setProduct] = useState({ productName: '', quantity: 0 });
    const id = useParams().id;

    useEffect(() => {
        const getPool = async () => {
            await axios.get(`/api/pool/${id}`)
                .then(data => setProducts(data.data));
        }
        getPool();
    }, [])


    async function onClickHandler(event) {
        event.preventDefault();
        await axios.post(`/api/product/${id}`,product)
        setProduct({ productName: '', quantity: 0 });
    }

    function onChangeEv(event) {
        setProduct({...product, [event.target.name]: event.target.value });
    }

    console.log('name', product);

    return (
        <form onSubmit={onClickHandler}>
            <input type="text" id="name" name="productName"
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
    )
}