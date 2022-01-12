import React, { useState, useEffect } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import { fontSize } from '@mui/system';


// --- MUI sx STYLES --- // 
import {
    sxHomePageContainer,
    sxPageContent,
    sxLeftColumn,
    sxProfileContainer,
    sxCenterText,
    sxPhotoBox,
    sxRightColumn,
    sxTopSection,
    sxBottomSection,
    sxFeedContainer,
    sxContentPaper,
    sxSearchContainer,
    sxPhotoIngredientContainer,
    sxPhotoIngredient,
    sxComboDescription,
    sxRemoveButton,
    sxClickableDiv,
    sxClickableCombo,
} from './Home.style';

import IngredientAutocomplete from '../IngredientAutocomplete/IngredientAutocomplete';

// import { defaultOrderByFn } from 'react-table';


function Home() {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((store) => store.user);
    const ingredients = useSelector((store) => store.ingredients);
    const feedContent = useSelector((store) => store.challenge);
    const searchText = useSelector(store => store.ingredientSearch);
    const userCombos = useSelector(store => store.userCombos);
    const comboGoal = useSelector((store) => store.comboGoal);
    // const userGoals = useSelector((store) => store.goal);
    const recipeGoal = useSelector((store) => store.recipeGoal);
    const recipeSaved = useSelector((store) => store.recipeSaved);
    const ingredientGoal = useSelector((store) => store.ingredientGoal);
    const ingredientUnique = useSelector((store) => store.ingredientUnique);
    // const combo = useSelector((store) => store.combo);
    const comboMetrics = useSelector((store) => store.comboMetrics);
    const recipeMetrics = useSelector((store) => store.recipeMetrics);
    const ingredientMetrics = useSelector((store) => store.ingredientMetrics);
  
    
    // const combo = useSelector((store) => store.combo);


    useEffect(() => {
        dispatch({ type: 'FETCH_CHALLENGE' });
        dispatch({ type: 'FETCH_COMBOS' });
        dispatch({ type: 'FETCH_INGREDIENTS' });
        dispatch({ type: 'FETCH_COMBO_GOAL' });
        dispatch({ type: 'FETCH_RECIPE_GOAL' });
        dispatch({ type: 'FETCH_INGREDIENT_GOAL' });
        dispatch({ type: 'FETCH_COMBO_METRICS' })
        dispatch({ type: 'FETCH_RECIPE_METRICS' })
        dispatch({ type: 'FETCH_INGREDIENT_METRICS' })
    }, []);

    // useEffect(() => {
    //     dispatch({ type: 'FETCH_COMBO_METRICS' });
    //     dispatch({ type: 'FETCH_RECIPE_METRICS' });
    //     dispatch({ type: 'FETCH_INGREDIENT_METRICS' });
    // }, [comboMetrics, recipeMetrics, ingredientMetrics]);


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

        // push user to /combo
        history.push('/combo')
    }


    // pageDirection clicks to take to you to the right page.
    function handleClick(action, content, ingredientOne, ingredientTwo, ingredientThree) {

        switch (action) {

            case 'profile':
                // console.log('CLICKED on the profile image button');
                history.push('/profile')
                break;

            // only ADMIN will have the ability to see remove button on combos cards;
            case 'remove':
                // console.log('CLICKED remove feed combo card');
                // console.log('ingredient from fee combo to be removed', content);
                // console.log('feed content remove id:', content.id);
                // dispatch remove feed content by id
                dispatch({ type: 'REMOVE_FEED_ITEM', payload: content.id })
                break;

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

    // console.log('comboMetrics', comboMetrics);
    // console.log('recipeMetrics', recipeMetrics);
    // console.log('ingredientMetrics', ingredientMetrics);


    // limit the amount of content we display on the profile section === 3
    // console.log('--- homepage userGoals', userGoals);
    const recentCombos = userCombos?.slice(0, 3);
    // console.log('homepage first 3 recentCombos', recentCombos);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }


    return (
        <Box sx={sxHomePageContainer}>
            <Box sx={sxPageContent}>

                <Box sx={sxLeftColumn}>

                    {/* user PROFILE section */}
                    <Box sx={sxProfileContainer}>
                        <Typography variant="h6" sx={sxCenterText}>{capitalizeFirstLetter(user.username)}</Typography>
                        <CardMedia onClick={() => handleClick('profile')} sx={sxPhotoBox} component="img" image={user.pic} />
                    </Box>

                    {/* METRICS will go here */}
                    <Box onClick={() => handleClick('profile')} sx={sxClickableDiv}>
                        <Typography variant="h6" sx={sxCenterText}>Metrics</Typography>
                        {/* <Typography variant="body1" sx={sxCenterText}>content</Typography> */}
                        {comboMetrics[0] && recipeMetrics[0] && ingredientMetrics[0] && <>
                        <Typography sx={sxCenterText}>Weekly Combos Made: {comboMetrics[0].weekly}</Typography>
                        <Typography sx={sxCenterText}>Weekly Recipes Made: {recipeMetrics[0].weekly}</Typography>
                        <Typography sx={sxCenterText}>Weekly Ingredients Made: {ingredientMetrics[0].weekly}</Typography>
                        </>} 

                    </Box>

                    {/* recent COMBOS */}
                    <Box onClick={() => handleClick('profile')} sx={sxClickableDiv}>
                        <Typography variant="h6" sx={sxCenterText}>Recent Combos</Typography>
                        {recentCombos?.map((combo, i) => (
                            <Typography key={i} variant="body1" sx={sxCenterText}>{combo.name}</Typography>
                        ))}
                    </Box>

                    {/* GOALS progress */}
                    <Box onClick={() => handleClick('profile')} sx={sxClickableDiv}>
                        <Typography variant="h6" sx={sxCenterText}>Goal Progress</Typography>
                        {comboGoal.goal == 0 && <Typography variant="body1" sx={sxCenterText}>Set Combo Goal</Typography>}
                        {comboGoal.goal >= 1 && 
                        <Typography sx={sxCenterText}>Combo Goals:{userCombos.length}/{comboGoal.goal}</Typography>}
                        {recipeGoal.goal == 0 && <Typography variant="body1" sx={sxCenterText}>Set Recipe Goal</Typography>}
                        {recipeGoal.goal >= 1 &&
                        <Typography sx={sxCenterText}>Recipe Goals:{recipeSaved.length}/{recipeGoal.goal}</Typography>}
                        {ingredientGoal.goal == 0 && <Typography variant="body1" sx={sxCenterText}>Set Ingredient Goal</Typography>}
                        {ingredientGoal.goal >= 1 &&
                        <Typography sx={sxCenterText}>Ingredient Goals:{ingredientUnique.length}/{ingredientGoal.goal}</Typography>}
                    </Box>

                    </Box>
                    {/* {userGoals?.map((goal, j) => (
                        <Typography key={j} variant="body1" sx={sxCenterText}>hello</Typography>
                    ))}
                    {userGoals}
                    <Box onClick={() => handleClick('profile')} sx={sxClickableDiv}>
                        <Typography variant="h6" sx={sxCenterText}>Goal Progress</Typography>
                        <Typography variant="body1" sx={sxCenterText}>Combo Goals:{userCombos.length}/{comboGoal.goal}</Typography>
                        <Typography variant="body1" sx={sxCenterText}>Recipe Goals:{recipeSaved.length}/{recipeGoal.goal}</Typography>
                        <Typography variant="body1" sx={sxCenterText}>Ingredient Goals:{ingredientUnique.length}/{ingredientGoal.goal}</Typography>
                    </Box>

                </Box>

                {/* SEARCH  in the top section */}
                <Box sx={sxRightColumn}>
                    <Box sx={sxTopSection}>

                        <Typography variant="h4">Find Your First Ingredient</Typography>
                        <Box sx={sxSearchContainer}>

                            <IngredientAutocomplete />
                            <Button onClick={() => handleSearch(searchText)} variant="outlined">search</Button>
                        </Box>

                    </Box>

                    <Box sx={sxBottomSection}>

                        <Typography variant="h4" sx={{ mb: 2, }}>Featured Combos</Typography>

                        <Box sx={sxFeedContainer}>

                            {feedContent?.map((content) => {
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

                                return (
                                    <Paper key={content.id} sx={sxContentPaper} elevation={2}>

                                        {/* needed an extra Box just to separate the comboClick; remove button sits on top of this DIV and  fire when button is pushed */}
                                        <Box onClick={() => handleClick('combo', content, ingredientOne, ingredientTwo, ingredientThree)} sx={sxClickableCombo}>

                                            <Typography variant="body1" sx={{ textAlign: 'center' }} >{content.date_posted?.split('T')[0]}</Typography>

                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{content.name}</Typography>

                                            <Box sx={sxPhotoIngredientContainer}>
                                                <CardMedia sx={sxPhotoIngredient} component="img" image={ingredientOne[0]?.pic} />

                                                <CardMedia sx={sxPhotoIngredient} component="img" image={ingredientTwo[0]?.pic} />

                                                {/* check to see if we have a 3rd ingredient before appending */}
                                                {content.ingredient_list?.length > 2 &&
                                                    <CardMedia sx={sxPhotoIngredient} component="img" image={ingredientThree[0]?.pic} />}
                                            </Box>

                                            <Typography variant="body1" sx={sxComboDescription}>{content.description}</Typography>

                                        </Box>

                                        {/* only allow ADMIN use see and use the remove feed button to remove feed items */}
                                        {user.is_admin && <Button onClick={() => handleClick('remove', content)}
                                            sx={sxRemoveButton}
                                            variant="contained"
                                            size="small">Remove From Feed </Button>}

                                    </Paper>
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