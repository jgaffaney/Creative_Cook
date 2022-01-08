import {
    FormControl, Box, TextField,
    MenuItem, Button, Grid, Typography,
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// --- sx STYLES --- // 
import {
    sxCenterText,
    sxAddIngredient,
    sxAddIngredientHeaderContainer,
    sxTextInputForm,
} from './Ingredients.style';

function AddIngredients() {

    const dispatch = useDispatch();

    const defaultIngredient = {
        name: '',
        description: '',
        pic: '',
        taste: '',
        weight: '',
        volume: '',
    }

    const [ingredientFormStatus, setIngredientFormStatus] = useState(false);
    const [newIngredient, setNewIngredient] = useState(defaultIngredient)
    // const [season, setSeason] = useState('');
    // const [type, setType] = useState('');

    // handle season change
    const handleChange = (event, string) => {
        setNewIngredient({ ...newIngredient, [string]: event.target.value });
    };

    const handleSubmit = () => {
        console.log('Submit clicked');
        dispatch({ type: 'POST_INGREDIENT', payload: newIngredient })
    };

    const toggleStatus = () => {
        console.log('toggleStatus clicked');
        setIngredientFormStatus(!ingredientFormStatus)
    }

    // for seasons dropdown
    const seasons = [
        {
            value: 'Spring',
            label: 'Spring'
        },
        {
            value: 'Summer',
            label: 'Summer'
        },
        {
            value: 'Autumn',
            label: 'Autumn'
        },
        {
            value: 'Winter',
            label: 'Winter'
        },
        {
            value: 'Summer-Autumn',
            label: 'Summer-Autumn'
        },
        {
            value: 'Autumn-Winter',
            label: 'Autumn-Winter'
        },
        {
            value: 'Winter-Spring',
            label: 'Winter-Spring'
        },
        {
            value: 'Spring-Early Autumn',
            label: 'Spring-Early Autumn'
        },
        {
            value: 'Spring-Summer',
            label: 'Spring-Summer'
        },
        {
            value: 'Year-round',
            label: 'Year-round'
        }
    ]

    // for type dropdown
    const foodType = [
        {
            value: 'Protein: Air',
            label: 'Protein: Air'
        },
        {
            value: 'Protein: Land',
            label: 'Protein: Land'
        },
        {
            value: 'Protein: Sea',
            label: 'Protein: Sea'
        },
        {
            value: 'Vegetable',
            label: 'Vegetable'
        },
        {
            value: 'Fruit',
            label: 'Fruit'
        },
        {
            value: 'Dairy',
            label: 'Dairy'
        },
        {
            value: 'Fat',
            label: 'Fat'
        },
        {
            value: 'Grain',
            label: 'Grain'
        },
        {
            value: 'Green',
            label: 'Green'
        },
        {
            value: 'Legume',
            label: 'Legume'
        },
        {
            value: 'Nut',
            label: 'Nut'
        },
        {
            value: 'Herb',
            label: 'Herb'
        },
        {
            value: 'Raw',
            label: 'Raw'
        }
    ]


    return (
        <Box>
            <Box sx={sxAddIngredientHeaderContainer}>
                <Typography variant="h4" sx={sxCenterText}>Add New Ingredient</Typography>
                <Button onClick={toggleStatus} sx={{ borderRadius: 4 }}><AddCircleIcon fontSize="large" /></Button>
            </Box>
            {ingredientFormStatus &&
                <Box sx={sxAddIngredient}>
                    <FormControl>
                        <Grid container spacing={1} sx={{ marginLeft: '10%', marginRight: '10%' }}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    sx={sxTextInputForm}
                                    id="name-input"
                                    label="Ingredient Name"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.name}
                                    onChange={(event) => handleChange(event, 'name')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    sx={sxTextInputForm}
                                    id="season-input"
                                    select
                                    defaultValue=''
                                    label="Season"
                                    variant="outlined"
                                    size="small"
                                    onChange={(event) => handleChange(event, 'season')}
                                >
                                    {seasons.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    sx={sxTextInputForm}
                                    id="description-input"
                                    label="Description"
                                    multiline
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.description}
                                    onChange={(event) => handleChange(event, 'description')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    sx={sxTextInputForm}
                                    id="weight-input"
                                    label="Weight"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.weight}
                                    onChange={(event) => handleChange(event, 'weight')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    sx={sxTextInputForm}
                                    id="pic-input"
                                    label="Picture URL"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.pic}
                                    onChange={(event) => handleChange(event, 'pic')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    sx={sxTextInputForm}
                                    id="volume-input"
                                    label="Volume"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.volume}
                                    onChange={(event) => handleChange(event, 'volume')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    sx={sxTextInputForm}
                                    id="taste-input"
                                    label="Taste"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.taste}
                                    onChange={(event) => handleChange(event, 'taste')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    sx={sxTextInputForm}
                                    id="type-input"
                                    select
                                    defaultValue=''
                                    label="Type"
                                    variant="outlined"
                                    size="small"
                                    onChange={(event) => handleChange(event, 'type')}
                                >
                                    {foodType.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Button variant='outlined' size='small' sx={{mt: 3}} onClick={handleSubmit}>Submit</Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            }
        </Box>
    )
}

export default AddIngredients;
