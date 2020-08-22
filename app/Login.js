import React from 'react';

export default function GoogleAuth() {
    return (
        <form method='get' action='/auth/'>
           <center> <button type='submit'>Login with Google</button></center>
        </form>
    )
}