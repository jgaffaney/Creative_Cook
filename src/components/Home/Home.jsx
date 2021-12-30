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
    sxClickableDiv,
    sxClickableCombo,
} from './Home.style';
import IngredientAutocomplete from '../IngredientAutocomplete/IngredientAutocomplete';

import { defaultOrderByFn } from 'react-table';


function Home() {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((store) => store.user);
    const ingredients = useSelector((store) => store.ingredients);
    const feedContent = useSelector((store) => store.challenge);
    const searchText = useSelector(store => store.ingredientSearch);
    const userCombos = useSelector(store => store.userCombos);

    useEffect(() => {
        dispatch({ type: 'FETCH_CHALLENGE' });
        dispatch({ type: 'FETCH_COMBOS' });
        dispatch({ type: 'FETCH_INGREDIENTS' });
    }, []);


    // SEARCH function will capture first ingredient and then push you to the combo page to complete combo
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


    // pageDirection clicks to take to you to the right page.
    function handleClick(action, content) {

        switch (action) {

            // ADMIN will have the ability to see remove button on combos cards;
            case 'remove':
                console.log('CLICKED on the remove button on the feed combo card');
                console.log('ingredient from fee combo to be removed', content);
                console.log('feed content remove id:', content.id);

                // dispatch remove feed content by id
                // dispatch refresh of the feed list

                break;


            case 'profile':
                console.log('CLICKED on the profile image button');
                history.push('/profile')
                break;


            case 'combo':
                console.log('CLICKED on the featured combo');
                // first make sure the reducer is empty and ready to receive the combo we click on;
                dispatch({ type: 'CLEAR_COMBO_AND_RECIPE' })

                // this is just the array of ids; 
                const comboIngredientIds = content.ingredient_list;
                // console.log('--- comboIngredientIds', comboIngredientIds);

                // need to get the list of ingredient objects from the store.ingredients in order to send the right data type to combo reducer;
                const crossFilteredIngredients = ingredients.filter(item => {
                    return comboIngredientIds.indexOf(item.id) != -1;
                });
                // console.log('--- crossFilteredIngredients filtered down ingredients based on ingredients list', crossFilteredIngredients);

                // we need to DISPATCH the ingredient OBJECT and the ingredients in the right order;
                const ingredientOne = crossFilteredIngredients.filter(ingredient => ingredient.id === comboIngredientIds[0])
                // console.log('--- filtered ingredientOne', ingredientOne);
                dispatch({ type: 'SET_COMBO_INGREDIENT', payload: ingredientOne[0] })

                const ingredientTwo = crossFilteredIngredients.filter(ingredient => ingredient.id === comboIngredientIds[1])
                // console.log('--- filtered ingredientTwo', ingredientTwo);
                dispatch({ type: 'SET_COMBO_INGREDIENT', payload: ingredientTwo[0] })

                const ingredientThree = crossFilteredIngredients.filter(ingredient => ingredient.id === comboIngredientIds[2])
                // console.log('--- filtered ingredientThree', ingredientThree);
                dispatch({ type: 'SET_COMBO_INGREDIENT', payload: ingredientThree[0] })

                history.push('/combo')
                break;

            default:
                break;
        }

    }; // handleClick



    // const limitSize = 3
    const recentCombos = userCombos.slice(0, 3);
    console.log('homepage first 3 recentCombos', recentCombos);

    return (
        <Box sx={sxHomePageContainer}>
            <Box sx={sxPageContent}>

                <Box sx={sxLeftColumn}>

                    {/* user PROFILE section */}
                    <Box sx={sxProfileContainer}>
                        <Typography variant="h5" sx={sxCenterText}>{user.username}</Typography>
                        {/* <Typography>Side Section: User Profile</Typography> */}
                        <CardMedia onClick={() => handleClick('profile')} sx={sxPhotoBox} component="img" image={user.pic} />
                        <Typography variant="h5" sx={sxCenterText}>{user.display_name}</Typography>
                        {/* <Typography><p>{user.bio}</p></Typography> */}
                    </Box>

                    {/* any METRICS will go here */}
                    <Box onClick={() => handleClick('profile')} sx={sxClickableDiv}>
                        <Typography variant="h6" sx={sxCenterText}>Metrics</Typography>
                        <Typography variant="body1" sx={sxCenterText}>content</Typography>
                    </Box>

                    {/* recent COMBOS */}
                    <Box onClick={() => handleClick('profile')} sx={sxClickableDiv}>
                        <Typography variant="h6" sx={sxCenterText}>Recent Combos</Typography>
                        {recentCombos.map((combo) => (
                            <Typography variant="body1" sx={sxCenterText}>{combo.name}</Typography>
                        ))}
                    </Box>

                    {/* GOALS progress */}
                    <Box onClick={() => handleClick('profile')} sx={sxClickableDiv}>
                        <Typography variant="h6" sx={sxCenterText}>Goal Progress</Typography>
                        <Typography variant="body1" sx={sxCenterText}>content</Typography>
                    </Box>

                </Box>

                {/* SEARCH  in the top section */}
                <Box sx={sxRightColumn}>
                    <Box sx={sxTopSection}>

                        <Typography variant="h4">Find Your First Ingredient</Typography>
                        <Box sx={sxSearchContainer}>

                            <IngredientAutocomplete />
                            <Button onClick={() => handleSearch(searchText)} variant="contained">search</Button>
                        </Box>


                    </Box>

                    <Box sx={sxBottomSection}>

                        <Typography variant="h4" sx={{ mb: 2, }}>Featured Combos</Typography>

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
                                    <Paper key={content.id} sx={sxContentPaper} elevation={2}>

                                        {/* needed an extra Box just to separate the comboClick; remove button sits on top of this DIV and  fire when button is pushed */}
                                        <Box onClick={() => handleClick('combo', content)} sx={sxClickableCombo} >

                                            <Typography variant="body1" sx={{ textAlign: 'center' }} >{content.date_posted?.split('T')[0]}</Typography>

                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{content.name}</Typography>

                                            <Box sx={sxPhotoIngredientContainer}>
                                                <CardMedia sx={sxPhotoIngredient} component="img" image={feedContentIngredients[0]?.pic} />
                                                <CardMedia sx={sxPhotoIngredient} component="img" image={feedContentIngredients[1]?.pic} />
                                                <CardMedia sx={sxPhotoIngredient} component="img" image={feedContentIngredients[2]?.pic} />
                                            </Box>


                                            <Typography variant="body1" sx={sxComboDescription}>{content.description}</Typography>
                                            {/* <Typography variant="body1">{feedContentIngredients[0]?.name}, {feedContentIngredients[1]?.name}{feedContentIngredients[2] ? (', ' + feedContentIngredients[2]?.name) : ""}</Typography> */}
                                        </Box>

                                        {/* only allow ADMIN use see and use the remove feed button to remove feed items */}
                                        {user.is_admin ? <Button onClick={() => handleClick('remove', content)}
                                            sx={sxRemoveButton}
                                            variant="contained"
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
