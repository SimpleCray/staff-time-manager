import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './@history';
import './App.css';
import { Home } from './components/pages/Home';
import Message from './components/shared/Message';
import './scss/app.scss';
import './mock-db'

function App() {
    return (
        <React.Fragment>
            <Router history={history}>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                </Switch>
            </Router>
            <Message />
        </React.Fragment>
    );
}

export default App;
