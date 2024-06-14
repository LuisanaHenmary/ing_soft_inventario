import { useState } from 'react';

import { Grid, TextField, Button } from '@mui/material';
import { Link } from "react-router-dom";

import './index.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <div className="login_container">
      <div className="login_container_form">
        <h1 className='login_container_form-title'>
          Sign IN
        </h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className='login_container_form-control'
                label="Email"
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className='login_container_form-control'
                label="Password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className='login_container_form-control_button'
                type="submit"
                variant="contained"
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
        <span className='login_container_form-footer'>
          New on our platform?
          <Link className='login_container_form-footer_link' to="/register">
            Create Account
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
