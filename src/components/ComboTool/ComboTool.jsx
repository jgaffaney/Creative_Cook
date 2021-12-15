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
    const combo = useSelector(store => store.comboSelect);

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
                        < p ></p >}
            </Box >
            <Box>
                <Button sx={sxCardContainer}
                    onClick={() => dispatch({ type: 'CLEAR_COMBO' })}>CLEAR</Button>
            </Box>
        </>
    )
} // end ComboTool

export default ComboTool;