import React, { useState, useEffect } from 'react';
import NewPool from './CreatePool';
import Pools from './PoolsShortcut';
import { connect, useDispatch } from 'react-redux';
import { newUser, refUser } from './store/userReducer';
import { useParams } from 'react-router';
import io from 'socket.io-client'

const mainSocket = io(window.location.origin)





// const URL = 'ws://localhost:8000';
// const ws = new WebSocket(URL);


function Home(props) {
    const dispatch = useDispatch();
    const id = useParams().id;


    useEffect(() => {
        function gettUser() {
            dispatch(newUser());
        }
        function getRefUser() {
            dispatch(refUser(id));
        }
        if (id) {
            setTimeout(() => {
                getRefUser();
            }, 20);
        } else {
            setTimeout(() => {
                gettUser();
            }, 20);
        }




    }, [])

    function onClickHandler(event) {

    }




    mainSocket.on('connect', () => {
        console.log('Connected!')
    })

    // const socket = socketIOClient("localhost:8000");
    // socket.on('connect', () => console.log('We live'))

    if (props.user.name) {
        return (
            <div>
                <NewPool />
                <button onClick={() => onClickHandler()}> New pool </button>
                {!!props.user.pools &&
                    props.user.pools.map(pool => (
                        <div id='pools_list' key={pool.id}>
                            <Pools poolInfo={pool} />
                        </div>))
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
    console.log('STATE: ', state.user);
    return {
        user: state.user,
    };
};





export default connect(
    mapState, null
)(Home);