import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import RegisterForm from '../RegisterForm/RegisterForm';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';


function LoginPage() {
  const history = useHistory();

  const [registerFormStatus, setRegisterFormStatus] = useState(false);

  const sxRegisterFormBtn = {
    m: 5,
  }

  const sxLoginPageContent = {
    // border: '1px solid red',
    width: 550,
    mx: 'auto',
  }

  // window.location.replace("#/home/#register")

  return (

    <Box sx={sxLoginPageContent}>

      <LoginForm />

      <center>
        {!registerFormStatus ?
          <Button sx={sxRegisterFormBtn} onClick={() => setRegisterFormStatus(!registerFormStatus)}
            variant="contained">New? Register Account</Button>
          :
          <Button sx={sxRegisterFormBtn} onClick={() => setRegisterFormStatus(!registerFormStatus)}
            variant="contained">Hide Registration</Button>
        }
      </center>

      {/* open the registration form when we click on the button above */}
      {registerFormStatus ? <RegisterForm /> : <></>}

    </Box>

  );
}

export default LoginPage;
