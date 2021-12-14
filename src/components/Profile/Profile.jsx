import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';



function Profile() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  const sxHomePageContainer = {
    border: '1px solid red',
    display: 'flex',
    justifyContent: 'center',
  }

  const sxPageContent = {
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    height: '100%',
    m: 2
  }

  const sxLeftColumn = {
    border: '1px solid green',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  }

  const sxRightColumn = {
    border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    height: '100%',
  }


  const sxTopLeftSection = {
    border: '1px solid lightblue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    height: 300,
  }

  const sxTopRightSection = {
    border: '1px solid yellow',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: 300,
  }


  const sxMiddleSection = {
    border: '1px solid lightblue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 300,
  }

  const sxPhotoBox = {
    border: '1px solid lightgray',
    width: 120,
    height: 220,
    boxShadow: 3,
    mb: .25,
    borderRadius: 1,
  };


  const sxBottomSection = {
    border: '1px solid lightblue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 300,
  }

  const sxGoals = {
    border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
  }

  // const sxGoalsLeft = {
  //   border: '1px solid green',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '50%',
  //   height: 250,
  // }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



  return (
    <Box sx={sxHomePageContainer}>
      <Box sx={sxPageContent}>
        <Box sx={sxRightColumn}>
          <Box sx={sxLeftColumn}>
            <Box sx={sxTopLeftSection}>
              <LogOutButton />
              <CardMedia sx={sxPhotoBox} component="img" image={'/images/jacobpic.jpg'} />
              <Typography>User Name</Typography>
              {/* <Typography>User Bio goes here it will be kinda long but maybe it's a bit longer of a description of the person? </Typography> */}
              {/* <Typography>User Bio goes here it will be kinda long but maybe it's a bit longer of a description of the person? </Typography> */}
            </Box>
            <Box sx={sxTopRightSection}>
              <Typography>User Bio goes here it will be kinda long but maybe it's a bit longer of a description of the person? </Typography>
            </Box>
          </Box>
          <Box sx={sxMiddleSection}>
            {/* <Typography>Middle Section: Goals</Typography> */}
            <Stack direction="row" spacing={2}>

              <Button onClick={() => handleAddNewGoal()} variant="contained" size="large" startIcon={<AddTaskIcon />} endIcon={<AddTaskIcon />}>Add New Goal</Button>
            </Stack>

            <Box sx={sxGoals}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Item>Goal Progress: 1</Item>
                  <Button onClick={() => handleRemoveGoal()} variant="outlined" size="small" startIcon={<DeleteIcon />}>Remove Goal</Button>
                </Grid>
                <Grid item xs={4}>
                  <Item>Goal Progress: 2</Item>
                  <Button onClick={() => handleRemoveGoal()} variant="outlined" size="small" startIcon={<DeleteIcon />}>Remove Goal</Button>
                </Grid>
                <Grid item xs={4}>
                  <Item>Goal Progress: 3</Item>
                  <Button onClick={() => handleRemoveGoal()} variant="outlined" size="small" startIcon={<DeleteIcon />}>Remove Goal</Button>
                </Grid>
              </Grid>
            </Box>
            {/* <Box sx={sxGoals}>Goal Progress</Box> */}
            {/* <Button onClick={() => handleRemoveGoal()} variant="contained">Remove Goal</Button> */}
            <Box sx={4}>Metrics</Box>
            <Box sx={sxGoals}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Item>Metrics/Weekly</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>Metrics/Monthly</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>Metrics/Total</Item>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={sxBottomSection}>
            <Typography>Bottom Section: Saved Flavor Combos</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {Array.from(Array(12)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Item>Saved Flavor Combos</Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box >


  );
}

// this allows us to use <App /> in index.js
export default Profile;
