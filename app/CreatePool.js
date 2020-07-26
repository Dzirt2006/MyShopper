import React, { useState } from 'react';
import axios from 'axios';

export default function NewPool(props){

    const [name,setName]=useState(null);
    const pools=props.poolsArr;
    const setPool=props.setter;

    async function onClickHandler(event){
        event.preventDefault();
        await axios.post('/api/pool/',{poolName:name})
        .then(pool=>{setPool([...pools,pool.data])}); 
          
    }

    function onChangeEv(event){
        setName(event.target.value);
    }

    return(
        <form onSubmit={onClickHandler}>
            <input type="text" id = "name" name="name" 
            onChange={onChangeEv}/>
            <input type="submit" value="AddPool"/>
        </form>
    )
}