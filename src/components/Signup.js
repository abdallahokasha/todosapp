import React, { Component } from 'react';


class Signup extends Component {
  render() {
    return (

      <div>
        <h1>Sign Up</h1>
        <div id="signupDiv">
          <p>Please fill in this form to create an account.</p>

          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required />

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />

          <label for="psw-repeat"><b>Confirm Password</b></label>
          <input type="password" placeholder="Confirm Password" name="psw-repeat" required />

          <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember me
    </label>

          <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

          <div >
            <button className="roundedButton" type="button" >Cancel</button>
            <button className="roundedButton" type="submit" >Sign Up</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
