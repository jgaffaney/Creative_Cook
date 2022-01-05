import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import './Nav.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Nav() {

  const user = useSelector((store) => store.user);

  const history = useHistory();

  // NAV container to hold our nav links / buttons
  const sxNav = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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

  // LINK TEXT the piece of clickable text in the navbar 
  const sxNavButton = {
    color: 'info.main',
    fontWeight: 600,
    fontSize: 16,
    my: -1,
  }


  // when the user clicks on a text link it will take them to that desired page
  const handleClick = (input) => {
    console.log(`clicked on the ${input} nav button`);
    history.push(`${input}`)
  }


  // USER logged in users will be able to see these links in the navbar 
  const navUser = (
    <Box sx={sxNav}>

      <Typography sx={sxNavButton} onClick={() => handleClick('home')}>HOME</Typography>

      <Typography sx={sxNavButton} onClick={() => handleClick('combo')}>CREATE COMBO</Typography>

      <Typography sx={sxNavButton} onClick={() => handleClick('profile')}>PROFILE</Typography>

    </Box >
  )


  // ADMIN will be able to view all user links + the ingredients and feed in their navbar
  const navAdmin = (
    <Box sx={sxNav}>

      <Typography sx={sxNavButton} onClick={() => handleClick('home')}>HOME</Typography>

      <Typography sx={sxNavButton} onClick={() => handleClick('combo')}>CREATE COMBO</Typography>

      <Typography sx={sxNavButton} onClick={() => handleClick('profile')}>PROFILE</Typography>

      <Typography sx={sxNavButton} onClick={() => handleClick('ingredients')}>INGREDIENTS</Typography>

      <Typography sx={sxNavButton} onClick={() => handleClick('feed')}>FEED</Typography>

    </Box>
  )

    // PAGE CONTAINER the navbar overall container that holds "creative cook" + the navbar text / links
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

    width: '100%',
    bgcolor: 'white',
    borderBottom: '1px solid gray',
  }

  // the "CREATIVE COOK" header properties; pushes you home when clicked on;
  const sxCreativeCookHeader = {
    fontWeight: 600,
    color: 'info.main',
    my: 1,

    border: 'none',
    cursor: 'pointer',
    outline: 0,
  }


  return (
    <Box sx={sxNavContainer}>

      <Typography variant="h3" sx={sxCreativeCookHeader} onClick={() => handleClick('home')}>CREATIVE COOK</Typography>

      {/* if user is NOT logged in, don't show nav; */}
      {/* if user is logged in, 1. check if they are an admin 2. display the proper navbar based on if is_admin */}
      <Box> {!user.id ? <></> : user.is_admin ? navAdmin : navUser} </Box>

    </Box>
  );
}

export default Nav;
