import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import ComboTool from '../ComboTool/ComboTool';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Feed() {
  const user = useSelector((store) => store.user);
  const recipes = useSelector(store => store.recipe);
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients);

  useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS' })
  }, [])

  const [newChallenge, setNewChallenge] = useState({ description: '', })

  //Sets newChallenge local state to the passed in input
  const handlePropertyChange = (event, property) => {
    setNewChallenge({ ...newChallenge, [property]: event.target.value })
  };

  //Sends new challenge to the saga
  const addNewChallenge = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_CHALLENGE', payload: newChallenge });
  };

  const sxFeedPage = {
    display: 'flex',
    flexDirection: 'column',
    mx: 'auto',
    width: '60%',
  }

  return (
    <Box sx={sxFeedPage}>
      <h2>Create Featured Combo</h2>


      <TextField
        sx={{ mb: 2 }}
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
  );
}

// this allows us to use <App /> in index.js
export default Feed;
