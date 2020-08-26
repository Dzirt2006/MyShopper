import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { installPool, newProduct, changeBoughtStatus, deleteProductFromPool } from './store/poolReducer';
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


function Pool(props) {
    const [product, setProduct] = useState({ productName: '', quantity: 1 });
    const id = useParams().id;
    const dispatch = useDispatch();
    const history = useHistory();
    onClickHandler = onClickHandler.bind(product)


    useEffect(() => {
        socket.removeAllListeners()
        dispatch(installPool(id, history));
        socket.emit('unsubscribe');
        socket.emit('subscribe', id);

        socket.on('product_added', function () {
            dispatch(installPool(id));
        });

        socket.on('product_deleted', function () {
            dispatch(installPool(id));
        })

        socket.on('status_changed', function () {
            console.log(id)
            dispatch(installPool(id));
        });

    }, [socket])


    async function onClickHandler(event) {
        event.preventDefault();
        await dispatch(newProduct(id, product));
        socket.emit('product_added', id);
        setProduct({ productName: '', quantity: 1 });
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
        socket.emit('status_changed', id)//this will cause status_change event on server->server emit status_changed on client->this emit will dispatch set pool and rerender
    }

    async function onClickDelete(event) {
        event.preventDefault();
        await dispatch(deleteProductFromPool(event.target.id));
        socket.emit('product_deleted')
    }

    return (
        <div>
            <ShareBar id={id} className="float-right" />
            <br />
            <br />
            <Container>
                <Form onSubmit={onClickHandler} >
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <Form.Group controlId="formBasic">
                                    <Form.Control type="text" name="productName" 
                                    value={product.productName} onChange={onChangeEv} autoComplete="off"
                                    />
                                    <Form.Text className="text-muted">
                                        Type you product here
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Control type="number" name="quantity" min="1"
                                        value={product.quantity}
                                        onChange={onChangeEv} >
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
                                    <Row xs={1} md={1} lg={1}>
                                        <Col xs={8} style={product.status ?{textDecoration: 'line-through'}:null}>{product.productName}</Col>
                                        <Col> quantity: {product.quantity}</Col>
                                        <Col >
                                            <label className="customcheck">
                                                <input id={product.id} className="float-right checkbox" type="checkbox" name="boughtStatus" 
                                                checked={product.status} onChange={statusChangeHandler} 
                                                
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                        </Col>
                                        <Col><Button variant="danger" id={product.id} onClick={onClickDelete}>X</Button></Col>
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