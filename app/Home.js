import React, { useState, useEffect } from 'react';
import NewPool from './CreatePool';
import Pools from './PoolsShortcut';
import axios from 'axios';
import socketIOClient from "socket.io-client";

export default function Home() {
    const [user, setUser] = useState({});
    const [lists, setLists] = useState([]);

    useEffect(() => {
        if (!user.id) {
            async function fetchUser() {
                await axios.get('/api/user/')
                    .then(async data => {
                        !!data.data ? (setUser(data.data), setLists(data.data.pools)) : await createUser()
                    }
                    );
            }
            async function createUser() {
                await axios.post('/api/user/')
                    .then(data => { setUser(data.data) });
            }
            fetchUser();
        }

    }, [])


    console.log('lists', lists);

    const socket = socketIOClient("localhost:8000");
    if (user.name) {
        return (
            <div>
                <NewPool setter={setLists} poolsArr={lists} />
                <button onClick={() => onClickHandler()}> New pool </button>
                {lists.length > 0 &&
                    lists.map(pool => (
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