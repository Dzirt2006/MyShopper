import React, { useState, useEffect, useRef } from 'react';
import NewPool from './CreatePool';
import Pools from './PoolsShortcut';
import { connect, useDispatch } from 'react-redux';
import { fetchUser, newUser } from './store/userReducer';





const URL = 'ws://localhost:8000';
const ws = new WebSocket(URL);


function Home(props) {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [lists, setLists] = useState([]);
    const isFirstRun = useRef(true);


    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
        }
        if (!props.user.name) {
            function gettUser() {
                dispatch(fetchUser());
            }
            gettUser();
        }
        if (!props.user.name && !isFirstRun.current) {
            function createUser() {
                dispatch(newUser());
            }
            setTimeout(() => {
                createUser();
            }, 20);
        }


        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }


    }, [])

    function onClickHandler(event) {
        ws.send(lists);
    }

    ws.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });




    // const socket = socketIOClient("localhost:8000");
    if (props.user.name) {
        return (
            <div>
                <NewPool poolsArr={props.user.pools} />
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



const mapDispatch = dispatch => ({
    // fetchUser: () => dispatch(fetchUser()),
    // newUser: () => dispatch(newUser())
});


export default connect(
    mapState,
    mapDispatch
)(Home);