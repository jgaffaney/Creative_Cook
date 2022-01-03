import React, {useEffect, useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch,useSelector } from 'react-redux';
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
import RefreshIcon from '@mui/icons-material/Refresh';



function Profile() {
  const user = useSelector((store) => store.user);
  const userCombos = useSelector((store) => store.userCombos);
  const userIngredients = useSelector((store) => store.userIngredients);
  const userRecipes = useSelector((store) => store.userRecipes);
  const goal = useSelector((store) => store.goal);
  const dispatch = useDispatch();

  // console.log("userCombos", userCombos);
  // console.log("userIngredients", userIngredients);
  // console.log("userRecipes", userRecipes);

  useEffect(() => {
    dispatch({ type: 'FETCH_COMBOS' })
    dispatch({ type: 'FETCH_GOAL' })
  }, [])



  //box stylings
  const sxHomePageContainer = {
    // border: '1px solid red',
    display: 'flex',
    justifyContent: 'center',
  }

  const sxPageContent = {
    // border: '1px solid black',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    height: '100%',
    m: 2
  }

  const sxLeftColumn = {
    // border: '1px solid green',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  }

  const sxRightColumn = {
    // border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    height: '100%',
  }

  const sxTopLeftSection = {
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    height: 300,
  }

  const sxTopRightSection = {
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: 300,
  }

  const sxMiddleSection = {
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 300,
  }

  const sxPhotoBox = {
    // border: '1px solid lightgray',
    width: 120,
    height: 220,
    boxShadow: 3,
    mb: .25,
    borderRadius: 1,
  };

  const sxButtonBox = {
    // border: '1px solid black',
    display: 'inline-flex',
    flexDirection: 'row',
    width: '100%',
    height: '35%',
    // m: 2
  }

  const sxBottomSection = {
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 300,
  }

  const sxGoals = {
    // border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
  }

  //Default User Goals
  let userNewIngredientGoals = 5;
  let userNewRecipeGoals = 3;
  // let userNewComboGoals = 5;

  //User Goal Progress
  let userIngredientGoalProgress = 1;
  let userRecipeGoalProgress = 2;
  let userComboGoalProgress = 3;


function progressChecker() {
  if (userCombos.length >= goal.goal) {
    dispatch({ type: 'UPDATE_GOAL', payload: goal})
    console.log(userCombos.length);
  }
}
 

  progressChecker();
 

  //functions to update goals
  function handleUpdateIngredientGoal() {
    console.log('update goal');
    console.log(userIngredientGoalProgress);
    userIngredientGoalProgress++;
    // dispatch({type: 'UPDATE_INGREDIENT_GOAL', payload: userIngredientGoalProgress});
  }

  function handleUpdateRecipeGoal() {
    console.log('update goal');
    console.log(userRecipeGoalProgress);
    userRecipeGoalProgress++;
    // dispatch({type: 'UPDATE_RECIPE_GOAL', payload: userRecipeGoalProgress});
  }
  function handleUpdateComboGoal() {
    console.log('update goal');
    console.log(userComboGoalProgress);
    userComboGoalProgress++;
    // dispatch({type: 'UPDATE_COMBO_GOAL', payload: userComboGoalProgress});
  }

  //functions to reset goals
  function handleIngredientReset()  {
    console.log('reset');
    userIngredientGoalProgress = 0;
  }

  function handleRecipeReset()  {
    console.log('reset');
    userRecipeGoalProgress = 0;
  }

  function handleComboReset()  {
    console.log('reset');
    userComboGoalProgress = 0;
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  console.log('goal', goal);
  return (
    <Box sx={sxHomePageContainer}>
      <Box sx={sxPageContent}>
        <Box sx={sxRightColumn}>
          <Box sx={sxLeftColumn}>
            <Box sx={sxTopLeftSection}>
              <CardMedia sx={sxPhotoBox} component="img" image={user.pic} />
              <Typography>{user.username}</Typography>
              <LogOutButton />
            </Box>
            <Box sx={sxTopRightSection}>
              <Typography fontSize={24}>{user.bio}</Typography>
              <Typography>{user.age}</Typography>
            </Box>
          </Box>
          <Box sx={sxMiddleSection}>
            {/* <Typography>Middle Section: Goals</Typography> */}
            {/* <Stack direction="row" spacing={2}> */}

              {/* <Button onClick={() => handleAddNewGoal()} variant="contained" size="small" startIcon={<AddTaskIcon />} >Add New Goal</Button> */}
            {/* </Stack> */}
            <Typography size={24}>Goal Progress</Typography>
            {/* <Box sx={sxGoals}>Goal Progress</Box> */}

            {/* <Box sx={sxGoals}> */}
              <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={4}>
                <Typography>New Ingredients - Goal: {userNewIngredientGoals} </Typography>
                  <Item>Goal Progress: {userIngredients}/{userNewIngredientGoals}</Item>
                  {/* <Button onClick={() => handleUpdateIngredientGoal()} variant="contained" size="small" startIcon={<AddTaskIcon />} >Update</Button>
                  <Button onClick={() => handleIngredientReset()} variant="outlined" size="small" startIcon={<RefreshIcon />} >Reset</Button> */}
                </Grid>
                <Grid item xs={4}>
                <Typography>New Recipes - Goal: {userNewRecipeGoals} </Typography>
                  <Item>Goal Progress: {userRecipes}/{userNewRecipeGoals}</Item>
                  {/* <Box sx={sxButtonBox}> */}
                  {/* <Button onClick={() => handleUpdateRecipeGoal()} variant="contained" size="small" startIcon={<AddTaskIcon />} >Update</Button>
                  <Button onClick={() => handleRecipeReset()} variant="outlined" size="small" startIcon={<RefreshIcon />}>Reset</Button> */}
                  {/* </Box> */}
                </Grid>
                {goal.goal && 
                <Grid item xs={4}>
                <Typography>New Combos - Goal: {goal.goal} </Typography>
                  <Item>Goal Progress: {userCombos.length}/{goal.goal}</Item>
                  {/* <Button onClick={() => handleUpdateComboGoal()} variant="contained" size="small" startIcon={<AddTaskIcon />} >Update</Button>
                  <Button onClick={() => handleComboReset()} variant="outlined" size="small" startIcon={<RefreshIcon />}>Reset</Button> */}
                </Grid>}
              </Grid>
            {/* </Box> */}
            <Typography size={18}>Metrics</Typography>
            {/* <Box sx={4}>Metrics</Box> */}
            {/* <Box sx={sxGoals}> */}
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
            {/* </Box> */}
          </Box>
          <Box sx={sxBottomSection}>
            <Typography size={18}>Saved Flavor Combos</Typography>
            {/* <Typography>Saved Flavor Combos</Typography> */}
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

export default Profile;
