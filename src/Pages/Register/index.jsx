import { useState } from 'react';
import { useAuthentication } from '../../store/useAuthentication'

import { Grid, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import './index.css';

function Register() {
  const { register } = useAuthentication();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      console.log("Passwords do not match");
      return;
    }
    register(formData.email, formData.password)

  };

  return (
    <div className="register_container">
      <div className="register_container_form">
        <h1 className="register_container_form-title">Sign UP</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className="register_container_form-control"
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="register_container_form-control"
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="register_container_form-control"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="register_container_form-control"
                label="Repeat Password"
                type="password"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className="register_container_form-control_button"
                type="submit"
                variant="contained"
              >
                Sign UP
              </Button>
            </Grid>
          </Grid>
        </form>
        <span className="register_container_form-footer">
          Already have an account?
          <Link className="register_container_form-footer_link" to="/login">
            Log In
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
