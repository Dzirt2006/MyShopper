import React, { useEffect } from 'react';
import { useParams } from 'react-router';
//bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//

export default function GoogleAuth() {
    const id = useParams().id;

    useEffect(() => {
        if (id) {
            localStorage.setItem('refId', id)
        }
    })

    return (
        <div>
            <br />
            <center><h3>Welcome!</h3></center>
            <br />
            <br />
            <Form method='get' action='/auth/'>
                <center><Button variant="success" type="submit">Login with Google</Button> </center>
            </Form>
        </div>
    )

}

