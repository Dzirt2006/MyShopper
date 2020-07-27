import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home';
import PoolCreator from './PoolCreator';

const Routes = () => {
    return (
        <Router>
            <div> <center><h2>Welcome to MyShopper!</h2></center></div>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    )
}

export default Routes;