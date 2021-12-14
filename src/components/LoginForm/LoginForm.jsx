import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login


  const sxInput = {
    mb: 1,
  }


  return (
    <form className="formPanel" onSubmit={login}>

      <h2>Login</h2>

      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
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
        <Button type="submit" size="large" variant="contained" color="primary">Login</Button>
      </Box>

    </form>
  );
}

export default LoginForm;
