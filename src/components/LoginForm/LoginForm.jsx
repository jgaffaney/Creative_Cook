import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  

  const login = (event) => {
    event.preventDefault();
    history.push('/home')
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

  const sxFormControl = {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
  }

  const sxFormContent = {
    // border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    mx: 'auto',
    width: '100%',
  }


  return (
    <form sx={sxFormControl} required onSubmit={login}>
      <Box sx={sxFormContent}>
      <Typography sx={{mb: 3, textAlign: 'center',}}variant='h4'>Login</Typography>

      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

        <TextField sx={sxInput}
          id="loginUsername"
          required
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          // placeholder="Username"
        />

        <TextField sx={sxInput}
          type="password"
          id="loginPassword"
          required
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          // placeholder="Passw0rd"
        />

        <Button type="submit" size="large" variant="contained" color="primary">Login</Button>

        </Box>

    </form>
  );
}

export default LoginForm;
