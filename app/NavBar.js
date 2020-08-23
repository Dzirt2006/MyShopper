import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
//bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
//


function NavBar(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    function onClickLogout(event) {
        event.preventDefault();
    }

    function onClickHome() {
        history.push('/home')
    }

    if (props.user.name) {
        return (
            <Container>
                <br />
                <Row>
                    <Col> <Button variant="success" onClick={onClickHome}>Home</Button> </Col>
                    <Col className="float-right">
                        <Container>
                            <Row>
                                <Button variant="danger" onClick={onClickLogout}>logout</Button>
                                <img src={props.user.imgUrl} width="50" height="50" />
                            </Row>
                        </Container>
                    </Col>

                </Row>
            </Container>
        )
    } else {
        return (
            <center>your commercial here</center>
        )
    }
}




const mapState = state => {
    return {
        user: state.user,
    };
};





export default connect(mapState, null)(NavBar);