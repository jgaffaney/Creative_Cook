import { useSelector } from "react-redux";
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

const sxRecipeContainer = {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid red',
}


function RecipeList() {
    const recipes = useSelector(store => store.recipes)

    return (
        <>
            <h1>RECIPE LIST</h1>

            {recipes.length > 0 ?
                recipes.map(recipe => (
                    <>
                        <Box sx={sxRecipeContainer}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={recipe.recipe.image}
                                    alt={recipe.recipe.label}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {recipe.recipe.label}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
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
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Start Recipe</Button>
                                    <Button size="small">Save Recipe</Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </>
                ))
                :
                <p></p>}
        </>
    )
} // end RecipeList

export default RecipeList;