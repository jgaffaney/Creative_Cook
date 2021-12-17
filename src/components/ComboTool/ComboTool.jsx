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
} from '@mui/material';


function ComboTool() {

    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const combo = useSelector(store => store.combo);

    // clear/save button container
    const sxButtonContainer = {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid red',
        justifyContent: 'center',
        width: '50%',
        mx: 'auto',
    }

    const sxButton = {
        margin: 2,
    }


    // ingredient card for combo tool
    const sxIngredientCard = {
        width: 150,
        height: 150,
        borderRadius: 100,
        margin: 4,
    }

    // ingredient container for combo tool
    const sxCardContainer = {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid red',
        justifyContent: 'center',
        width: '50%',
        mx: 'auto',
    }

    // clickable card action space, currently does not perform a function
    const sxCardAction = {
        width: 151,
        height: 151,
    }

    const sxIngredientName = {
        margin: 4,
    }

    return (
        <>
            {/* 3 ingredient display */}
            < Box sx={sxCardContainer} >
                {
                    combo ?
                        combo.map(ingredient => (
                            <Card
                                onClick={console.log('clicked')}
                                key={ingredient.id}
                                sx={sxIngredientCard}>
                                <CardActionArea
                                    sx={sxCardAction}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={ingredient.pic}
                                        alt={ingredient.name} />
                                </CardActionArea>
                            </Card>
                        ))
                        :
                        <p></p >}
            </Box >

            {/* ingredient name map */}
            <Box sx={sxCardContainer}>
                {
                    combo ?
                        combo.map(ingredient => (
                            <Typography key={ingredient.id} sx={sxIngredientName}>{ingredient.name}</Typography>
                        ))
                        :
                        <p></p>}
            </Box>
            <Box sx={sxButtonContainer}>

                {/* if combo tool has at least 1 ingredient, clear button renders */}
                {combo.length >= 1 ?
                    <Box>
                        <Button
                            variant="outlined"
                            sx={sxButton}
                            onClick={() => dispatch({ type: 'CLEAR_COMBO' })}>CLEAR</Button>
                    </Box>
                    :
                    <p></p>}

                {/* if combo tool has at least 2 ingredients, show save button */}
                {combo.length >= 2 ?
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
                    :
                    <p></p>}
            </Box>
        </>
    )
} // end ComboTool

export default ComboTool;