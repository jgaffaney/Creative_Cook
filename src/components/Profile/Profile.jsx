import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import Confetti from 'react-confetti'
import { useWindowSize, useTimeout } from 'react-use';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
  CardActionArea,
  CardHeader,
  Avatar,
  IconButton,
  Paper
} from '@mui/material';

import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

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
  sxRecipeContainer,
  sxRecipeCard,
  sxCardContent,
  sxCardTitle,
  sxBox,
  sxCardActions,
  sxPhotoIngredientContainer,
} from './Profile.style';

import {
  sxPhotoIngredient,
  sxClickableCombo,
} from '../Home/Home.style';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useHistory } from 'react-router';

function Profile() {
  const user = useSelector((store) => store.user);
  const userCombos = useSelector((store) => store.userCombos);
  const userIngredients = useSelector((store) => store.userIngredients);
  const userRecipes = useSelector((store) => store.userRecipes);
  const comboGoal = useSelector((store) => store.comboGoal);
  const ingredientGoal = useSelector((store) => store.ingredientGoal);
  const ingredientUnique = useSelector((store) => store.ingredientUnique);
  const recipeGoal = useSelector((store) => store.recipeGoal);
  const recipeSaved = useSelector((store) => store.recipeSaved);
  const goal = useSelector((store) => store.goal);
  console.log('--- profile page goal', goal);
  const comboMetrics = useSelector((store) => store.comboMetrics);
  const recipeMetrics = useSelector((store) => store.recipeMetrics);
  const ingredientMetrics = useSelector((store) => store.ingredientMetrics);
  const ingredients = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();
  const history = useHistory();

  const { width, height } = useWindowSize();
  const [isComplete] = useTimeout(8000);

  const [open, setOpen] = React.useState(true);

  const [updateComboGoal, setUpdateComboGoal] = useState({ goal: 0, name: 'combo', metric_id: 1 });
  const [updateRecipeGoal, setUpdateRecipeGoal] = useState({ goal: 0, name: 'recipe', metric_id: 2 });
  const [updateIngredientGoal, setUpdateIngredientGoal] = useState({ goal: 0, name: 'ingredient', metric_id: 3 });

  useEffect(() => {
    dispatch({ type: 'FETCH_COMBOS' })
    dispatch({ type: 'FETCH_COMBO_GOAL' })
    dispatch({ type: 'FETCH_INGREDIENT_GOAL' })
    dispatch({ type: 'FETCH_INGREDIENT_UNIQUE' })
    dispatch({ type: 'FETCH_RECIPE_GOAL' })
    dispatch({ type: 'FETCH_RECIPE_SAVED' })
    dispatch({ type: 'FETCH_COMBO_METRICS' })
    dispatch({ type: 'FETCH_USER_RECIPES' })
    dispatch({ type: 'FETCH_RECIPE_METRICS' })
    dispatch({ type: 'FETCH_INGREDIENT_METRICS' })
    dispatch({ type: 'FETCH_INGREDIENTS' })
  }, [])

  // handle Change with user set goals
  const handleComboChange = (event, property) => {
    setUpdateComboGoal({ ...updateComboGoal, [property]: event.target.value })
  };

  const handleRecipeChange = (event, property) => {
    setUpdateRecipeGoal({ ...updateRecipeGoal, [property]: event.target.value })
  };

  const handleIngredientChange = (event, property) => {
    setUpdateIngredientGoal({ ...updateIngredientGoal, [property]: event.target.value })
  };

  //Set Goals on submit click
  const handleComboGoalClick = (event) => {
    dispatch({ type: 'UPDATE_COMBO_GOAL', payload: updateComboGoal })
  }

  const handleRecipeGoalClick = (event) => {
    dispatch({ type: 'UPDATE_RECIPE_GOAL', payload: updateRecipeGoal })
  }

  const handleIngredientGoalClick = (event) => {
    dispatch({ type: 'UPDATE_INGREDIENT_GOAL', payload: updateIngredientGoal })
  }

  //Update Buttons for Goals
  const resetComboGoal = (event) => {
    dispatch({ type: 'RESET_COMBO_GOAL', payload: updateComboGoal })
  }

  const resetRecipeGoal = (event) => {
    dispatch({ type: 'RESET_RECIPE_GOAL', payload: updateRecipeGoal })
  }

  const resetIngredientGoal = (event) => {
    dispatch({ type: 'RESET_INGREDIENT_GOAL', payload: updateIngredientGoal })
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

   // pageDirection clicks to take to you to the right page.
   function handleClick(action, ingredientOne, ingredientTwo, ingredientThree) {

    switch (action) {
        case 'combo':
            console.log('CLICKED on the featured combo');
            console.log('--- the three ingredients to send to dispatch', ingredientOne, ingredientTwo, ingredientThree);

            const comboArray = [ ingredientOne[0], ingredientTwo[0], ingredientThree[0] ]
            console.log('--- custom comboArray for searching recipes', comboArray);

            // first make sure the reducer is empty and ready to receive the combo we click on;
            dispatch({ type: 'CLEAR_COMBO_AND_RECIPE' })

            dispatch({ type: 'SET_COMBO_INGREDIENT', payload: ingredientOne[0] })
            dispatch({ type: 'SET_COMBO_INGREDIENT', payload: ingredientTwo[0] })
            // only dispatch the 3rd ingredient if there's 3 ingredients in the combo; 
            { ingredientThree && dispatch({ type: 'SET_COMBO_INGREDIENT', payload: ingredientThree[0] }) }
            
            // dispatch({ type: 'FETCH_RECIPES', payload: combo })
            // console.log('--- selectCombo', comboArray);

            history.push('/combo')
            break;

        default:
            break;
    }
}; // handleClick


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
            <Typography size={24}>Goal Progress</Typography>
            <Grid container spacing={2} alignItems="stretch">

              {comboGoal.goal == 0 &&
                <Grid item xs={4}>
                  <Alert severity="success">
                    <AlertTitle>Set Your Combo Goal! </AlertTitle>
                    Progress Currently at {userCombos.length} — <strong>try it out!</strong>
                  </Alert>
                  <TextField
                    id="outlined-number"
                    label="Set Combo Goal"
                    type="number"
                    onChange={(event) => handleComboChange(event, 'goal')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Button variant="outlined" onClick={handleComboGoalClick}>Set Combo Goal</Button>
                </Grid>
              }

              {comboGoal.goal > 0 &&
                <Grid item xs={4}>
                  <Typography>New Combos - Goal: {comboGoal.goal}  </Typography>
                  <Item >Goal Progress: {userCombos.length}/{comboGoal.goal}</Item>
                  <Button variant="outlined" onClick={() => resetComboGoal()}>Update Combo Goal</Button>
                  {(userCombos.length >= comboGoal.goal) &&
                    <Confetti width={width} height={height} recycle={!isComplete()} />
                  }
                  {(userCombos.length >= comboGoal.goal) &&
                    <Collapse in={open}>
                      <Alert
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                      >
                        <AlertTitle>Congratulations!! You hit your Combo Goal! </AlertTitle>
                        Update your Goal and <strong>Keep on Cooking!</strong>
                      </Alert>
                    </Collapse>
                  }
                </Grid>}

              {recipeGoal.goal == 0 &&
                <Grid item xs={4}>
                  <Alert severity="success">
                    <AlertTitle>Set Your Recipe Goal!</AlertTitle>
                    Progress Currently at {recipeSaved.length} — <strong>try it out!</strong>
                  </Alert>
                  <TextField
                    id="outlined-number"
                    label="Set Recipe Goal"
                    type="number"
                    onChange={(event) => handleRecipeChange(event, 'goal')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Button variant="outlined" onClick={handleRecipeGoalClick}>Set Recipe Goal</Button>
                </Grid>
              }

              {recipeGoal.goal > 0 &&
                <Grid item xs={4}>
                  <Typography>New Recipes - Goal: {recipeGoal.goal}  </Typography>
                  <Item>Goal Progress: {recipeSaved.length}/{recipeGoal.goal}</Item>
                  <Button variant="outlined" onClick={() => resetRecipeGoal()}>Update Recipe Goal</Button>
                  {(recipeSaved.length >= recipeGoal.goal) &&
                    <Confetti width={width} height={height} recycle={!isComplete()} />
                  }
                  {(recipeSaved.length >= recipeGoal.goal) &&
                    <Collapse in={open}>
                      <Alert
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                      >
                        <AlertTitle>Congratulations!! You hit your Recipe Goal!</AlertTitle>
                        Update your Goal and <strong>Keep on Cooking!</strong>
                      </Alert>
                    </Collapse>}
                </Grid>}

              {ingredientGoal.goal == 0 &&
                <Grid item xs={4}>
                  <Alert severity="success">
                    <AlertTitle>Set Your Ingredient Goal!</AlertTitle>
                    Progress Currently at {ingredientUnique.length} — <strong>try it out!</strong>
                  </Alert>
                  <TextField
                    id="outlined-number"
                    label="Set Ingredient Goal"
                    type="number"
                    onChange={(event) => handleIngredientChange(event, 'goal')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Button variant="outlined" onClick={handleIngredientGoalClick}>Set Ingredient Goal</Button>

                </Grid>
              }

              {ingredientGoal.goal > 0 &&
                <Grid item xs={4}>
                  <Typography>New Ingredients - Goal: {ingredientGoal.goal}  </Typography>
                  <Item>Goal Progress: {ingredientUnique.length}/{ingredientGoal.goal}</Item>
                  <Button variant="outlined" onClick={() => resetIngredientGoal()}>Update Ingredient Goal</Button>
                  {(ingredientUnique.length >= ingredientGoal.goal) &&
                    <Confetti width={width} height={height} recycle={!isComplete()} />
                  }
                  {(ingredientUnique.length >= ingredientGoal.goal) &&
                    <Collapse in={open}>
                      <Alert
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                      >
                        <AlertTitle>Congratulations!! You hit your Ingredient Goal!</AlertTitle>
                        Update your Goal and <strong>Keep on Cooking!</strong>
                      </Alert>
                    </Collapse>}
                </Grid>}
            </Grid>
            <Typography size={18}>Metrics</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {comboMetrics[0] && <>
                  <Item>Combos Made in the Past Seven Days: {comboMetrics[0].weekly}</Item>
                  <Item>Combos Made in the Past 30 Days: {comboMetrics[0].monthly}</Item>
                  <Item>Combos Made in the Past 365 Days: {comboMetrics[0].yearly}</Item></>}
              </Grid>
              <Grid item xs={4}>
                {recipeMetrics[0] && <>
                  <Item>Recipes Cooked in the Past Seven Days: {recipeMetrics[0].weekly}</Item>
                  <Item>Recipes Cooked in the Past 30 Days: {recipeMetrics[0].monthly}</Item>
                  <Item>Recipes Cooked in the Past 365 Days: {recipeMetrics[0].yearly}</Item></>}
              </Grid>
              <Grid item xs={4}>
                {ingredientMetrics[0] && <>
                  <Item>Unique Ingredients Used in the Past Seven Days: {ingredientMetrics[0].weekly}</Item>
                  <Item>Unique Ingredients Used in the Past 30 Days: {ingredientMetrics[0].monthly}</Item>
                  <Item>Unique Ingredients Used in the Past 365 Days: {ingredientMetrics[0].yearly}</Item></>}
              </Grid>
            </Grid>
          </Box>
          <Typography sx={{ textAlign: "center" }}>Saved Flavor Combos</Typography>
          <Box sx={sxBottomSection}>
            <Typography size={18}>Saved Flavor Combos</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            </Grid>
            <Box sx={sxRecipeContainer}>
              {userCombos.length > 0 &&
                userCombos.map(combo => {

                  const comboIngredientIds = combo.ingredient_list;

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



                  return (
                    <>
                      <Card elevation={3}
                        sx={sxRecipeCard}>
                        <Box onClick={() => handleClick('combo', ingredientOne, ingredientTwo, ingredientThree)} sx={sxClickableCombo}>
                          <Box sx={sxPhotoIngredientContainer}>
                            <CardMedia sx={sxPhotoIngredient} component="img" image={ingredientOne[0]?.pic} />

                            <CardMedia sx={sxPhotoIngredient} component="img" image={ingredientTwo[0]?.pic} />

                            {/* check to see if we have a 3rd ingredient before appending */}
                            {combo.ingredient_list?.length > 2 &&
                              <CardMedia sx={sxPhotoIngredient} component="img" image={ingredientThree[0]?.pic} />}
                          </Box>
                        </Box>
                        <CardContent sx={sxCardContent}>
                          <Typography
                            sx={sxCardTitle}
                            mt={-3}
                            gutterBottom variant="h5" component="div">
                            {combo.name}
                          </Typography>
                          <Box sx={sxBox}>
                            <Typography
                              mt={0}
                              variant="body2" color="text.secondary">
                              <>
                                {
                                  <ul>
                                    {userRecipes.map(recipe => (
                                      <> <Typography
                                        key={recipe.id}
                                        onClick={() => window.open(`_${recipe.url}`.split(`_`)[1], `_blank`)}
                                        size="small"
                                      >{recipe.combo_id === combo.id && recipe.label}</Typography>
                                        {recipe.combo_id === combo.id && recipe.is_cooked === false &&
                                          <Button
                                            onClick={() => dispatch({
                                              type: 'UPDATE_RECIPE',
                                              payload: { recipe }
                                            })}
                                          >Cooked</Button>}</>
                                    ))}
                                  </ul>
                                }
                              </>
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </>
                  )
                })}
            </Box>

          </Box>
        </Box>
      </Box>
    </Box >
  );
}

export default Profile;


