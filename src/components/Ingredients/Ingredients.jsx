import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditIngredients from '../Ingredients/EditIngredients';
import AddIngredients from '../Ingredients/AddIngredients';
import PairingsTool from '../Ingredients/PairingsTool';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// --- sx STYLES --- // 
import {
  sxIngredientsPageContainer,
} from './Ingredients.style';

function Ingredients() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const ingredients = useSelector((store) => store.ingredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS' })
  }, [])

  return (
    <Box sx={sxIngredientsPageContainer}>
      <AddIngredients />
      <EditIngredients />
      <PairingsTool />
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Ingredients;
