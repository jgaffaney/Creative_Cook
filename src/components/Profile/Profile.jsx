import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
// import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
// import AddTaskIcon from '@mui/icons-material/AddTask';
// import DeleteIcon from '@mui/icons-material/Delete';
// import RefreshIcon from '@mui/icons-material/Refresh';
import Confetti from 'react-confetti'
import { useWindowSize, useTimeout } from 'react-use';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

import {
  Box,
  Card,
  // CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
  // CardActionArea,
  // CardHeader,
  // Avatar,
  IconButton,
  Paper,
  // ImageList,
  // Tooltip,
} from '@mui/material';

import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

// --- MUI sx STYLES --- // 
import {
  sxProfilePageContainer,
  sxPageContent,
  sxLeftColumn,
  sxTopLeftSection,
  sxTopMiddleSection,
  sxTopRightSection,
  sxMiddleSection,
  sxPhotoBox,
  sxRightColumn,
  sxBottomSection,
  // sxButtonBox,
  // sxGoals,
  sxRecipeContainer,
  sxRecipeCard,
  sxCardContent,
  sxCardTitle,
  sxBox,
  // sxCardActions,
  sxPhotoIngredientContainer,
  sxRecipeUrl,
  sxRecipeButton,
} from './Profile.style';

import {
  sxPhotoIngredient,
  sxClickableCombo,
} from '../Home/Home.style';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useHistory } from 'react-router';
// import { fontStyle } from '@mui/system';

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
  // const goal = useSelector((store) => store.goal);
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

  const recentCombos = userCombos?.slice(0, 3);
  // pageDirection clicks to take to you to the right page.
  function handleClick(action, ingredientOne, ingredientTwo, ingredientThree) {

    switch (action) {
      case 'combo':
        // console.log('CLICKED on the featured combo');
        // console.log('--- the three ingredients to send to dispatch', ingredientOne, ingredientTwo, ingredientThree);

        const comboArray = [ingredientOne[0], ingredientTwo[0], ingredientThree[0]]
        // console.log('--- custom comboArray for searching recipes', comboArray);

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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Box sx={sxProfilePageContainer}>
      <Box sx={sxPageContent}>
        <Box sx={sxRightColumn}>
          <Box sx={sxLeftColumn}>
            <Box sx={sxTopLeftSection}>
              <Typography>{capitalizeFirstLetter(user.username)}</Typography>
              <CardMedia sx={sxPhotoBox} component="img" image={user.pic} />
              <LogOutButton />
            </Box>
            <Box sx={sxTopMiddleSection}>
            <img height="110%" width="90%" src = "images/logo.png"></img>
              </Box>
              <Box sx={sxTopRightSection} >
              {/* {user.bio ? <Typography fontSize={18}>{user.bio}</Typography> : <Typography fontSize={18}>{user.username} is a new user!</Typography>}
              <br /> */}
              {/* <img  src = "images/tri.jpeg"></img> */}
              <Typography variant="h6" sx={{textAlign: "center", textDecoration: "underline"}} >Recent Combos</Typography>
                        {recentCombos?.map((combo, i) => (
                            <Typography key={i} >{combo.name}</Typography>
                        ))}
              {/* <br />
              {user.birthday ? <Typography>{user.birthday?.split('T')[0]}</Typography> : <Typography></Typography>}
              <br />
              {user.location ? <Typography>Location: {user.location}</Typography> : <Typography></Typography>} */}               
            </Box>
          </Box>
          <br />
          <br />
          <br />
          <br />
          <Box sx={sxMiddleSection}>
            <Typography variant="h4" >Goal Progress</Typography>
            <br />
            <Grid container spacing={2} alignItems="stretch">
              {comboGoal.goal == 0 &&
                <Grid item xs={4}>
                  <Alert severity="success">
                    <AlertTitle>Set Your Combo Goal! </AlertTitle>
                    Progress Currently at {userCombos.length} — <strong>try it out!</strong>
                  </Alert>
                  <br />
                  <TextField
                    size="small"
                    id="outlined-number"
                    label="Set Combo Goal"
                    // placeholder='Set Combo Goal'
                    type="number"
                    style={{
                      backgroundColor: "white"
                    }}
                    InputProps={{
                      style: {
                        color: "blue"
                      }
                    }}
                    onChange={(event) => handleComboChange(event, 'goal')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Button size="medium" variant="contained" endIcon={<CheckIcon />} onClick={handleComboGoalClick}>Set Combo Goal</Button>
                </Grid>
              }

              {comboGoal.goal > 0 &&
                <Grid item xs={4}>
                  <Item sx={{ fontWeight: 'bold' }} >New Combos - Goal: {comboGoal.goal}  </Item>
                  <br />
                  <Item >Goal Progress: {userCombos.length}/{comboGoal.goal}</Item>
                  <Button size="small" variant="contained" endIcon={<AddIcon />} onClick={() => resetComboGoal()}>Update Combo Goal</Button>
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
                  <br />
                  <TextField
                    size="small"
                    id="outlined-number"
                    label="Set Recipe Goal"
                    // placeholder='Set Recipe Goal'
                    type="number"
                    style={{
                      backgroundColor: "white"
                    }}
                    InputProps={{
                      style: {
                        color: "blue"
                      }
                    }}
                    onChange={(event) => handleRecipeChange(event, 'goal')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Button size="medium" variant="contained" endIcon={<CheckIcon />} onClick={handleRecipeGoalClick}>Set Recipe Goal</Button>
                </Grid>
              }

              {recipeGoal.goal > 0 &&
                <Grid item xs={4}>
                  <Item sx={{ fontWeight: 'bold' }}>New Cooked Recipes - Goal: {recipeGoal.goal}  </Item>
                  <br />
                  <Item>Goal Progress: {recipeSaved.length}/{recipeGoal.goal}</Item>
                  <Button size="small" variant="contained" endIcon={<AddIcon />} onClick={() => resetRecipeGoal()}>Update Recipe Goal</Button>
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
                  <br />
                  <TextField
                    size="small"
                    id="outlined-number"
                    label="Set Ingredient Goal"
                    // placeholder='Set Ingredient Goal'
                    type="number"
                    style={{
                      backgroundColor: "white"
                    }}
                    InputProps={{
                      style: {
                        color: "blue"
                      }
                    }}
                    onChange={(event) => handleIngredientChange(event, 'goal')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Button size="medium" variant="contained" endIcon={<CheckIcon />} onClick={handleIngredientGoalClick}>Set Ingredient Goal</Button>
                </Grid>
              }

              {ingredientGoal.goal > 0 &&
                <Grid item xs={4}>
                  <Item sx={{ fontWeight: 'bold' }}>New Ingredients - Goal: {ingredientGoal.goal}  </Item>
                  <br />
                  <Item>Goal Progress: {ingredientUnique.length}/{ingredientGoal.goal}</Item>
                  <Button size="small" variant="contained" endIcon={<AddIcon />} onClick={() => resetIngredientGoal()}>Update Ingredient Goal</Button>
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
            <br />
            <br />
            {/* <Paper sx={{ backgroundColor: 'white', opacity:.75 }}> */}
            <Typography variant="h4"  >Metrics</Typography>
            {/* </Paper> */}
            <br />
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
          <br />
          <br />
          <br />
          <br />
          <Box sx={sxBottomSection}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>Saved Flavor Combos</Typography>
            <Typography variant="body2" sx={{ textAlign: "center", pb: 4 }}>(Click on a recipe to view it, or click {<CheckIcon />} to mark a recipe as cooked)</Typography>
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

                  let recipeChecker = userRecipes.filter(r => r.combo_id === combo.id)
                  let cookedChecker = userRecipes.filter(r => r.is_cooked === true && r.combo_id === combo.id)
                  let uncookedChecker = userRecipes.filter(r => r.is_cooked === false && r.combo_id === combo.id)
                  // console.log('cookedChecker', cookedChecker);
                  // console.log('uncookedChecker', uncookedChecker);

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
                                  <List>
                                    {recipeChecker.length > 0 && uncookedChecker.length > 0 && <Typography sx={{ fontWeight: 'bold' }}>Uncooked Recipes</Typography>}
                                    {userRecipes.map((recipe, i) => {
                                      return (
                                        <>{i === userRecipes.length - 1 && recipeChecker.length === 0 &&
                                          <Typography
                                            sx={{ mt: 1.7 }}
                                            onClick={() => handleClick('combo', ingredientOne, ingredientTwo, ingredientThree)}
                                          >No recipes saved, click here to search recipes for this combo
                                          </Typography>}
                                          {recipe.combo_id === combo.id && recipe.is_cooked === false &&
                                            <><ListItem
                                              sx={sxRecipeUrl}
                                              key={recipe.id}
                                              size="small"
                                            >
                                              <span
                                                onClick={() => window.open(`_${recipe.url}`.split(`_`)[1], `_blank`)}
                                              >{recipe.label}</span>
                                              <Button
                                                size='small'
                                                sx={sxRecipeButton}
                                                onClick={() => dispatch({
                                                  type: 'UPDATE_RECIPE',
                                                  payload: { recipe }
                                                })}
                                              >{<CheckIcon />}</Button></ListItem></>}</>
                                      )
                                    })
                                    }
                                    {recipeChecker.length > 0 && cookedChecker.length > 0 && <Typography sx={{ fontWeight: 'bold' }}>Cooked Recipes</Typography>}
                                    {userRecipes.map(recipe => (
                                      <>{recipe.combo_id === combo.id && recipe.is_cooked === true &&
                                        <><ListItem
                                          sx={sxRecipeUrl}
                                          key={recipe.id}
                                          onClick={() => window.open(`_${recipe.url}`.split(`_`)[1], `_blank`)}
                                          size="small"
                                        >{recipe.label}</ListItem></>}</>
                                    ))}
                                  </List>
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
      </Box >
    </Box >
  );
}

export default Profile;


