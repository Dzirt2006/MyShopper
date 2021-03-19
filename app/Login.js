import React, { useEffect } from 'react';
import { useParams } from 'react-router';
//bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//

export default function GoogleAuth() {
    const uuid = useParams().id;

    useEffect(() => {
        if (uuid) {
            localStorage.setItem('uuid', uuid)
        }
    })

    return (
        <div>
            <br />
            <center><h3>Welcome!</h3></center>
            <br />
            <br />
            <Form method='get' action='/auth/'>
                <center><Button variant="success" type="submit">Login with Google</Button> </center>
            </Form>
            <br />
            <br />
            <Container fluid="md">
                <Form>
                    <Row>
                        <Col>*TEXT*</Col>
                    </Row>
                </Form>
            </Container>

        </div>
    )

}

