import { useDispatch, useSelector } from "react-redux";
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
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useHistory } from "react-router-dom";

const sxRecipeContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    border: '1px solid red',
    gap: 2,
    justifyContent: 'center',
}

const sxRecipeCard = {
    width: 345,
    height: 550,
    backgroundColor: '#fffdfa',
    elevation: 24,
    borderRadius: 5,
}

const sxRecipeImage = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 200,
}

const sxCardActions = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
}

const sxBox = {
    height: 180,
    overflow: 'scroll',
}

const sxCardContent = {
    height: 150,
}

const sxCardTitle = {
    textAlign: 'center',
    height: 'auto',
}


function RecipeList() {
    const recipes = useSelector(store => store.recipes)
    const dispatch = useDispatch();
    const combo = useSelector(store => store.combo)

    return (
        <>
            <h1>RECIPE LIST</h1>
            <Paper>
                <Box sx={sxRecipeContainer}>
                    {recipes.length > 0 ?
                        recipes.map(recipe => (
                            <>
                                <Card elevation={3}
                                sx={sxRecipeCard}>
                                    <CardMedia
                                        sx={sxRecipeImage}
                                        component="img"
                                        height="140"
                                        image={recipe.recipe.image}
                                        alt={recipe.recipe.label}
                                    />
                                    <CardActions sx={sxCardActions}>
                                        <Button
                                            onClick={() => window.open(`_${recipe.recipe.url}`.split(`_`)[1], `_blank`)}
                                            size="small">Start Recipe</Button>
                                        <Button
                                            onClick={() => dispatch({
                                                type: 'SAVE_USER_RECIPE',
                                                payload: {
                                                    recipe: recipe.recipe,
                                                    combo: combo
                                                }
                                            })}
                                            size="small">Save Recipe</Button>
                                    </CardActions>
                                    <CardContent sx={sxCardContent}>
                                        <Typography
                                            sx={sxCardTitle}
                                            mt={-3}
                                            gutterBottom variant="h5" component="div">
                                            {recipe.recipe.label}
                                        </Typography>
                                        <Box sx={sxBox}>
                                            <Typography
                                                mt={0}
                                                variant="body2" color="text.secondary">
                                                <>
                                                    {
                                                        <ul>
                                                            {recipe.recipe.ingredientLines.map(ingredient => (
                                                                <li>{ingredient}</li>
                                                            ))}
                                                        </ul>
                                                    }
                                                </>
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </>
                        ))
                        :
                        <p></p>}
                </Box>
            </Paper>
        </>
    )

} // end RecipeList



export default RecipeList;