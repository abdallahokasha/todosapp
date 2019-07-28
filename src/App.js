import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Todos from "./components/Todos";
class App extends Component {
  render() {
    // console.log(this.props);
    return (
      <Router>
        <div className="App mainDiv">
          <h1 id="appTitle" className="leftPosition">
            {" "}
            Todos App
          </h1>
          <div>
            <Route exact path="/" component={Signin} />
            <Route exact path="/todos" component={Todos} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
