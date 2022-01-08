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
    Paper,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Snackbar,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const sxRecipeContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    // border: '1px solid red',
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

const sxMenuItem = {
    display: 'flex',
    justifyContent: 'center'
}

const sxSelectLabel = {
    mx: 'auto',
    pb: 0.5,
    color: 'primary.main',
    borderColor: 'primary.main',
    // border: '1px solid'
    width: 150,
}

const sxHealthFilter = {
    display: 'flex',
    flexDirection: 'row',
    // border: '1px solid red',
    justifyContent: 'center',
    width: '50%',
    mx: 'auto',
    // mt: 1,
    mb: 3,
    // pl: 2,
    // pr: 0.5,
}




function RecipeList() {


    // <Snackbar
    //     open={open}
    //     autoHideDuration={6000}
    //     onClose={handleClose}
    //     message="Recipe Saved"
    //     action={action}
    // />

    // const handleClick = () => {

    // }

    const recipes = useSelector(store => store.recipes)
    const dispatch = useDispatch();
    const combo = useSelector(store => store.combo)
    const healthFilter = useSelector(store => store.healthFilter)

    return (
        <>
        {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
            {combo.length === 3 &&
                <>
                    <Box sx={sxHealthFilter}>
                        <FormControl >
                            <InputLabel
                            sx={sxSelectLabel}>Health Filters</InputLabel>
                            <Select
                            sx={{ display: 'flex', mx: 'auto', width: 150, borderColor: 'primary.main' }}
                                size="small"
                                label="healthFilters"
                                value={healthFilter}
                                onChange={(event) => dispatch({
                                    type: 'FETCH_RECIPES', payload:
                                    {
                                        combo: combo,
                                        filter: event.target.value
                                    }
                                })}
                                labelId="label" id="healthFilters" value={healthFilter}>
                                <MenuItem
                                    sx={sxMenuItem}
                                    value="dairy-free">Dairy Free</MenuItem>
                                <MenuItem
                                    sx={sxMenuItem}
                                    value="gluten-free">Gluten Free</MenuItem>
                                <MenuItem
                                    sx={sxMenuItem}
                                    value="peanut-free">Peanut Free</MenuItem>
                                <MenuItem
                                    sx={sxMenuItem}
                                    value="pescatarian">Pescatarian</MenuItem>
                                <MenuItem
                                    sx={sxMenuItem}
                                    value="vegetarian">Vegetarian</MenuItem>
                                <MenuItem
                                    sx={sxMenuItem}
                                    value="vegan">Vegan</MenuItem>
                                <MenuItem
                                    sx={sxMenuItem}
                                    value="">None</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </>
            }
            <Box sx={sxRecipeContainer}>
                {
                    recipes?.map(recipe => (
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
                }
            </Box>
        </>
    )

} // end RecipeList



export default RecipeList;