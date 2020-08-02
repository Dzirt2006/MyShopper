import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';


export default function Pool() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({ productName: '', quantity: 1 });
    const id = useParams().id;

    useEffect(() => {
        const getPool = async () => {
            await axios.get(`/api/pool/${id}`)
                .then(data => setProducts(data.data.products));
        }
        getPool();
    }, [])


    async function onClickHandler(event) {
        event.preventDefault();
        await axios.post(`/api/product/${id}`, product)
            .then(data => setProducts([...products, data.data]))
            .catch((error) => {
                alert(`${product.productName} is already in your Pool`) // this will log an empty object with an error property
            })
        setProduct({ productName: '', quantity: 0 });
    }

    function onChangeEv(event) {
        setProduct({ ...product, [event.target.name]: event.target.value });
    }





    return (
        <div>
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
            {products.length > 0 &&
                products.map(product => (
                    <div key={product.id}>{product.productName} qantity:{product.quantity} </div>
                ))}
        </div>
    )
}