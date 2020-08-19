import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home';
import Pool from './Pool';


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
                {/* <Route component={Error} />  add error */}
            </Switch>
        </Router>
    )
}

export default Routes;