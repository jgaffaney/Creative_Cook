import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';


function Nav() {

  const user = useSelector((store) => store.user);



  const navUser = (
    <>
      <Link className="navLink" to="/home">
        Home
      </Link>

      <Link className="navLink" to="/combo">
        Combo
      </Link>

      <Link className="navLink" to="/profile">
        Profile
      </Link>
    </>
  )


  const navAdmin = (
    <>
      <Link className="navLink" to="/home">
        Home
      </Link>

      <Link className="navLink" to="/combo">
        Combo
      </Link>

      <Link className="navLink" to="/profile">
        Profile
      </Link>

      <Link className="navLink" to="/ingredients">
        Ingredients
      </Link>

      <Link className="navLink" to="/feed">
        Feed
      </Link>
    </>
  )


  return (
    <Box className="nav">

      <Link to="/home">
        <h2 className="nav-title">Creative Cook</h2>
      </Link>

      <Box>

        {/* If no user is logged in, show them the home page */}
        {user.id === null && <Link className="navLink" to="/home">home</Link>}

        {/* only the admin will have access to certain links / routes made available in the nav  */}
        {/* {user.is_admin === true ? navAdmin : navUser} */}

      </Box>


      <Box>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login links
          <Link className="navLink" to="/home">
            Login
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {/* User will not see links if they are not logged in */}
        {user.id & user.is_admin === false ?
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>

            <Link className="navLink" to="/combo">
              Combo
            </Link>

            <Link className="navLink" to="/profile">
              Profile
            </Link>
          </>
          : <></>}

        {/* If a user is logged in, show these links */}
        {/* User will not see links if they are not logged in */}
        {user.id & user.is_admin === true ?
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>

            <Link className="navLink" to="/combo">
              Combo
            </Link>

            <Link className="navLink" to="/profile">
              Profile
            </Link>

            <Link className="navLink" to="/ingredients">
              Ingredients
            </Link>

            <Link className="navLink" to="/feed">
              Feed
            </Link>
          </>
          : <></>}
      </Box>
    </Box>

  );
}

export default Nav;
