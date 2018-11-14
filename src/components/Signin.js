import React, { Component } from 'react';


class Signin extends Component {
  render() {
    return (
      <div>
        <h2> Log in </h2>
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required />

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required />

        <button className="roundedButton" type="submit">Login</button>

      </div>
    );
  }
}

export default Signin;
