import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home';
import Pool from './Pool';
import Login from './Login';
import Navbar from './NavBar';

const Routes = () => {
    return (
        <Router>
            <Navbar/>
            <div>
                <br />
                <center>
                    <h2>MyShopper</h2>
                </center>
            </div>
            <br />
            <br />
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/pool/:id" component={Pool} />
                <Route path="/:id?" component={Login} />
                {/* <Route component={Error} />  add error */}
            </Switch>
        </Router>
    )
}

export default Routes;