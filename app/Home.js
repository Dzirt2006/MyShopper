import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NewPool from './CreatePool';
import PoolsShortcut from './PoolsShortcut';
import { connect, useDispatch } from 'react-redux';
import { newUser, refUser, deletePool } from './store/userReducer';
import { cleanPool } from './store/poolReducer';
import io from 'socket.io-client'
//bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
//



function Home(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const refId = localStorage.getItem('refId');
        function gettUser() {
            dispatch(newUser());
        }
        function refferanceUser() {
            dispatch(refUser(refId))
        }
        gettUser();
        if (refId) {
            refferanceUser();
        } else {
            gettUser()
        }
        dispatch(cleanPool())//clean product from pool store
        localStorage.clear();
    }, [])


    function onClickHandle(event) {
        event.preventDefault();
        const poolId = event.target.id;
        console.log(poolId);
        dispatch(deletePool(poolId));
    }

    if (props.user.name) {
        return (
            <div>
                <NewPool />
                <br />
                {!!props.user.pools &&
                    <ListGroup className="poolList">
                        {props.user.pools.map(pool => (
                            <ListGroup.Item key={pool.id} >
                                <Row>
                                    <Col xs={8}>
                                        <PoolsShortcut poolInfo={pool} />
                                    </Col>
                                    <Col>
                                        <Button variant="danger" onClick={onClickHandle} id={pool.id} className="float-right">X</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item >))}
                    </ListGroup>
                }
            </div>
        )
    } else {
        return (
            <p>Loading...</p>
        )
    }
}

const mapState = state => {
    return {
        user: state.user,
    };
};





export default connect(
    mapState, null
)(Home);