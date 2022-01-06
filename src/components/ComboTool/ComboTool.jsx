import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    CardMedia,
    CardActionArea,
    Paper,
} from '@mui/material';


function ComboTool() {

    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const combo = useSelector(store => store.combo);

    // clear/save button container
    const sxButtonContainer = {
        display: 'flex',
        flexDirection: 'row',
        // border: '1px solid red',
        justifyContent: 'center',
        width: '50%',
        mx: 'auto',
    }

    const sxButton = {
        margin: 2,
    }

    // ingredient container for combo tool
    const sxCardContainer = {
        display: 'flex',
        flexDirection: 'row',
        // border: '1px solid red',
        justifyContent: 'center',
        minWidth: 559,
        mx: 'auto',
        gap: 4,
    }

    // clickable card action space, currently does not perform a function
    const sxCardAction = {
        width: 151,
        height: 151,
    }

    const sxIngredientName = {
        margin: 4,
    }

    const sxPhotoBox = {
        // border: '1px solid red',
        width: 150,
        height: 150,
        boxShadow: 3,
        my: 2,
        ml: 1,
        borderRadius: '50%',
        // mx: 'auto',
    };

    return (
        <>
            {/* 3 ingredient display */}
            < Box sx={sxCardContainer} >
                {
                    combo?.map(ingredient => (
                        <Card elevation={0}
                            onClick={console.log('clicked')}
                            key={ingredient.id}>
                            <CardMedia
                                sx={sxPhotoBox}
                                component="img"
                                height="140"
                                image={ingredient.pic}
                                alt={ingredient.name} />
                            <CardContent>
                                <Typography variant=''
                                    sx={sxIngredientName}>{ingredient.name}</Typography>
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
                                onClick={() => dispatch({ type: 'FETCH_RECIPES', payload: combo })}>GET RECIPES</Button>
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