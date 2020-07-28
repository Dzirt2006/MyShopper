import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

export default function NewPool(props){

    const history= useHistory();
    const [name,setName]=useState(null);
    const pools=props.poolsArr;
    const setPool=props.setter;

    async function onClickHandler(event){
        event.preventDefault();
        await axios.post('/api/pool/',{poolName:name})
        .then(pool=>{
            // console.log('!!!',pool)
            setPool([...pools,pool.data]);
            history.push(`/pool/${pool.data.id}`)//crypt id
        }); 
          
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