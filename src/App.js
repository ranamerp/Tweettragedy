import React from 'react';
import NavSearchBar from './components/NavSearchBar'
import About from './components/About'
import Sourcing from './components/Sourcing'
import not_found from './components/not_found'
//import NavSearchBar from './components/NavSearchBar'
import {BrowserRouter as Router, Route, Switch, HashRouter, Redirect} from "react-router-dom"

function App() {

  return (
    <Router>
      <Switch> 
        <Route
          exact path="/" component={NavSearchBar}
        />
        <Route
          exact path="/About" component={About}
        />
        <Route
          exact path="/Sourcing" component={Sourcing}
        />
        <Route
        component={not_found}
        />
      </Switch>
    </Router>
    //<NavSearchBar/>
  );
}

export default App;
