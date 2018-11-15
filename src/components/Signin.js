import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';


class Signin extends Component {
  render() {
    return (
      <div>  <Grid container spacing={16}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <h2> Log in </h2>
          <label className = "leftPosition" for="uname"><b>Email</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required />

          <label className = "leftPosition" for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />

          <button className="roundedButton" type="submit">Login</button>
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default Signin;
