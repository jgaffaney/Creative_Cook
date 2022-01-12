import React, { useEffect, useState } from 'react';
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
import IngredientAutocomplete from '../IngredientAutocomplete/IngredientAutocomplete';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

// -- sx Styles -- //
import {
  sxFeedContainer,
  sxSearchContainer,
  sxPhotoIngredient,
  sxComboDescription,
} from '../Home/Home.style'

import {
  sxFeaturedCombo,
  sxMetrics,
  sxIngredientContainer,
  sxPhotoBox,
  sxCardContent,
  sxSuperComboCardContent,
  sxCardTypography,
  sxTooltip,
  sxSavedComboPaper,
  sxFeedPhotoIngredientContainer,
  sxSelectedComboOn,
} from './Feed.style';



function Feed() {
  // const user = useSelector((store) => store.user);
  const allUsers = useSelector((store) => store.allUsers);
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients);
  const combo = useSelector(store => store.combo)
  const userCombos = useSelector(store => store.userCombos);
  const top5 = useSelector(store => store.top5);

  const searchText = useSelector(store => store.ingredientSearch)
  // const pairings = useSelector(store => store.pairings)
  const pairingOne = useSelector(store => store.comboPairingOne)
  const pairingTwo = useSelector(store => store.comboPairingTwo)
  const healthFilter = useSelector(store => store.healthFilter)


  const [selectedComboStatus, setSelectedComboStatus] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS' });
    dispatch({ type: 'FETCH_COMBOS' });
    dispatch({ type: 'FETCH_TOP5' });
    dispatch({ type: 'FETCH_ALL_USERS' });
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

  // template for new challenge object that will send to DB
  const [newChallenge, setNewChallenge] = useState({
    type: 'Combo of the Week',
    description: '',
    combo_id: ''
  })

  // Sets newChallenge local state to the passed in input
  const handleDescriptionChange = (event, property) => {
    // setNewChallenge({ ...newChallenge, [property]: event.target.value })\
    // console.log('--- changing description', property);
    setNewChallenge({
      ...newChallenge,
      [property]: event.target.value
    })
  };

  
  const selectedSavedCombo = (event, combo) => {
    // console.log('--- clicked selectedCombo');
    setSelectedComboStatus(true)
    setNewChallenge({ ...newChallenge, combo_id: combo })
  }

  // Sends new challenge to the saga
  const addNewChallenge = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_CHALLENGE', payload: newChallenge });

    // clear input fields;
    setNewChallenge({ type: 'Combo of the Week', description: '', combo_id: '' })
    setOpen(true);
  };


  // SEARCH function will capture first ingredient and then push you to the combo page to complete combo
  const handleSearch = (searchText) => {

    // let's dump the reducer so we know it's empty before starting a new combo;
    dispatch({ type: 'CLEAR_COMBO_AND_RECIPE' })

    // console.log('CLICKED on handleSearch');
    // console.log('this is the searchText', searchText);

    const searchedIngredientOne = ingredients.filter(ingredient => ingredient.name === searchText)
    // console.log('--- searchedIngredientOne:', searchedIngredientOne);

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



  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  // console.log('--- Challenge', newChallenge);
  // console.log('--- topFiveIngredients', topFiveIngredients);



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

  const addDescription = () => {
    setNewChallenge({...newChallenge, description: 'This combo features ingredients to use for a healthy salad recipe to kick off the new year'})
  }

  const addSecondDescription = () => {
      setNewChallenge({...newChallenge, description: 'This combo features ingredients to challenge you to create a hearty but healthy winter dinner.'})
    }
  

  // combo tool and ingredient pair display
  return (
    <>
      <Box sx={sxMetrics}>
        <Typography variant='h4' sx={{ mb: 4 }}>App Wide User Metrics</Typography>
        <Box sx={sxMetrics}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item sx={{ height: 150 }}><Typography variant='h6'>Top 5 Ingredients Used:</Typography>
                <Typography variant='body1'>{topFiveIngredients[0]?.name} ({top5[0]?.times_used})</Typography>
                <Typography variant='body1'>{topFiveIngredients[1]?.name} ({top5[1]?.times_used})</Typography>
                <Typography variant='body1'>{topFiveIngredients[2]?.name} ({top5[2]?.times_used})</Typography>
                <Typography variant='body1'>{topFiveIngredients[3]?.name} ({top5[3]?.times_used})</Typography>
                <Typography variant='body1'>{topFiveIngredients[4]?.name} ({top5[4]?.times_used})</Typography>
              </Item>
            </Grid>

            <Grid item xs={4}>
              <Item sx={{ height: 150 }}><Typography variant='h6'>Top Ingredients by Type:</Typography>
                <Typography variant='body1'>Vegetables</Typography>
                <Typography variant='body1'>Protein: Land</Typography>
                <Typography variant='body1'>Fruits</Typography>
                <Typography variant='body1'>Grains</Typography>
                <Typography variant='body1'>Herbs</Typography>
              </Item>
            </Grid>

            <Grid item xs={4}>
              <Item sx={{ height: 150 }}><Typography variant='h6'>Number of Users:</Typography>
                <Typography variant='body1'>{allUsers[0]?.user_count} chefs created accounts</Typography>
              </Item>
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

        {/* ingredient pairings */}
        {/* super combo ingredients list */}
        {superCombo.length > 0 && combo.length < 3 &&
          <>
            <Typography sx={sxIngredientContainer}>Super Combos</Typography>
            <Box sx={sxIngredientContainer}>
              {superCombo.map(ingredient => (
                <Tooltip key={ingredient.id} sx={sxTooltip}
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
              <Tooltip key={ingredient.id} sx={sxTooltip}
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





        <Typography onClick={addDescription} variant='h4' sx={{ textAlign: "center", mt: 4, }}>Post Featured Combo To Home Page</Typography>
        <Typography onClick={addSecondDescription} variant='body1' sx={{ textAlign: "center", my: 2, }}>
          Select a saved combo from below | Provide a description | Click submit to post to the Home Page Feed</Typography>

        <Box elevation={4} sx={{ display: 'flex', alignItems: "center", justifyContent: "center", gap: 2 }}
        >

          <TextField
            sx={{ mb: 2, width: '60%' }}
            id="outlined-basic"
            variant="outlined"
            label="Description of Featured Combo"
            type="text"
            multiline
            rows={4}
            value={newChallenge.description}
            onChange={(event) => handleDescriptionChange(event, 'description')}
          />
          <Button sx={{ px: 3 }} onClick={addNewChallenge} variant="outlined">submit</Button>


        </Box>
        {/* <Button sx={{ width: 5 }} onClick={() => dispatch({ type: 'ADD_CHALLENGE', payload: newChallenge })} variant="contained">submit</Button> */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Combo Added to Feed!
          </Alert>

        </Snackbar>
      </Box>







      {/* code from the Home Page adapted for Feed*/}
      <Box sx={sxFeedContainer}>

        {userCombos?.map((content) => {
          // console.log('--- this is the feedContent', feedContent);
          // console.log('--- this is the content', content);
          // console.log('--- this is the content.ingredient list:', content.ingredient_list);

          const comboIngredientIds = content.ingredient_list;

          const feedContentFilteredIngredients = ingredients?.filter(item => {
            return comboIngredientIds.indexOf(item.id) != -1;
          });
          // console.log('--- feedContentFilteredIngredients filtered down ingredients based on ingredients list', feedContentFilteredIngredients);

          // ensure we keep the same order of ingredients for when we click on the combo and it populates the reducer; 
          const ingredientOne = feedContentFilteredIngredients.filter(ingredient => ingredient?.id === comboIngredientIds[0])
          // console.log('--- feedContent .map ingredientOne', ingredientOne);
          const ingredientTwo = feedContentFilteredIngredients.filter(ingredient => ingredient?.id === comboIngredientIds[1])
          // console.log('--- feedContent .map ingredientTwo', ingredientTwo);
          const ingredientThree = feedContentFilteredIngredients.filter(ingredient => ingredient?.id === comboIngredientIds[2])
          // console.log('--- feedContent .map ingredientThree', ingredientThree);

          // newChallenge.combo_id === 

          return (

            // give combo card a border when clicking so when know which one we are sending to the feed
            <Box key={content.id} sx={content.id === newChallenge.combo_id && selectedComboStatus ?
              sxSelectedComboOn : undefined}>

              <Paper onClick={(event) => selectedSavedCombo(event, content.id)} sx={sxSavedComboPaper} elevation={2}>
                {/* needed an extra Box just to separate the comboClick; remove button sits on top of this DIV and  fire when combo card is clicked on */}
                <Box >

                  {/* <Typography variant="body1" sx={{ textAlign: 'center' }} >{content.date_posted?.split('T')[0]}</Typography> */}

                  <Typography variant="h6" sx={{ textAlign: 'center' }}>{content.name}</Typography>

                  <Box sx={sxFeedPhotoIngredientContainer}>
                    <CardMedia sx={sxPhotoIngredient} component="img" image={ingredientOne[0]?.pic} />

                    <CardMedia sx={sxPhotoIngredient} component="img" image={ingredientTwo[0]?.pic} />

                    {/* check to see if we have a 3rd ingredient before appending */}
                    {content.ingredient_list?.length > 2 &&
                      <CardMedia sx={sxPhotoIngredient} component="img" image={ingredientThree[0]?.pic} />}
                  </Box>

                  <Typography variant="body1" sx={sxComboDescription}>{content.description}</Typography>

                </Box>
                {/* 
              <Button onClick={() => handleClick('remove', content)}
                sx={{ mx: 'auto', my: 1 }}
                variant="outlined"
                size="small">Add To Home Page Feed </Button> */}

              </Paper>
            </Box>
          )
        })}
      </Box>
    </>
  );
}

// this allows us to use <App /> in index.js
export default Feed;
