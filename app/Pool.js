import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { installPool, newProduct, changeBoughtStatus } from './store/poolReducer';
//bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
//
import ShareBar from './SharingBar';
import io from 'socket.io-client'
const socket = io()


// socket.on('connect', () => {
//     console.log('Connected!')
//     console.log('joined to ')
// })


function Pool(props) {
    const [product, setProduct] = useState({ productName: '', quantity: 1 });
    const id = useParams().id;
    const dispatch = useDispatch();
    onClickHandler = onClickHandler.bind(product)


    useEffect(() => {
        dispatch(installPool(id));
        socket.emit('subscribe', id);

        socket.on('product_added', function () {
            dispatch(installPool(id));
            // console.log("product added");
        });

        socket.on('status_changed', function () {
            dispatch(installPool(id));
            // console.log("status_changed");
        });

    }, [socket])


    async function onClickHandler(event) {
        event.preventDefault();
        await dispatch(newProduct(id, product));
        socket.emit('product_added', id);
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
        socket.emit('status_changed',id)//this will cause status_change event on server->server emit status_changed on client->this emit will dispatch set pool and rerender
    }

    return (
        <div>
            <ShareBar id={id} className="float-right" />
            <br />
            <br />
            <Container>
                <Form onSubmit={onClickHandler}>
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <Form.Group controlId="formBasic">
                                    <Form.Control type="text" name="productName" value={product.productName} onChange={onChangeEv}
                                    />
                                    <Form.Text className="text-muted">
                                        Type you product there.
                     </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Control as="select" name="quantity" value={product.quantity} onChange={onChangeEv} >
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
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Button variant="success" type="submit">AddProduct</Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                <br />
                {!!props.products &&
                    <ListGroup variant="flush">
                        {props.products.map(product => (
                            <ListGroup.Item key={product.id}>
                                <Form>
                                    <Row>
                                        <Col xs={8}>{product.productName}</Col>
                                        <Col> quantity: {product.quantity}</Col>
                                        <Col >
                                            <label className="customcheck">
                                                <input id={product.id} className="float-right checkbox" type="checkbox" name="boughtStatus" checked={product.status} onChange={statusChangeHandler} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </Col>
                                    </Row>
                                </Form>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>}
            </Container>
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