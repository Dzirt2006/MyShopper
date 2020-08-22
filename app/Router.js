import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home';
import Pool from './Pool';
import Login from './Login';

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
                <Route exact path="/home/:id?" component={Home} />
                <Route path="/pool/:id" component={Pool} />
                <Route component={Login} />
                {/* <Route component={Error} />  add error */}
            </Switch>
        </Router>
    )
}

export default Routes;