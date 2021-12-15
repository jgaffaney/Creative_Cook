import React, { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { fontSize } from '@mui/system';


function Home() {

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const ingredients = useSelector((store) => store.ingredients);
  // const userProfile = useSelector((store) => store.userProfile);
  // const feed = useSelector((store) => store.feed);
  const feedContent = useSelector((store) => store.challenge)
  // const combos = useSelector((store) => store.combo)

  useEffect(() => {
    dispatch({ type: 'FETCH_CHALLENGE' });
    dispatch({ type: 'FETCH_COMBOS' });
    dispatch({ type: 'FETCH_INGREDIENTS' });
  }, []);


  const handleSearch = () => {
    console.log('CLICKED on handleSearch');
  }

  // CONTAINER that centers everything on this page
  const sxHomePageContainer = {
    // border: '1px solid red',
    display: 'flex',
    justifyContent: 'center',
  }

  // PAGE CONTENT holds the left column and the right column
  const sxPageContent = {
    border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    height: '100%',
    m: 2
  }

  // LEFT COLUMN holds all of the profile / metrics / goal info
  const sxLeftColumn = {
    border: '1px solid green',
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
  }

  // PROFILE PHOTOS properties being held in the left column
  const sxPhotoBox = {
    // border: '1px solid lightgray',
    width: 120,
    height: 120,
    boxShadow: 3,
    mb: .25,
    borderRadius: 1,
  };


  // RIGHT COLUMN holds the top and bottom sections 
  const sxRightColumn = {
    border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: '100%',
  }

  // TOP SECTION holds the flavor combo tool
  const sxTopSection = {
    border: '1px solid lightblue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 300,
  }

  // BOTTOM SECTION holds the feed content
  const sxBottomSection = {
    border: '1px solid lightblue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 300,
  }

  // FEED CONTAINER holds the actual content / combo cards 
  const sxFeedContainer = {
    border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 250,
  }


  return (
    <Box sx={sxHomePageContainer}>
      <Box sx={sxPageContent}>

        <Box sx={sxLeftColumn}>

          {/* user PROFILE section */}
          <Box>
            <Typography>Side Section: User Profile</Typography>
            <CardMedia sx={sxPhotoBox} component="img" image={user.pic} />
            <Typography>{user.username}</Typography>
            <Typography>{user.display_name}</Typography>
            <Typography>{user.bio}</Typography>
          </Box>
          <br />

          {/* any METRICS will go here */}
          <Box>
            <Typography>Side Section: Metrics</Typography>
          </Box>
          <br />

          {/* recent COMBOS */}
          <Box>
            <Typography>Side Section: Recent Combos</Typography>
          </Box>
          <br />

          {/* GOALS progress */}
          <Box>
            <Typography>Side Section: Goal Progress</Typography>
          </Box>

        </Box>


        <Box sx={sxRightColumn}>

          <Box sx={sxTopSection}>
            <Typography>Top Section: Create Flavor Combo</Typography>
            <TextField id="outlined-basic" variant="outlined" />
            <Button onClick={() => handleSearch()} variant="contained">search</Button>
          </Box>

          <Box sx={sxBottomSection}>
            <Typography>Bottom Section: Curated Feed</Typography>
            <Box sx={sxFeedContainer}>
              {feedContent.map((content) => {
                let feedContentIngredients = [];
                let IngArray = content.ingredient_list
                function ingredientFilter(ingredients) {
                  // for (let i = 0; i < ingredients.length; i++) {
                  //   if (ingredients[i].id === IngArray[0]) {
                  //     feedContentIngredients.push(ingredients[i])
                  //   } else if (ingredients[i].id === IngArray[1]) {
                  //     feedContentIngredients.push(ingredients[i])
                  //   } else if (ingredients[i].id === IngArray[2]) {
                  //     feedContentIngredients.push(ingredients[i])
                  //   }
                  for (let ingredient of ingredients) {
                    if (ingredient.id === IngArray[0]) {
                      feedContentIngredients.push(ingredient)
                    } else if (ingredient.id === IngArray[1]) {
                      feedContentIngredients.push(ingredient)
                    } else if (ingredient.id === IngArray[2]) {
                      feedContentIngredients.push(ingredient)
                    }
                  }
                }


                ingredientFilter(ingredients)
                console.log('ing id\'s', IngArray);
                console.log('feed ing', feedContentIngredients);

                return (
                  <Grid
                    container
                    textAlign="center"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '10vh' }}
                    key={content.id}
                  >
                    <Paper sx={{width: '15cm', m: 2}}>
                      <Typography sx={{fontSize: 25}}>{content.name}</Typography>
                      <Typography>{content.description}</Typography>
                      <Typography>{feedContentIngredients[0]?.name}, {feedContentIngredients[1]?.name}{feedContentIngredients[2] ? (', ' + feedContentIngredients[2]?.name) : ""}</Typography>
                    </Paper>
                  </Grid>
                )
              })}
            </Box>
          </Box>

        </Box>

      </Box>
    </Box >
  );
};


export default Home;
