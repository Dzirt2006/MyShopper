import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home';
import Pool from './Pool';
import Refferal from './Refferal';

const Routes = () => {
    return (
        <Router>
            <div> <center><h2>Welcome to MyShopper!</h2></center></div>
            <Switch>
                <Route exact path="/:id" component={Home} />
                <Route path="/pool/:id" component={Pool} />
                <Route path="/ref/:id" component={Refferal} />
                {/* <Route component={Error} />  add error */}
            </Switch>
        </Router>
    )
}

export default Routes;