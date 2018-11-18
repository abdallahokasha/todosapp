import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

class Signup extends Component {
  render() {
    return (

      <div>
        <Grid container spacing={16}>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={6}>
            <h1>Sign Up</h1>
            <div id="signupDiv">
              <p>Please fill in this form to create an account.</p>

              <label className = "leftPosition" for="email"><b>Email</b></label>
              <input type="text" placeholder="Enter Email" name="email" required />

              <label className = "leftPosition" for="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="psw" required />

              <label className = "leftPosition" for="psw-repeat"><b>Confirm Password</b></label>
              <input type="password" placeholder="Confirm Password" name="psw-repeat" required />
   
              <label>
                <input type="checkbox" checked="checked" name="remember" /> Remember me</label>
              <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

              <div >
              <Link to="/"><button className="roundedButton" type="button" >Cancel</button></Link>
              <Link to = "/todos">  <button className="roundedButton" type="submit" >Sign Up</button> </Link>
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Signup;
