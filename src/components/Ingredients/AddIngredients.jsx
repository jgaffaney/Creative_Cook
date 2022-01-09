import {
    FormControl, Box, TextField,
    MenuItem, Button, Grid
} from "@mui/material";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadPairings from "./UploadPairings";

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

    const selectedFile = useSelector(state => state.uploadedFile);
    const seasons = useSelector(state => state.seasons);
    const foodType = useSelector(state => state.types)

    const [newIngredient, setNewIngredient] = useState(defaultIngredient);
    const [isSelected, setIsSelected] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    // handle season change
    const handleChange = (event, string) => {
        setNewIngredient({ ...newIngredient, [string]: event.target.value });
    };

    const handleSubmit = () => {
        console.log('Submit clicked');
        dispatch({ type: 'POST_INGREDIENT', payload: newIngredient })
    };

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
        <>
            <div>
                <h2>Add New Ingredient</h2>
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
                                        <MenuItem key={option} value={option}>
                                            {option}
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
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
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
}

export default AddIngredients;
