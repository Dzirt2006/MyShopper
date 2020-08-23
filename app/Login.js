import React, { useEffect } from 'react';
import { useParams } from 'react-router';


export default function GoogleAuth() {
    const id = useParams().id;

    useEffect(() => {
        if (id) {
            localStorage.setItem('refId', id)
        }
    })



    return (
        <form method='get' action='/auth/'>
            <center> <button type='submit'>Login with Google</button></center>
        </form>
    )
}

