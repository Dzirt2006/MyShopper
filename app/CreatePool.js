import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { createPool } from './store/poolReducer';
//bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
//

function NewPool() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState(null);


    async function onClickHandler(event) {
        event.preventDefault();
        dispatch(createPool(name, result => {
            history.push(`/pool/${result.data.id}`)
        }))
    }

    function onChangeEv(event) {
        setName(event.target.value);
    }

    return (
        <center>
            <Container>
                <Form onSubmit={onClickHandler} >
                    <Row>
                        <Col xs={9}>
                            <Form.Group controlId="formBasic">
                                <Form.Control type="text" name="name"
                                    onChange={onChangeEv} autoComplete="off"
                                />
                                <Form.Text className="text-muted">
                                    Type you pool name here
                            </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col xs={3}>
                            <Button variant="success" type="submit">Add Pool</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </center>
    )
}


export default NewPool;