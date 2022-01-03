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

// --- MUI sx STYLES --- // 
import {
  sxProfilePageContainer,
  sxPageContent,
  sxLeftColumn,
  sxTopLeftSection,
  sxTopRightSection,
  sxMiddleSection,
  sxPhotoBox,
  sxRightColumn,
  sxBottomSection,
  sxButtonBox,
  sxGoals,
} from './Profile.style';

function Profile() {
  const user = useSelector((store) => store.user);
  const userCombos = useSelector((store) => store.userCombos);
  const userIngredients = useSelector((store) => store.userIngredients);
  const userRecipes = useSelector((store) => store.userRecipes);
  const comboGoal = useSelector((store) => store.comboGoal);
  const ingredientGoal = useSelector((store) => store.ingredientGoal);
  const dispatch = useDispatch();

useEffect(() => {
  dispatch({ type: 'FETCH_COMBOS' })
  dispatch({ type: 'FETCH_COMBO_GOAL' })
  dispatch({ type: 'FETCH_INGREDIENT_GOAL' })
}, [])

  if (userCombos.length >= comboGoal.goal) {
    dispatch({ type: 'UPDATE_COMBO_GOAL', payload: comboGoal})
    console.log(userCombos.length);
  }

  // progressChecker();
 
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  console.log('comboGoal', comboGoal);
  return (
    <Box sx={sxProfilePageContainer}>
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
                <Typography>New Ingredients - Goal: {ingredientGoal.goal} </Typography>
                  <Item>Goal Progress: {userCombos.length}/{ingredientGoal.goal}</Item>
                  {/* <Button onClick={() => handleUpdateIngredientGoal()} variant="contained" size="small" startIcon={<AddTaskIcon />} >Update</Button>
                  <Button onClick={() => handleIngredientReset()} variant="outlined" size="small" startIcon={<RefreshIcon />} >Reset</Button> */}
                </Grid>
                <Grid item xs={4}>
                <Typography>New Recipes - Goal: {comboGoal.goal} </Typography>
                  <Item>Goal Progress: {userCombos.length}/{comboGoal.goal}</Item>
                  {/* <Box sx={sxButtonBox}> */}
                  {/* <Button onClick={() => handleUpdateRecipeGoal()} variant="contained" size="small" startIcon={<AddTaskIcon />} >Update</Button>
                  <Button onClick={() => handleRecipeReset()} variant="outlined" size="small" startIcon={<RefreshIcon />}>Reset</Button> */}
                  {/* </Box> */}
                </Grid>
                {comboGoal.goal && 
                <Grid item xs={4}>
                <Typography>New Combos - Goal: {comboGoal.goal} </Typography>
                  <Item>Goal Progress: {userCombos.length}/{comboGoal.goal}</Item>
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
