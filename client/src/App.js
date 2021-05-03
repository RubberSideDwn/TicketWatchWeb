import "./App.scss";
import * as React from "react";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import Search from './components/Search/Search';

function App() {
    return (
        <Router>
            <Switch> 
            <Route exact path="/">
            <Redirect to="/Search" />
        </Route>
        <Route path="/Search" exact component={Search} />
        </Switch>
        </Router>
    );
}

export default App;