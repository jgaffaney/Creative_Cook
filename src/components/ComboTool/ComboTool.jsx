import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Card,
    CardContent,
    Button,
    Typography,
    CardMedia,
} from '@mui/material';


function ComboTool() {

    const dispatch = useDispatch();
    const combo = useSelector(store => store.combo);
    const healthFilter = useSelector(store => store.healthFilter)


    // clear/save button container
    const sxButtonContainer = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%',
        mx: 'auto',
        mb: 2,
    }

    // save / get / clear buttons for combo tool
    const sxButton = {
        margin: 2,
        width: 150,
    }

    // ingredient container for combo tool
    const sxCardContainer = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        minWidth: 559,
        mx: 'auto',
        gap: 4,
    }

    // name of ingredient in combo tool
    const sxIngredientName = {
        margin: 4,
    }

    // pic of ingredient in combo tool
    const sxPhotoBox = {
        width: 150,
        height: 150,
        boxShadow: 3,
        my: 2,
        ml: 1,
        borderRadius: '50%',
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <>
            {/* 3 ingredient display */}
            < Box sx={sxCardContainer} >
                {
                    combo?.map(ingredient => (
                        <Card elevation={0}
                            // onClick={console.log('clicked')}
                            key={ingredient.id}>
                            <CardMedia
                                sx={sxPhotoBox}
                                component="img"
                                height="140"
                                image={ingredient.pic}
                                alt={ingredient.name} />
                            <CardContent>
                                <Typography variant=''
                                    sx={sxIngredientName}>{capitalizeFirstLetter(ingredient.name)}</Typography>
                            </CardContent>
                        </Card>
                    ))
                }
            </Box >


            <Box sx={sxButtonContainer}>

                {/* if combo tool has at least 1 ingredient, clear button renders */}
                {combo.length >= 1 &&
                    <Box>
                        <Button
                            variant="outlined"
                            sx={sxButton}
                            onClick={() => dispatch({ type: 'CLEAR_COMBO_AND_RECIPE' })}>CLEAR</Button>
                    </Box>
                }

                {/* if combo tool has at least 2 ingredients, show save button */}
                {combo.length >= 2 &&
                    <>
                        <Box>
                            <Button
                                variant="outlined"
                                sx={sxButton}
                                onClick={() => dispatch({
                                    type: 'FETCH_RECIPES', payload: {
                                        combo: combo,
                                        filter: healthFilter
                                    }
                                })}>GET RECIPES</Button>
                        </Box>
                        <Box>
                            <Button
                                variant="outlined"
                                sx={sxButton}
                                onClick={() => dispatch({ type: 'SAVE_NEW_COMBO', payload: combo })}>SAVE</Button>
                        </Box>
                    </>
                }
            </Box>
        </>
    )
} // end ComboTool

export default ComboTool;