import {
    FormControl, Box, TextField,
    MenuItem, Button, Grid, Typography,
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadPairings from "./UploadPairings";

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
        function: '',
        technique: '',
        botanicalRelative: '',
    }

<<<<<<< HEAD
    const [ingredientFormStatus, setIngredientFormStatus] = useState(false);
    const [newIngredient, setNewIngredient] = useState(defaultIngredient)
    // const [season, setSeason] = useState('');
    // const [type, setType] = useState('');
=======
    const selectedFile = useSelector(state => state.uploadedFile);
    const seasons = useSelector(state => state.seasons);
    const foodType = useSelector(state => state.types)

    const [newIngredient, setNewIngredient] = useState(defaultIngredient);
    const [isSelected, setIsSelected] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
>>>>>>> main

    // handle season change
    const handleChange = (event, string) => {
        setNewIngredient({ ...newIngredient, [string]: event.target.value });
    };

    const handleSubmit = () => {
        console.log('Submit clicked');
        dispatch({ type: 'POST_INGREDIENT', payload: newIngredient })
    };

<<<<<<< HEAD
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
=======
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
>>>>>>> main


    // handle new csv file for ingredients
    const changeHandler = (event) => {
        dispatch({ type: 'SET_FILE_UPLOAD', payload: event.target.files[0] });
        setIsSelected(true);
    }

    // post new csv file for ingredients to DB
    const handleSubmission = () => {
        dispatch({ type: 'POST_FILE', payload: selectedFile})
    }

    return (
<<<<<<< HEAD
        <Box>
            <Box sx={sxAddIngredientHeaderContainer}>
                <Typography variant="h4" sx={sxCenterText}>Add New Ingredient</Typography>
                <Button onClick={toggleStatus} sx={{ borderRadius: 4 }}><AddCircleIcon fontSize="large" /></Button>
            </Box>
            {ingredientFormStatus &&
=======
        <>
            <div>
                <h2>Add New Ingredient</h2>
>>>>>>> main
                <Box sx={sxAddIngredient}>
                    <FormControl>
                        <Grid container spacing={1} sx={{ marginLeft: '10%', marginRight: '10%' }}>
                            <Grid item xs={12} md={6}>
                                <TextField
<<<<<<< HEAD
                                    sx={sxTextInputForm}
                                    id="name-input"
                                    label="Ingredient Name"
                                    variant="outlined"
                                    size="small"
=======
                                    id="name-input"
                                    label="Ingredient Name"
                                    variant="outlined"
>>>>>>> main
                                    value={newIngredient.name}
                                    onChange={(event) => handleChange(event, 'name')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
<<<<<<< HEAD
                                    sx={sxTextInputForm}
=======
>>>>>>> main
                                    id="season-input"
                                    select
                                    defaultValue=''
                                    label="Season"
                                    variant="outlined"
<<<<<<< HEAD
                                    size="small"
                                    onChange={(event) => handleChange(event, 'season')}
                                >
                                    {seasons.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
=======
                                    onChange={(event) => handleChange(event, 'season')}
                                >
                                    {seasons.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
>>>>>>> main
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
<<<<<<< HEAD
                                    sx={sxTextInputForm}
=======
>>>>>>> main
                                    id="description-input"
                                    label="Description"
                                    multiline
                                    variant="outlined"
<<<<<<< HEAD
                                    size="small"
=======
>>>>>>> main
                                    value={newIngredient.description}
                                    onChange={(event) => handleChange(event, 'description')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
<<<<<<< HEAD
                                    sx={sxTextInputForm}
                                    id="weight-input"
                                    label="Weight"
                                    variant="outlined"
                                    size="small"
=======
                                    id="weight-input"
                                    label="Weight"
                                    variant="outlined"
>>>>>>> main
                                    value={newIngredient.weight}
                                    onChange={(event) => handleChange(event, 'weight')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
<<<<<<< HEAD
                                    sx={sxTextInputForm}
                                    id="pic-input"
                                    label="Picture URL"
                                    variant="outlined"
                                    size="small"
=======
                                    id="pic-input"
                                    label="Picture URL"
                                    variant="outlined"
>>>>>>> main
                                    value={newIngredient.pic}
                                    onChange={(event) => handleChange(event, 'pic')}>
                                </TextField>
                            </Grid>
<<<<<<< HEAD
                            <Grid item xs={12} md={4}>
                                <TextField
                                    sx={sxTextInputForm}
                                    id="volume-input"
                                    label="Volume"
                                    variant="outlined"
                                    size="small"
=======
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="volume-input"
                                    label="Volume"
                                    variant="outlined"
>>>>>>> main
                                    value={newIngredient.volume}
                                    onChange={(event) => handleChange(event, 'volume')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
<<<<<<< HEAD
                                    sx={sxTextInputForm}
                                    id="taste-input"
                                    label="Taste"
                                    variant="outlined"
                                    size="small"
=======
                                    id="taste-input"
                                    label="Taste"
                                    variant="outlined"
>>>>>>> main
                                    value={newIngredient.taste}
                                    onChange={(event) => handleChange(event, 'taste')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
<<<<<<< HEAD
                                    sx={sxTextInputForm}
=======
>>>>>>> main
                                    id="type-input"
                                    select
                                    defaultValue=''
                                    label="Type"
                                    variant="outlined"
<<<<<<< HEAD
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
=======
                                    onChange={(event) => handleChange(event, 'type')}
                                >
                                    {foodType.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="function-input"
                                    label="Function"
                                    variant="outlined"
                                    value={newIngredient.function}
                                    onChange={(event) => handleChange(event, 'function')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="technique-input"
                                    label="Technique"
                                    variant="outlined"
                                    value={newIngredient.technique}
                                    onChange={(event) => handleChange(event, 'technique')}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="botanical-input"
                                    label="Botanical Relative"
                                    variant="outlined"
                                    value={newIngredient.botanicalRelative}
                                    onChange={(event) => handleChange(event, 'botanicalRelative')}>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Button variant='outlined' size='small' sx={{ width: '250px', m: 'auto' }} onClick={handleSubmit}>Submit</Button>
                    </FormControl>
                </Box>
            </div>
            <div>
                <form encType="multipart/form-data">
                <input type="file" name="file" onChange={changeHandler} />
                {isSelected ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p>Select a file to show details</p>
                )}
                <button onClick={handleSubmission}>Submit</button>
                </form>
                <UploadPairings />
            </div>
        </>)
>>>>>>> main
}

export default AddIngredients;
