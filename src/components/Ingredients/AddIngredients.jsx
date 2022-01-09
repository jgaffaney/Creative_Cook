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
    sxFormContent,
    sxAddIngredientHeaderContainer,
    sxTextInputForm,
    sxFormColumn,
    sxCenterContent,
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

    const selectedFile = useSelector(state => state.uploadedFile);
    const seasons = useSelector(state => state.seasons);
    const foodType = useSelector(state => state.types)

    const [newIngredient, setNewIngredient] = useState(defaultIngredient);
    const [isSelected, setIsSelected] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [ingredientFormStatus, setIngredientFormStatus] = useState(false);
    const [pairingsFormStatus, setPairingsFormStatus] = useState(false);

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
    }


    // handle new csv file for ingredients
    const changeHandler = (event) => {
        dispatch({ type: 'SET_FILE_UPLOAD', payload: event.target.files[0] });
        setIsSelected(true);
    }

    // post new csv file for ingredients to DB
    const handleSubmission = () => {
        dispatch({ type: 'POST_FILE', payload: selectedFile })
    }

    const toggleStatus = (type) => {

        switch (type) {
            case 'add':
                setIngredientFormStatus(!ingredientFormStatus)
                break;

            case 'upload':
                setPairingsFormStatus(!pairingsFormStatus)
                break;

            default:
                break;
        }


    }

    return (
        <Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>

                <Box sx={sxAddIngredientHeaderContainer}>
                    <Typography variant="h5" sx={sxCenterText}>Add New Ingredient</Typography>
                    <Button onClick={() => toggleStatus('add')} sx={{ borderRadius: 4 }}><AddCircleIcon fontSize="large" /></Button>
                </Box>

                {ingredientFormStatus &&
                    <Box sx={sxCenterContent}>
                        <FormControl sx={sxFormContent}>
                            <Box sx={sxFormColumn}>
                                <TextField
                                    sx={sxTextInputForm}
                                    id="name-input"
                                    label="Ingredient Name"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.name}
                                    onChange={(event) => handleChange(event, 'name')}>
                                </TextField>

                                <TextField
                                    sx={sxTextInputForm}
                                    id="description-input"
                                    label="Description"
                                    multiline
                                    rows={3.46}
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.description}
                                    onChange={(event) => handleChange(event, 'description')}>
                                </TextField>

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
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>

                            <Box sx={sxFormColumn}>
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
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    sx={sxTextInputForm}
                                    id="pic-input"
                                    label="Picture URL"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.pic}
                                    onChange={(event) => handleChange(event, 'pic')}>
                                </TextField>

                                <TextField
                                    sx={sxTextInputForm}
                                    id="weight-input"
                                    label="Weight"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.weight}
                                    onChange={(event) => handleChange(event, 'weight')}>
                                </TextField>

                                <TextField
                                    sx={sxTextInputForm}
                                    id="volume-input"
                                    label="Volume"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.volume}
                                    onChange={(event) => handleChange(event, 'volume')}>
                                </TextField>
                            </Box>

                            <Box sx={sxFormColumn}>
                                <TextField
                                    sx={sxTextInputForm}
                                    id="taste-input"
                                    label="Taste"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.taste}
                                    onChange={(event) => handleChange(event, 'taste')}>
                                </TextField>

                                <TextField
                                    sx={sxTextInputForm}
                                    id="function-input"
                                    label="Function"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.function}
                                    onChange={(event) => handleChange(event, 'function')}>
                                </TextField>

                                <TextField
                                    sx={sxTextInputForm}
                                    id="technique-input"
                                    label="Technique"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.technique}
                                    onChange={(event) => handleChange(event, 'technique')}>
                                </TextField>

                                <TextField
                                    sx={sxTextInputForm}
                                    id="botanical-input"
                                    label="Botanical Relative"
                                    variant="outlined"
                                    size="small"
                                    value={newIngredient.botanicalRelative}
                                    onChange={(event) => handleChange(event, 'botanicalRelative')}>
                                </TextField>
                            </Box>

                        </FormControl>
                        <Button variant='outlined' size='medium' sx={{ width: 250, mx: 'auto', mt: 1, }} onClick={handleSubmit}>Submit</Button>
                    </Box>
                }


                <Box sx={sxAddIngredientHeaderContainer}>
                    <Typography variant="h5" sx={sxCenterText}>Upload Pairings .csv</Typography>
                    <Button onClick={() => toggleStatus('upload')} sx={{ borderRadius: 4 }}><AddCircleIcon fontSize="large" /></Button>
                </Box>

                {pairingsFormStatus &&
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <form encType="multipart/form-data">
                            <input type="file" name="file" onChange={changeHandler} />
                            {isSelected ? (
                                <Box>
                                    <Typography variant="body1">Filename: {selectedFile.name}</Typography>
                                    <Typography variant="body1">Filetype: {selectedFile.type}</Typography>
                                    <Typography variant="body1">Size in bytes: {selectedFile.size}</Typography>
                                    <Typography variant="body1">
                                        lastModifiedDate:{' '}
                                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography sx={{ p: 1 }} variant="body1">Select a file to show details</Typography>
                            )}
                            <Button variant="contained" onClick={handleSubmission}>Submit</Button>
                        </form>
                        <UploadPairings />
                    </Box>}

            </Box>



        </Box >
    )
}

export default AddIngredients;
