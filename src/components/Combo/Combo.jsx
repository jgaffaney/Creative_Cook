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
import IngredientAutocomplete from '../IngredientAutocomplete/IngredientAutocomplete';
import { sxSearchContainer } from '../Home/Home.style'

function Combo() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients);
  const combo = useSelector(store => store.combo)

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

  const searchText = useSelector(store => store.ingredientSearch)
  const pairings = useSelector(store => store.pairings)
  const pairingOne = useSelector(store => store.comboPairingOne)
  const pairingTwo = useSelector(store => store.comboPairingTwo)


  const handleSearch = (searchText) => {
    console.log('CLICKED on handleSearch');
    console.log('this is the searchText', searchText);

    const searchedIngredientOne = ingredients.filter(ingredient => ingredient.name === searchText)
    console.log('--- searchedIngredientOne:', searchedIngredientOne);

    // ensures user only moves to combo page if they have selected from the list (Must Select From The List!)
    if (searchedIngredientOne.length === 0) {
      return alert('Make a selection from the list')
    }
    // put ingredient into the reducer
    dispatch({ type: 'CLEAR_COMBO_AND_RECIPE' })
    dispatch({ type: 'SET_COMBO_INGREDIENT', payload: searchedIngredientOne[0] })
    // dispatch({ type: 'FETCH_INGREDIENT_ONE_PAIRINGS', payload: searchedIngredientOne[0].id })
  }

  useEffect(() => {
    switch (combo.length) {
      case 1:
        dispatch({ type: 'FETCH_INGREDIENT_ONE_PAIRINGS', payload: combo[0].id });
        break;
      case 2:
        dispatch({ type: 'FETCH_INGREDIENT_TWO_PAIRINGS', payload: combo[1].id });
        break;
      case 3:
        dispatch({ type: 'FETCH_RECIPES', payload: combo });
        break;
    }
  }, [combo])

 const pairingOneIds = new Set (pairingOne.map(({ id }) => id ));
 const combined = [
   ...pairingOne,
   ...pairingTwo.filter(({ id }) => !pairingOneIds.has(id))
 ];
 console.log('combined is:', combined);
 
  return (
    <div className="container">

      {/* ingredient search */}
      {combo.length === 0 ?
        <>
          <Typography sx={sxSearchContainer}
            variant="h5">Find Your First Ingredient</Typography>
          <Box sx={sxSearchContainer}>

            <IngredientAutocomplete />
            <Button onClick={() => handleSearch(searchText)} variant="contained">search</Button>
          </Box>
        </>
        : <></>}
      {/* combo selector */}
      <ComboTool />

      {/* ingredient listing */}
      {combo.length > 0 && combo.length < 3 ?

        <Box sx={sxIngredientContainer}>
          {combined.map(ingredient => (
            <Tooltip sx={sxTooltip}
              title={
                <>
                  <Typography
                    variant="body1">{ingredient.description}</Typography>
                </>
              }
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
        : <p></p>}

      <RecipeList />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Combo;
