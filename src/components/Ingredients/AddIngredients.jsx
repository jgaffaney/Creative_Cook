import {
    FormControl, Box, TextField,
    MenuItem, Button, Grid, Typography,
} from "@mui/material";
import { useState } from 'react';
import { useDispatch } from 'react-redux';

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
    const sxAddIngredient = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

        position: 'sticky',
        top: 0,
        m: 1,
        mx: 'auto',
        zIndex: 100,

        width: '95%',
        bgcolor: 'white',
        borderBottom: '1px solid gray',
    }

    return (
        <Box>
            <Typography variant="h4">Add New Ingredient</Typography>
            <Box sx={sxAddIngredient}>
                <FormControl>
                    <Grid container spacing={1} sx={{ marginLeft: '10%', marginRight: '10%' }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="name-input"
                                label="Ingredient Name"
                                variant="outlined"
                                value={newIngredient.name}
                                onChange={(event) => handleChange(event, 'name')}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="season-input"
                                select
                                defaultValue=''
                                label="Season"
                                variant="outlined"
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
                                id="description-input"
                                label="Description"
                                multiline
                                variant="outlined"
                                value={newIngredient.description}
                                onChange={(event) => handleChange(event, 'description')}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="weight-input"
                                label="Weight"
                                variant="outlined"
                                value={newIngredient.weight}
                                onChange={(event) => handleChange(event, 'weight')}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="pic-input"
                                label="Picture URL"
                                variant="outlined"
                                value={newIngredient.pic}
                                onChange={(event) => handleChange(event, 'pic')}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="volume-input"
                                label="Volume"
                                variant="outlined"
                                value={newIngredient.volume}
                                onChange={(event) => handleChange(event, 'volume')}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="taste-input"
                                label="Taste"
                                variant="outlined"
                                value={newIngredient.taste}
                                onChange={(event) => handleChange(event, 'taste')}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="type-input"
                                select
                                defaultValue=''
                                label="Type"
                                variant="outlined"
                                onChange={(event) => handleChange(event, 'type')}
                            >
                                {foodType.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button variant='outlined' size='small' sx={{ width: '250px', m: 'auto' }} onClick={handleSubmit}>Submit</Button>
                </FormControl>
            </Box>
        </Box>
    )
}

export default AddIngredients;
