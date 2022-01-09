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
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IngredientAutocomplete from '../IngredientAutocomplete/IngredientAutocomplete';

import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';




// -- sx Styles -- //
import { sxSearchContainer } from '../Home/Home.style'

function Feed() {
  const user = useSelector((store) => store.user);
  const recipes = useSelector(store => store.recipe);
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients);
  const combo = useSelector(store => store.combo)
  const userCombos = useSelector(store => store.userCombos);
  const top5 = useSelector(store => store.top5);

  const searchText = useSelector(store => store.ingredientSearch)
  const pairings = useSelector(store => store.pairings)
  const pairingOne = useSelector(store => store.comboPairingOne)
  const pairingTwo = useSelector(store => store.comboPairingTwo)
  const healthFilter = useSelector(store => store.healthFilter)

  useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS' });
    dispatch({ type: 'FETCH_COMBOS' });
    dispatch({ type: 'FETCH_TOP5' });
  }, [])

  useEffect(() => {
    switch (combo.length) {
      case 1:
        dispatch({ type: 'FETCH_INGREDIENT_ONE_PAIRINGS', payload: combo[0].id });
        break;
      case 2:
        dispatch({ type: 'FETCH_INGREDIENT_TWO_PAIRINGS', payload: combo[1].id });
        break;
      case 3:
        dispatch({
          type: 'FETCH_RECIPES', payload: {
            combo: combo,
            filter: healthFilter
          }
        });
        break;
    }
  }, [combo])

  const [newChallenge, setNewChallenge] = useState({ type: 'Combo of the Week', description: '', combo_id: '' })

  //Sets newChallenge local state to the passed in input
  const handlePropertyChange = (event, property) => {
    setNewChallenge({ ...newChallenge, [property]: event.target.value })
  };

  // Sends new challenge to the saga
  const addNewChallenge = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_CHALLENGE', payload: newChallenge });
    setNewChallenge({ type: 'Combo of the Week', description: '', combo_id: '' })
    setOpen(true);
  };

  // SEARCH function will capture first ingredient and then push you to the combo page to complete combo
  const handleSearch = (searchText) => {

    // let's dump the reducer so we know it's empty before starting a new combo;
    dispatch({ type: 'CLEAR_COMBO_AND_RECIPE' })

    console.log('CLICKED on handleSearch');
    console.log('this is the searchText', searchText);

    const searchedIngredientOne = ingredients.filter(ingredient => ingredient.name === searchText)
    console.log('--- searchedIngredientOne:', searchedIngredientOne);

    // ensures user only moves to combo page if they have selected from the list (Must Select From The List!)
    if (searchedIngredientOne.length === 0) {
      return alert('Make a selection from the list')
    }
    // put ingredient into the reducer
    dispatch({ type: 'SET_COMBO_INGREDIENT', payload: searchedIngredientOne[0] })
  }

  let topFiveIngredients = []
  for (let ingredient of ingredients) {
    if (ingredient?.id === top5[0]?.ingredient_id) {
      topFiveIngredients.push(ingredient)
    } else if (ingredient?.id === top5[1]?.ingredient_id) {
      topFiveIngredients.push(ingredient)
    } else if (ingredient?.id === top5[2]?.ingredient_id) {
      topFiveIngredients.push(ingredient)
    } else if (ingredient?.id === top5[3]?.ingredient_id) {
      topFiveIngredients.push(ingredient)
    } else if (ingredient?.id === top5[4]?.ingredient_id) {
      topFiveIngredients.push(ingredient)
    }
  }

  // Alert showing combo was added to feed
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
    height: 'auto',
  }

  const sxFlavorCombos = {
    border: '1px solid black',
    // display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    overflow: 'auto',
    mb: 2
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  console.log('Challenge', newChallenge);
  console.log(topFiveIngredients);

  const sxIngredientContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    // border: '1px solid red',
    gap: 2,
    justifyContent: 'center',
    mb: 2,
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

  const sxSuperComboCardContent = {
    border: '5px solid #00d61d',
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




  // superCombo is filters the two ingredient pairings and creates new array with duplicates
  let superCombo = pairingOne.filter(o1 => pairingTwo.some(o2 => o1.id === o2.id));

  const pairingOneIds = new Set(pairingOne.map(({ id }) => id));
  const superComboIds = new Set(superCombo.map(({ id }) => id));

  // filter any duplicate ingredients out of two pairing lists
  let combined = [
    ...pairingOne,
    ...pairingTwo.filter(({ id }) => !pairingOneIds.has(id))
  ];

  // filter out super combo ingredients from combined pairing list
  combined = [
    ...combined.filter(({ id }) => !superComboIds.has(id))
  ]

  // filter out ingredients in combo tool from ingredient listing
  if (combo.length === 2) {
    combined = combined.filter(ingredient => ingredient.id != combo[0].id).filter(ingredient => ingredient.id != combo[1].id);
  }


  return (
    <>
      <Box sx={sxMetrics}>
        <Typography variant='h4' sx={{ mb: 4 }}>App Wide User Metrics</Typography>
        <Box sx={sxMetrics}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>Top 5 Ingredients Used:
                <Typography sx={{ fontSize: 12 }}>{topFiveIngredients[0]?.name} ({top5[0]?.times_used})</Typography>
                <Typography sx={{ fontSize: 12 }}>{topFiveIngredients[1]?.name} ({top5[1]?.times_used})</Typography>
                <Typography sx={{ fontSize: 12 }}>{topFiveIngredients[2]?.name} ({top5[2]?.times_used})</Typography>
                <Typography sx={{ fontSize: 12 }}>{topFiveIngredients[3]?.name} ({top5[3]?.times_used})</Typography>
                <Typography sx={{ fontSize: 12 }}>{topFiveIngredients[4]?.name} ({top5[4]?.times_used})</Typography>
              </Item>
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
        <Typography variant='h4' sx={{ textAlign: "center", my: 4 }}>Create Featured Combo</Typography>

        {/* ingredient search */}
        {combo.length === 0 &&
          <>
            <Typography sx={sxSearchContainer}
              variant="h5">Find Your First Ingredient</Typography>
            <Box sx={sxSearchContainer}>

              <IngredientAutocomplete />
              <Button onClick={() => handleSearch(searchText)} variant="outlined">search</Button>
            </Box>
          </>
        }

        {/* combo selector */}
        <ComboTool />

        {/* list of ingredients from DB */}
        {/* <ul>
          {ingredients.map((ingredient) => {
            return (
              <li
                key={ingredient.id}
                value={ingredient}
                onClick={() => dispatch({ type: 'SET_COMBO_INGREDIENT', payload: ingredient })}>{ingredient.name}</li>
            )
          })}
        </ul> */}
        {/* <br /> */}




        {/* super combo ingredients list */}

        {superCombo.length > 0 && combo.length < 3 &&
          <>
            <Typography sx={sxIngredientContainer}>Super Combos</Typography>
            <Box sx={sxIngredientContainer}>
              {superCombo.map(ingredient => (
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
                    sx={sxSuperComboCardContent}>
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
          </>
        }

        {/* combined ingredient listing with no duplicates */}
        {combo.length > 0 && combo.length < 3 &&
          <Box sx={sxIngredientContainer}>
            {combined.map(ingredient => (
              <Tooltip sx={sxTooltip}
                title={
                  <>
                    <Typography variant="body1">{ingredient.description}</Typography>
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
        }



        <Typography sx={{ textAlign: "center" }}>Saved Flavor Combos</Typography>
        <Box sx={sxFlavorCombos}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {userCombos.map((combo) => {

              return (
                <Grid item xs={2} sm={4} md={4} key={combo.id} >
                  <Item
                    onClick={(event) => handlePropertyChange(event, 'combo_id')}
                  >
                    <List>
                      <ListItem sx={{ p: 3, border: '1px solid black' }} value={combo.id}>{combo.name}</ListItem>
                    </List>

                  </Item>
                </Grid>
              )
            })}
          </Grid>
        </Box>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            sx={{ mb: 2, width: '60%', mx: 'auto' }}
            id="outlined-basic"
            variant="outlined"
            label="Description of Featured Combo"
            type="text"
            value={newChallenge.description}
            onChange={(event) => handlePropertyChange(event, 'description')}
          />
          <Button sx={{ width: 5 }} onClick={addNewChallenge} variant="contained">submit</Button>
        </Grid>
        {/* <Button sx={{ width: 5 }} onClick={() => dispatch({ type: 'ADD_CHALLENGE', payload: newChallenge })} variant="contained">submit</Button> */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Combo Added to Feed!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

// this allows us to use <App /> in index.js
export default Feed;
