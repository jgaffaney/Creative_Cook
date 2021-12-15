import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';


function Nav() {

  const user = useSelector((store) => store.user);

  const history = useHistory();


  // container to hold our nav links / buttons
  const sxNav = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // color: 'blue',
    // bgcolor: 'red',
    textAlign: 'center',
    p: 1,
    mb: 1,
    border: 'none',
    cursor: 'pointer',
    outline: 0,

    fontSize: 16,
    fontWeight: 600,
    width: 550,
    gap: 3,

    color: 'info',
  }

  // the piece of clickable text in the navbar 
  const sxNavButton = {
    color: 'info.main',
    fontWeight: 600,
    fontSize: 16,
    my: -1,
  }


  // when the user clicks on a link it will take them to that desired page
  const handleClick = (input) => {
    console.log('clicked on a nav button');
    history.push(`${input}`)
  }


  // when logged in users will be able to see these links in the navbar 
  const navUser = (
    <Box sx={sxNav}>

      <Typography sx={sxNavButton} onClick={() => handleClick('home')}>HOME</Typography>

      <Typography sx={sxNavButton} onClick={() => handleClick('combo')}>CREATE COMBO</Typography>

      <Typography sx={sxNavButton} onClick={() => handleClick('profile')}>PROFILE</Typography>

    </Box >
  )


  // admin will be able to view all user links + ingredients and feed in their navbar
  const navAdmin = (
    <Box sx={sxNav}>

      <Typography sx={sxNavButton} onClick={() => handleClick('home')}>HOME</Typography>

      <Typography sx={sxNavButton} onClick={() => handleClick('combo')}>CREATE COMBO</Typography>

      <Typography sx={sxNavButton} onClick={() => handleClick('profile')}>PROFILE</Typography>

      <Typography sx={sxNavButton} onClick={() => handleClick('ingredients')}>INGREDIENTS</Typography>

      <Typography sx={sxNavButton} onClick={() => handleClick('feed')}>FEED</Typography>

    </Box>
  )

    // the navbar overall container that holds "creative cook" + the navbar text / links
  const sxNavContainer = {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'sticky',
    top: 0,
    m: 1,
    mx: 'auto',
    zIndex: 100,

    width: '95%',
    bgcolor: 'white',
    borderBottom: '1px solid gray',
  }

  // the "creative cook" header properties; pushes you home when clicked on;
  const sxCreativeCookHeader = {
    fontSize: 20,
    fontWeight: 600,
    my: -2,
    color: 'info.main',

    border: 'none',
    cursor: 'pointer',
    outline: 0,
  }


  return (
    <Box sx={sxNavContainer}>

      <Typography sx={sxCreativeCookHeader} onClick={() => handleClick('home')}> <h2>CREATIVE COOK</h2> </Typography>

      {/* if user is NOT logged in, don't show nav; */}
      {/* if user is logged in, 1. check if they are an admin 2. display the proper navbar based on if is_admin */}
      <Box> {!user.id ? <></> : user.is_admin ? navAdmin : navUser} </Box>

    </Box>
  );
}

export default Nav;
