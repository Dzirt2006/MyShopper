import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
//bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function NewPool(props) {
    const history = useHistory();
    const [name, setName] = useState(null);


    async function onClickHandler(event) {
        event.preventDefault();
        await axios.post('/api/pool/', { poolName: name })
            .then(pool => {
                history.push(`/pool/${pool.data.id}`)
            });

    }

    function onChangeEv(event) {
        setName(event.target.value);
    }

    return (
        <center>
        <Container>
            <Form onSubmit={onClickHandler}>
                <Row>
                    <Col xs={9}>
                        <Form.Group controlId="formBasic">
                            <Form.Control type="text" name="name" onChange={onChangeEv}
                            />
                            <Form.Text className="text-muted">
                                Type you pool hame here.
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