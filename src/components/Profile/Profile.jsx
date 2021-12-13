import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

function Profile() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid item>
        <ButtonBase sx={{ width: 128, height: 128 }}>
          <Img alt="jacob" src="/images/jacobpic.jpg" />
        </ButtonBase>
        <Typography gutterBottom variant="subtitle1" component="div">
              Jacob Birkeland
            </Typography>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            {/* <Typography gutterBottom variant="subtitle1" component="div">
              Standard license
            </Typography> */}
            <Typography variant="body2" gutterBottom>
              This is a brief bio for Jacob Birkeland
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              ID: 1030114
            </Typography> */}
          </Grid>
          {/* <Grid item>
            <Typography sx={{ cursor: 'pointer' }} variant="body2">
              Remove
            </Typography>
          </Grid> */}
        </Grid>
        {/* <Grid item>
          <Typography variant="subtitle1" component="div">
            $19.00
          </Typography>
        </Grid> */}
      </Grid>
    </Grid>
  </Paper>

    // <div className="container">
    //   <h2>User Page: Welcome, {user.username}!</h2>
    //   <p>Your ID is: {user.id}</p>
    //   <LogOutButton className="btn" />
    // </div>
  );
}

// this allows us to use <App /> in index.js
export default Profile;
