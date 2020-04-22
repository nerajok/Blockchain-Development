import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Chats from "./components/chats.component";
import Events from "./components/events.component";

function App() {
  return (<Router>
    <div className="App">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand">FSD4 Project</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/chats"}>Chats List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/events"}>Events List</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Switch>
              <Route exact path='/' component={Chats} />
              <Route path="/chats" component={Chats} />
              <Route path="/events" component={Events} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </Router>
  );
}


export default App;
