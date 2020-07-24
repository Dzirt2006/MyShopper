import React, { useState, useEffect } from 'react';
import NewPool from './CreatePool';
import Pools from './PoolsShortcut';
import axios from 'axios';

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

    console.log('User', user);


    if (user.name) {
        return (
            <div>
                <center><header> Welcome to MyShopper!</header></center>
                <NewPool />
                <button onClick={() => onClickHandler()}> New pool </button>
                {user.pools.length>0 &&
                    <div id='pools_list'>
                        {user.pools.map(pool => (<Pools poolInfo={pool} />))}
                    </div>
                }
            </div>
        )
    } else {
        return (
            <p>Loading...</p>
        )
    }

}