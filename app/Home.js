import React, { useState, useEffect } from 'react';
import NewPool from './CreatePool';
import Pools from './PoolsShortcut';
import axios from 'axios';



 

const URL = 'ws://localhost:8000';
const ws = new WebSocket(URL);


export default function Home() {
    const [user, setUser] = useState({});
    const [lists, setLists] = useState([]);

    useEffect(() => {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
          }
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

    function onClickHandler(event){
       
            ws.send(lists);
          
    }

    ws.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });


    console.log('lists', lists);

   // const socket = socketIOClient("localhost:8000");
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