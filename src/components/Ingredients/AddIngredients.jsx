import { FormControl, Box, TextField, MenuItem } from "@mui/material";
import { useState } from 'react';

function AddIngredients() {

    const [season, setSeason] = useState('');
    const [type, setType] = useState('');

    // handle season change
    const handleChange = (event) => {
        setSeason(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
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
                    <TextField id="name-input" label="Ingredient Name" variant="outlined"></TextField>
                    <TextField id="description-input" label="Description" variant="outlined"></TextField>
                    <TextField id="pic-input" label="Picture URL" variant="outlined"></TextField>
                    <TextField id="taste-input" label="Taste" variant="outlined"></TextField>
                    <TextField 
                        id="season-input" 
                        select
                        label="Season" 
                        variant="outlined"
                        value={season}
                        onChange={handleChange}
                        >
                            {seasons.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    <TextField id="weight-input" label="Weight" variant="outlined"></TextField>
                    <TextField id="volume-input" label="Volume" variant="outlined"></TextField>
                    <TextField 
                        id="type-input" 
                        select
                        label="Type" 
                        variant="outlined"
                        value={type}
                        onChange={handleTypeChange}
                        >
                            {foodType.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                </FormControl>
            </Box>
        </div>
        

    )
}

export default AddIngredients;
