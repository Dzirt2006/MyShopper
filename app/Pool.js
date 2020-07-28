import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Pool() {
    const [name, setName] = useState(null);


    useEffect(() => {
        console.log(this.props);
        const id = this.props.match.params.id;
        
        const getPool = async () => {
            await axios.get(`/api/pool/${id}`)
                .then(data => setName(data));
        }
        getPool();
    }, [])


    async function onClickHandler(event) {
        event.preventDefault();

    }

    function onChangeEv(event) {
        setName(event.target.value);
    }
    console.log('nbame', name);
    return (
        <form onSubmit={onClickHandler}>
            <input type="text" id="name" name="name"
                onChange={onChangeEv} />
            <input type="submit" value="AddPool" />
        </form>
    )
}