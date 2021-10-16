import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
//bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//

export default function GoogleAuth() {
    const uuid = useParams().id;
    const token = localStorage.getItem('token');
    const history = useHistory();

    useEffect(() => {
        // console.log('this '+token)
        if (uuid) {
            localStorage.setItem('uuid', uuid)
        }

        //get token from local storage here if yes redirect to '/home'
    })

    const tokenAuth = async () => {
        await axios.get('/auth/token', { headers: { Authorization: 'Bearer ' + token } })
        // history.push(`/home`)
    }

    const renderContent = () => {
        if (isMobile) {
            return <div >
                <p style={{ textAlign: 'center' }}>
                    Using MyShopper you won't forget to buy
                    something important from your shopping list because your it's here!<br />
                    Create the shopping list(pool), add needed items,
                    and share it with who you want in a few clicks.
                    You can check what you bought that your partner
                    will see changes in real-time!
                </p>
            </div>
        }
        return <div style={{ textAlign: 'center' }}>
            <p style={{ display: 'inline-block', textAlign: 'left' }}>
                Using MyShopper you won't forget to buy something <br />
                important from your shopping list because your it's here!<br />
                Create the shopping list(pool), add needed items,<br />
                and share it with who you want in a few clicks.<br />
                You can check what you bought that your partner<br />
                will see changes in real-time!
            </p>
        </div>
    }

   
        return (
            <div>
                <br />
                <center><h3>Welcome!</h3></center>
                <br />
                <br />
                <Form method='get' action='/auth/'>
                    <center><Button variant="success" type="submit">Login with Google</Button> </center>
                </Form>
                <br />
                <br />
                {renderContent()}
            </div>
        )
    
}

