import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';


function LoginPage() {
  const history = useHistory();

  return (

    <Box>

      <LoginForm />

      <center>

        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>

      </center>

    </Box>

  );
}

export default LoginPage;
