import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import ComboTool from '../ComboTool/ComboTool';
import RecipeList from '../RecipeList/RecipeList';
import {
  List,
  ListItem,
  Grid,
  Paper,
  Box,
  Card,
  CardMedia,
  CardActions,
  Button,
  CardContent,
  Typography,
  Tooltip,
} from '@mui/material'
import { styled } from '@mui/material/styles';

function Combo() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients);

  useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS' })
  }, [])

  const sxIngredientContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    // border: '1px solid red',
    gap: 2,
    justifyContent: 'center',
  }

  const sxPhotoBox = {
    // border: '1px solid red',
    width: 35,
    height: 35,
    boxShadow: 3,
    my: 2,
    ml: 1,
    borderRadius: '50%',
    // mx: 'auto',
  };

  const sxCardContent = {
    // border: '1px solid red',
    display: 'flex',
    justifyContent: 'left',
    // gap: 2,
    alignItems: 'center',
    width: 250,
    height: 50,
    borderRadius: 5,
  }

  const sxCardTypography = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  }

  const sxTooltip = {
    borderRadius: 5,
  }

  return (
    <div className="container">
      <h2>Welcome To The Combo Page!</h2>

      {/* combo selector */}
      <ComboTool />

      {/* list of ingredients from DB */}
      {/* <ul>
        {ingredients.map((ingredient) => {
          return (
            <li
              key={ingredient.id}
              value={ingredient}
              onClick={() => dispatch({ type: 'SET_COMBO_INGREDIENT', payload: ingredient })}>{ingredient.name}
            </li>
          )
        })} 
      </ul> */}

      <Box sx={sxIngredientContainer}>
        {ingredients.map(ingredient => (
          <Tooltip sx={sxTooltip}
          title={
          <>
          <Typography
          variant="body1">{ingredient.description}</Typography>
          </>}
          >
            <Card elevation={3}
              onClick={() => dispatch({ type: 'SET_COMBO_INGREDIENT', payload: ingredient })}
              sx={sxCardContent}>
              <CardMedia
                sx={sxPhotoBox}
                component="img"
                image={ingredient.pic}
                alt={ingredient.name}
              />
              <Typography
                sx={sxCardTypography}
                gutterBottom variant="body1" component="div">
                {ingredient.name}
              </Typography>
            </Card>
          </Tooltip>
        ))}
      </Box>

      <RecipeList />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Combo;
