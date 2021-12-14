import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';

function LogOutButton() {

  const dispatch = useDispatch();

  return (

    <Button onClick={() => dispatch({ type: 'LOGOUT' })} size="large" variant="contained" color="primary">Logout</Button>

  );
}

export default LogOutButton;
