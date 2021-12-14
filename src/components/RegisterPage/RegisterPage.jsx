import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

function RegisterPage() {
  const history = useHistory();


  return (
    <Box>

      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
    </Box>
  );
}

export default RegisterPage;
