import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import ComboTool from '../ComboTool/ComboTool';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

function Feed() {
  const user = useSelector((store) => store.user);
  const recipes = useSelector(store => store.recipe);
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients);
  const userCombos = useSelector(store => store.userCombos);

  useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS' });
    dispatch({ type: 'FETCH_COMBOS' });
  }, [])

  const [newChallenge, setNewChallenge] = useState({ type: 'Combo of the Week', description: '', combo_id: ''})

  //Sets newChallenge local state to the passed in input
  const handlePropertyChange = (event, property) => {
    setNewChallenge({ ...newChallenge, [property]: event.target.value })
  };

  //Sends new challenge to the saga
  const addNewChallenge = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_CHALLENGE', payload: newChallenge });
  };

  const sxFeaturedCombo = {
    display: 'flex',
    flexDirection: 'column',
    mx: 'auto',
    width: '90%',
  }

  const sxMetrics = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    mx: 'auto',
    height: 80,
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Box sx={sxMetrics}>
        <Typography>App Wide User Metrics</Typography>
        <Box sx={sxMetrics}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>Top 5 Ingredients Used</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>% of Used Ingredients by Type</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>% of Users by Family Size</Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <br />
      <Box sx={sxFeaturedCombo}>
      <Typography sx={{textAlign: "center"}}>Create Featured Combo</Typography>


        <TextField
          sx={{ mb: 2, width: '60%', mx: 'auto' }}
          id="outlined-basic"
          variant="outlined"
          label="Description of Featured Combo"
          type="text"
          value={newChallenge.description}
          onChange={(event) => handlePropertyChange(event, 'description')}
        />

        {/* combo selector */}
        <ComboTool />

        {/* list of ingredients from DB */}
        <ul>
          {ingredients.map((ingredient) => {
            return (
              <li
                key={ingredient.id}
                value={ingredient}
                onClick={() => dispatch({ type: 'SET_COMBO_INGREDIENT', payload: ingredient })}>{ingredient.name}</li>
            )
          })}
        </ul>
      </Box>
    </>
  );
}

// this allows us to use <App /> in index.js
export default Feed;
