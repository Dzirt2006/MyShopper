import React, { useState } from 'react';
import axios from 'axios';

export default function NewPool(props){
//redo without hooks,only props
    
    const [name,setName]=useState(null);

    async function onClickHandler(event){
        event.preventDefault();
        console.log(name)
        await axios.post('/api/pool/',{poolName:name});    
    }

    function onChangeEv(event){
        setName(event.target.value);
    }
console.log(props);
    return(
        <form onSubmit={onClickHandler}>
            <input type="text" id = "name" name="name" 
            onChange={onChangeEv}/>
            <input type="submit" value="AddPool"/>
        </form>
    )
}