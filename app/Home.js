import React, { useState, useEffect } from 'react';
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

    const onClickHandler =async () => {
        
    }

    return (
        <div>
            <center><header> Welcome to MyShopper!</header></center>
            
            <button onClick={()=>onClickHandler}> New pool </button>
        </div>
    )
}