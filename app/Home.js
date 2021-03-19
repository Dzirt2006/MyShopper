import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NewPool from './CreatePool';
import PoolsShortcut from './PoolsShortcut';
import { connect, useDispatch } from 'react-redux';
import { newUser, refUser, deletePool } from './store/userReducer';
//bootstrap
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
//


function Home(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const uuid = localStorage.getItem('uuid');//invite uuid store in localStorage
        function gettUser() {
            dispatch(newUser(history));
        }
        function referenceUser() {
            dispatch(refUser(uuid))
        }
        gettUser();
        if (uuid) {
            referenceUser();
        } else {
            gettUser()
        }
        localStorage.clear();
    }, [])


    function onClickHandle(event) {
        event.preventDefault();
        const poolId = event.target.id;
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