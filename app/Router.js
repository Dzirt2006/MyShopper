import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home';
import Pool from './Pool';
import Eror404 from './Error404';

const Routes = () => {
    return (
        <Router>
            <div>
                <br />
                <center>
                    <h2>Welcome to MyShopper!</h2>
                </center>
            </div>
            <br />
            <br />
            <Switch>
                <Route exact path="/:id?" component={Home} />
                <Route path="/pool/:id" component={Pool} />
                <Route component={Eror404} /> 
            </Switch>
        </Router>
    )
}

export default Routes;