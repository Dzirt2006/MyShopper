import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { refUser } from './store/userReducer';
import { useParams } from 'react-router';

function Ref(props) {

    //delete this component on deploy
    const dispatch = useDispatch();
    const id = useParams().id;
    

    useEffect(() => {
        function gettUser() {
            dispatch(refUser(id));
        }
        setTimeout(() => {
            gettUser();
        }, 20);

    }, [])


   
  
        return (
            <p>Registrate a new User...</p>
        )
    
}

const mapState = state => {
    console.log('STATE: ', state.user);
    return {
        user: state.user,
    };
};





export default connect(
    mapState, null
)(Ref);