import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Todos from './components/Todos';
import DoneTodos from './components/DoneTodos';

const NavMenu = () => {
  return (
    <div className="navBtn-group">
      <Link to="/signup">
        <button className="navButton">Signup</button>
      </Link>
      <Link to="/signin">
        <button className="navButton">Signin</button>
      </Link>
      <Link to="/">
        <button className="navButton" autoFocus> All Todos</button>
      </Link>
      <Link to="/donetodos">
        <button className="navButton">Done Todos</button>
      </Link>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <h1 className="leftPosition"> Todos App</h1>
        <NavMenu />
        <div>
                <Route exact path="/" component={Todos} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/donetodos" component={DoneTodos} />
              </div>
      </div>
      </Router>
    );
  }
}

export default App;
