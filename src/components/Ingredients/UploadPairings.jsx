import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';

import {
    Box, Button, Typography,
} from "@mui/material";

function UploadPairings() {

    const dispatch = useDispatch();
    const ref = useRef();

    const selectedFile = useSelector(state => state.uploadedFile);
    const ingredients = useSelector(store => store.ingredients);

    const [isSelected, setIsSelected] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [parsedResults, setParsedResults] = useState();

    const changeHandler = (event) => {
        dispatch({ type: 'SET_FILE_UPLOAD', payload: event.target.files[0] });
        setIsSelected(true);
    }

    const config = {
        header: true,
        dynamicTyping: false,
        preview: 0,
        worker: false,
        comments: false,
        step: undefined,
        complete: function (results, file) {
            setParsedResults(results.data)
        },
        // a transform function to convert the ingredient name in the .csv file to an ingredient id from the ingredients reducer
        transform: function (value, header) {
            value = value.toLowerCase()
            for (let ingredient of ingredients) {
                if (value === ingredient.name.toLowerCase()) {
                    console.log('value match with: ', value.toLowerCase());
                    console.log('ingredient.id: ', ingredient.id);
                    value = ingredient.id;
                    console.log('value after reassign: ', value);
                }
            }
            return value;
        },
        delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
    }

    const handleSubmission = () => {
        // converts the file to a useable object
        // dispatch the file to the saga happens in papaParse
        Papa.parse(selectedFile, config);
        reset();
    }

    const handlePosting = () => {
        dispatch({ type: 'POST_PAIRINGS_FILE', payload: selectedFile })
    }

    // used to clear the input selected file after conversion to ids
    const reset = () => {
        ref.current.value = '';
    }

    return (

        <Box>
            {!fileUploaded ? (

                <form encType="multipart/form-data">
                    {/* <Typography sx={{ p: 1 }} variant="body1">Select a file to show details</Typography> */}
                    <input type="file" name="file" ref={ref} onChange={changeHandler} />
                    <Typography sx={{ p: 1 }} variant="body1">Select a file to show details</Typography>
                    <Button variant="contained" onClick={handleSubmission}>Submit</Button>
                    {/* <Button variant="contained" onClick={() => { setFileUploaded(true) }}>I already have a converted file</Button> */}

                </form>

            ) : (
                <form encType="multipart/form-data">
                    <Typography sx={{ p: 1 }} variant="body1">Choose a file to send to the database</Typography>
                    <input type='file' name='file' onChange={changeHandler} />
                    <Button variant="contained" onClick={handlePosting}>Post File to DB</Button>
                    {/* <Button variant="contained" onClick={() => { setFileUploaded(false) }}>I need to convert a file</Button> */}
                </form>
            )}
            {parsedResults &&
                <CSVLink
                    filename='converted pairings data.csv'
                    data={parsedResults}
                    onClick={() => {
                        console.log('clicked');
                        setFileUploaded(true);
                    }}
                > Click to download file then choose the same file above</CSVLink>
            }
        </Box>

    )
}

export default UploadPairings;