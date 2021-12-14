import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser


  const sxInput = {
    mb: 2,
  }

  return (

    <form className="formPanel" onSubmit={registerUser}>

      <h2>Register User</h2>

      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      <Box>
        <TextField sx={sxInput}
          id="username"
          required
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />

      </Box>

      <Box>
        <TextField sx={sxInput}
          id="password"
          required
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Passw0rd"
        />
      </Box>

      <Box>
        <Button type="submit" size="large" variant="contained" color="primary">Register</Button>
      </Box>

    </form>

  );
}

export default RegisterForm;
