import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NewPool from './CreatePool';
import PoolsShortcut from './PoolsShortcut';
import { connect, useDispatch } from 'react-redux';
import { newUser, refUser, deletePool } from './store/userReducer';
import axios from 'axios';
//bootstrap
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
//


function Home(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        const uuid = localStorage.getItem('uuid');//invite uuid store in localStorage
        function gettUser() {
            if(token){
                // axios.get('/auth/token',{headers:{ Authorization:'Bearer '+token}}).then(res=>console.log("return "+ res)).catch(err=>console.log(err))
               }
            dispatch(newUser(history));
        }
        function referenceUser() {
            if(token){
                // axios.get('/auth/token',{headers:{ Authorization:'Bearer '+token}}).then(res=>console.log("return "+ res)).catch(err=>console.log(err))
               }
            dispatch(refUser(uuid))
        }
        gettUser();
        if (uuid) {
            referenceUser();
        } else {
            gettUser()
        }
        if(!localStorage.getItem('token')){
            localStorage.setItem('token',props.user.token)
        }
        localStorage.removeItem('uuid');
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