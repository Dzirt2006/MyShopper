import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { logout } from './store/userReducer';
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
        dispatch(logout());
        history.push('/')
    }

    function onClickHome() {
        history.push('/home')
    }

    if (props.user.name) {
        return (
            <Container>
                <br />
                <Row>
                    <Col xs={9}> <Button variant="info" onClick={onClickHome}>Home</Button> </Col>
                    <Col className="float-right" xs={3}>
                        <Container>
                            <Row>
                                <Col><Button variant="danger" onClick={onClickLogout}>logout</Button></Col>
                                <Col><img src={props.user.imgUrl} width="50" height="50" /></Col>
                            </Row>
                        </Container>
                    </Col>

                </Row>
            </Container>
        )
    } else {
        return (
            <center>🍔 🥓<Button variant="info" onClick={onClickHome}>Home</Button> 🍩 🍪</center>
        )
    }
}




const mapState = state => {
    return {
        user: state.user,
    };
};





export default connect(mapState, null)(NavBar);