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
import RecipeListCard from "../RecipeListCard/RecipeListCard";
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
    height: 450,
    // overflow: 'scroll',
    // margin: 2,
    backgroundColor: '#fffdfa',
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
    height: '300px',
    overflow: 'scroll',
    // paddingBottom: 10,
    // pb: 10
}

const sxCardTitle = {
    textAlign: 'center',
}

function RecipeList() {
    const recipes = useSelector(store => store.recipes)
    const history = useHistory();

    // const [expanded, setExpanded] = useState(false);

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // }

    //     const ExpandMore = styled((props) => {
    //         const { expand, ...other } = props;
    //         return <IconButton {...other} />;
    //     })(({ theme, expand }) => ({
    //         transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    //         marginLeft: 'auto',
    //         transition: theme.transitions.create('transform', {
    //             duration: theme.transitions.duration.shortest,
    //         }),
    //     }));

    return (
        <>
            <h1>RECIPE LIST</h1>

            <Paper>
                <Box sx={sxRecipeContainer}>
                    {recipes.length > 0 ?
                        recipes.map(recipe => (
                            <>
                                <Card sx={sxRecipeCard}>
                                    <CardMedia
                                        sx={sxRecipeImage}
                                        component="img"
                                        height="140"
                                        image={recipe.recipe.image}
                                        alt={recipe.recipe.label}
                                    />
                                    <CardActions sx={sxCardActions}>
                                        <Button 
                                        onClick={() => window.open(`${recipe.recipe.url}`)}
                                        size="small">Start Recipe</Button>
                                        <Button size="small">Save Recipe</Button>
                                    </CardActions>
                                    <CardContent>
                                        <Typography 
                                        sx={sxCardTitle}
                                        mt={-3}
                                        gutterBottom variant="h5" component="div">
                                            {recipe.recipe.label}
                                        </Typography>
                                        <Box sx={sxBox}>
                                            <Typography 
                                            mt={-2}
                                            // overflow="scroll"
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
                                    {/* <CardActions sx={sxCardActions}>
                                    <Button size="small">Start Recipe</Button>
                                    <Button size="small">Save Recipe</Button>
                                </CardActions> */}
                                </Card>


                                {/* COLLAPSABLE CARD BELOW */}
                                {/* <RecipeListCard recipe={recipe}/> */}
                                {/* <Card sx={{ maxWidth: 345 }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                R
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title="Shrimp and Chorizo Paella"
                                        subheader="September 14, 2016"
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image="/static/images/cards/paella.jpg"
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            This impressive paella is a perfect party dish and a fun meal to cook
                                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                                            if you like.
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton>
                                        <ExpandMore
                                            expand={expanded}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    </CardActions>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>Method:</Typography>
                                            <Typography paragraph>
                                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                                aside for 10 minutes.
                                            </Typography>
                                            <Typography paragraph>
                                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                                medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                                occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                                large plate and set aside, leaving chicken and chorizo in the pan. Add
                                                pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                                stirring often until thickened and fragrant, about 10 minutes. Add
                                                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                            </Typography>
                                            <Typography paragraph>
                                                Add rice and stir very gently to distribute. Top with artichokes and
                                                peppers, and cook without stirring, until most of the liquid is absorbed,
                                                15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                                mussels, tucking them down into the rice, and cook again without
                                                stirring, until mussels have opened and rice is just tender, 5 to 7
                                                minutes more. (Discard any mussels that don’t open.)
                                            </Typography>
                                            <Typography>
                                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                                            </Typography>
                                        </CardContent>
                                    </Collapse>
                                </Card> */}

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