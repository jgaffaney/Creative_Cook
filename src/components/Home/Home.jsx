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
} from './Home.style';
import IngredientAutocomplete from '../IngredientAutocomplete/IngredientAutocomplete';


function Home() {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((store) => store.user);
    const ingredients = useSelector((store) => store.ingredients);
    const feedContent = useSelector((store) => store.challenge);
    const searchText = useSelector(store => store.ingredientSearch);
    const userCombos = useSelector(store => store.userCombos);

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
        dispatch({ type: 'SET_COMBO_INGREDIENT', payload: searchedIngredientOne[0] })

        // push user to /combo
        history.push('/combo')
    }

    const handleComboClick = () => {
        console.log('handleComboClick');
    }

    const handleRemove = () => {
        console.log('handleRemove');
    }


    useEffect(() => {
        dispatch({ type: 'FETCH_CHALLENGE' });
        dispatch({ type: 'FETCH_COMBOS' });
        dispatch({ type: 'FETCH_INGREDIENTS' });
    }, []);



    console.log('homePage ingredient list', ingredients);
    console.log('user combos', userCombos);

    return (
        <Box sx={sxHomePageContainer}>
            <Box sx={sxPageContent}>

                <Box sx={sxLeftColumn}>

                    {/* user PROFILE section */}
                    <Box sx={sxProfileContainer}>
                        <Typography variant="h6" sx={sxCenterText}>{user.username}</Typography>
                        {/* <Typography>Side Section: User Profile</Typography> */}
                        <CardMedia sx={sxPhotoBox} component="img" image={user.pic} />
                        <Typography variant="h6" sx={sxCenterText}>{user.display_name}</Typography>
                        {/* <Typography><p>{user.bio}</p></Typography> */}
                    </Box>
                    <br />

                    {/* any METRICS will go here */}
                    <Box>
                        <Typography variant="body1">Side Section: Metrics</Typography>
                    </Box>
                    <br />

                    {/* recent COMBOS */}
                    <Box>
                        <Typography variant="body1">Recent Combos:</Typography>
                        <Typography>{userCombos[0]?.name}</Typography>
                        <Typography>{userCombos[1]?.name}</Typography>
                        <Typography>{userCombos[2]?.name}</Typography>
                    </Box>
                    <br />

                    {/* GOALS progress */}
                    <Box>
                        <Typography variant="body1">Side Section: Goal Progress</Typography>
                    </Box>

                </Box>

                {/* SEARCH  in the top section */}
                <Box sx={sxRightColumn}>
                    <Box sx={sxTopSection}>

                        <Typography variant="h5">Find Your First Ingredient</Typography>
                        <Box sx={sxSearchContainer}>

                            <IngredientAutocomplete />
                            <Button onClick={() => handleSearch(searchText)} variant="contained">search</Button>
                        </Box>


                    </Box>

                    <Box sx={sxBottomSection}>

                        <Typography variant="h5" sx={{ mb: 2, }}>Featured Combos</Typography>

                        <Box sx={sxFeedContainer}>

                            {feedContent.map((content) => {
                                console.log('this is the content', content);
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
                                console.log('IngArray id list:', IngArray);
                                console.log('--- feedContentIngredients:', feedContentIngredients);

                                return (
                                    <Paper key={content.id} sx={sxContentPaper} elevation={3}>

                                        <Typography variant="body1" sx={{ textAlign: 'center' }} onClick={handleComboClick}>{content.date_posted?.split('T')[0]}</Typography>

                                        <Typography variant="h6" sx={{ textAlign: 'center' }} onClick={handleComboClick}>{content.name}</Typography>

                                        <Box onClick={handleComboClick} sx={sxPhotoIngredientContainer}>
                                            <CardMedia sx={sxPhotoIngredient} component="img" image={feedContentIngredients[0]?.pic} />
                                            <CardMedia sx={sxPhotoIngredient} component="img" image={feedContentIngredients[1]?.pic} />
                                            <CardMedia sx={sxPhotoIngredient} component="img" image={feedContentIngredients[2]?.pic} />
                                        </Box>


                                        <Typography variant="body1" sx={sxComboDescription}
                                            onClick={handleComboClick}>{content.description}</Typography>
                                        {/* <Typography variant="body1">{feedContentIngredients[0]?.name}, {feedContentIngredients[1]?.name}{feedContentIngredients[2] ? (', ' + feedContentIngredients[2]?.name) : ""}</Typography> */}

                                        {/* only allow ADMIN use see and use the remove feed button to remove feed items */}
                                        {user.is_admin ? <Button onClick={handleRemove}
                                            sx={sxRemoveButton} variant="contained"
                                            size="small">Remove</Button> : <></>}

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
