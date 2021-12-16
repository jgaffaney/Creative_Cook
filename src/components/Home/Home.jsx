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
import Autocomplete from '@mui/material/Autocomplete';


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
    sxSearchContainer,
    sxSearchText,
    sxBottomSection,
    sxFeedContainer,
} from './Home.style';


function Home() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [searchText, setSearchText] = useState('');

    const user = useSelector((store) => store.user);
    const ingredients = useSelector((store) => store.ingredients);
    const feedContent = useSelector((store) => store.challenge)

    useEffect(() => {
        dispatch({ type: 'FETCH_CHALLENGE' });
        dispatch({ type: 'FETCH_COMBOS' });
        dispatch({ type: 'FETCH_INGREDIENTS' });
    }, []);


    const handleSearch = (searchText) => {
        console.log('CLICKED on handleSearch');
        console.log('this is the searchText', searchText);

        const searchedIngredientOne = ingredients.filter(ingredient => ingredient.name === searchText)
        console.log('--- searchedIngredientOne:', searchedIngredientOne);

        // put ingredient into the reducer
        dispatch({ type: 'SET_COMBO_INGREDIENT', payload: searchedIngredientOne[0]})

        // push user to /combo
        history.push('/combo')
    }



    // --- SEARCH --- // 



    // search function for the first ingredient
    // first cleans up search string
    // then filters ingredients and set local state

    // const requestSearch = (searchValue) => {

    //     setSearchText(searchValue);

    //     const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');

    //     const filteredRows = ingredients.filter((row) => {

    //         return Object.keys(row).some((field) => {

    //             return searchRegex.test(row[field]);
    //         });
    //     });
    // };

    // updates ingredient on a reducer change
    // useEffect(() => {
    //     setRows(ingredients)
    // }, [ingredients])

    console.log('homePage ingredient list', ingredients);

    return (
        <Box sx={sxHomePageContainer}>
            <Box sx={sxPageContent}>

                <Box sx={sxLeftColumn}>

                    {/* user PROFILE section */}
                    <Box sx={sxProfileContainer}>
                        <Typography sx={sxCenterText}><h3>{user.username}</h3></Typography>
                        {/* <Typography>Side Section: User Profile</Typography> */}
                        <CardMedia sx={sxPhotoBox} component="img" image={user.pic} />
                        <Typography sx={sxCenterText}><h4>{user.display_name}</h4></Typography>
                        {/* <Typography><p>{user.bio}</p></Typography> */}
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

                {/* SEARCH  in the top section */}
                <Box sx={sxRightColumn}>
                    <Box sx={sxTopSection}>

                        <Typography><h3>Find Your First Ingredient</h3></Typography>

                        <Box sx={sxSearchContainer}>

                            <Autocomplete
                                freeSolo
                                required
                                size="small"
                                disableClearable
                                options={ingredients.map(item => (item.name))}

                                // selectOnFocus
                                // clearOnBlur
                                // onChange={() => setSearchStatus(!searchStatus)}
                                // open={searchStatus}
                                // getOptionLabel={(option) => option.name}
                                // getOptionLabel={item => item.name}
                                // value={option}
                                onChange={(event, value) => setSearchText(value)}

                                renderInput={(params) => (
                                    <TextField sx={sxSearchText}
                                        {...params}
                                        type="search"
                                        autoComplete="off"
                                        variant="outlined"
                                        label="Search ingredients"
                                        value={searchText}

                                    // id="outlined-basic"
                                    // clearSearch={() => setSearchText('')}
                                    // onSubmit ={() => setSearchText('')}

                                    // InputProps={{
                                    //     ...params.InputProps,
                                    //     type: 'search',
                                    // }}
                                    />
                                )}
                            />
                            <Button onClick={() => handleSearch(searchText)} variant="contained">search</Button>

                        </Box>
                    </Box>

                    <Box sx={sxBottomSection}>
                        <Typography><h3>Featured Combos</h3></Typography>
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
                                        <Paper sx={{ width: '15cm', m: 2 }}>
                                            <Typography sx={{ fontSize: 25 }}>{content.name}</Typography>
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
