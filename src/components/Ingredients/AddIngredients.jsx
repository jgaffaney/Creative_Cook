import { FormControl, Box, TextField, MenuItem, Button } from "@mui/material";
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function AddIngredients() {

    const dispatch = useDispatch();

    const defaultIngredient = {
        name: '',
        description: '',
        pic: '',
        taste: '',
        season: '',
        weight: '',
        volume: '',
        type: ''
    }

    const [newIngredient, setNewIngredient] = useState(defaultIngredient)
    // const [season, setSeason] = useState('');
    // const [type, setType] = useState('');

    // handle season change
    const handleChange = (event, string) => {
        setNewIngredient({...newIngredient, [string]: event.target.value});
    };

    const handleSubmit = () => {
        console.log('Submit clicked');
        dispatch({type: 'POST_INGREDIENT', newIngredient})
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
        }
    ]

    return(
        <div>
            <h2>Add New Ingredient</h2>
            <Box>
                <FormControl>
                    <TextField 
                        id="name-input" 
                        label="Ingredient Name" 
                        variant="outlined"
                        onChange={(event) => handleChange(event, 'name')}>
                    </TextField>
                    <TextField 
                        id="description-input" 
                        label="Description" 
                        multiline
                        variant="outlined"
                        onChange={(event) => handleChange(event, 'description')}>
                    </TextField>
                    <TextField 
                        id="pic-input" 
                        label="Picture URL" 
                        variant="outlined"
                        onChange={(event) => handleChange(event, 'pic')}>
                        </TextField>
                    <TextField 
                        id="taste-input" 
                        label="Taste" 
                        variant="outlined"
                        onChange={(event) => handleChange(event, 'taste')}>
                    </TextField>
                    <TextField 
                        id="season-input" 
                        select
                        value=''
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
                    <TextField 
                        id="weight-input" 
                        label="Weight" 
                        variant="outlined"
                        onChange={(event) => handleChange(event, 'weight')}>
                        </TextField>
                    <TextField 
                        id="volume-input" 
                        label="Volume" 
                        variant="outlined"
                        onChange={(event) => handleChange(event, 'volume')}>
                    </TextField>
                    <TextField 
                        id="type-input" 
                        select
                        value=''
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
                        <Button variant='outlined' size='small' onClick={handleSubmit}>Submit</Button>
                </FormControl>
            </Box>
        </div>
        

    )
}

export default AddIngredients;
