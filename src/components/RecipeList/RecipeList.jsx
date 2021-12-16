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


function RecipeList() {
    const recipes = useSelector(store => store.recipes)

    return (
        <>
            <h1>RECIPE LIST</h1>
            <Box>
                {recipes ?
                    recipes.payload.hits.map(recipe => (
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={recipe.images.regular.url}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    ))
                    :
                    <p></p>
                }
            </Box>
        </>
    )
} // end RecipeList

export default RecipeList;