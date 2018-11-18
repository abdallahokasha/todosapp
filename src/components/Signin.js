import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

class Signin extends Component {
  render() {
    return (
      <div>  <Grid container spacing={16}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <h2> Log in </h2>
          <form>
          <label className = "leftPosition" for="uname"><b>Email</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required />

          <label className = "leftPosition" for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />
          <Link to="/todos">
          <button className="roundedButton" type="button">Login</button>
          </Link>  
          </form>
          <br />
          No Account! &nbsp; <Link to="/signup"> <a> Sign up For FREE!</a></Link>
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default Signin;
