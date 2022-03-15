import { useState, useRef, useEffect } from 'react';
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
    const goodResults = useSelector(store => store.goodResults);
    const badResults = useSelector(store => store.badResults);

    const [fileUploaded, setFileUploaded] = useState(false);
    const [parsedResults, setParsedResults] = useState();

    const changeHandler = (event) => {
        dispatch({ type: 'SET_FILE_UPLOAD', payload: event.target.files[0] });
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
                    // console.log('value match with: ', value.toLowerCase());
                    // console.log('ingredient.id: ', ingredient.id);
                    value = ingredient.id;
                    // console.log('value after reassign: ', value);
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

    // used to validate pairings data
    // will produce two files
    // one for upload to database
    // one with rows that are not formatted properly for upload
    const validateData = () => {
        console.log('in validateData');
        const goodResults = [];
        const badResults = [];
        for (let row of parsedResults) {
            // console.log('row in validateData: ', row);
            const objArray = Object.values(row);
            // console.log('objArray in validateResults: ', objArray);
            let res = objArray.every(function (element) { return typeof element === 'number'; });
            if(res) {
                console.log('res in validateData: ', res);
                goodResults.push(row)
            } else {
                badResults.push(row)
            }
        }


        dispatch({ type: 'SET_RESULTS', payload: goodResults });
        dispatch({ type: 'SET_BAD_RESULTS', payload: badResults })
    }

    // const pairingsForUpload = validateData()[0]
    // used to clear the input selected file after conversion to ids
    const reset = () => {
        ref.current.value = '';
    }

    useEffect(() => {
        if (parsedResults) {
            validateData()
        }
    }, [parsedResults]);

    return (

        <Box>
            {!fileUploaded ? (

                <form encType="multipart/form-data">
                    <Typography sx={{ p: 1 }} variant="body1">Use this section to process and upload pairings data</Typography>
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
            {goodResults &&
                <>
                    <Typography variant='p'>This file is ready for upload to the database</Typography>
                    <CSVLink
                        filename='converted pairings data.csv'
                        data={goodResults}
                        onClick={() => {
                            // console.log('clicked');
                            setFileUploaded(true);
                        }}
                    > <br></br>Click to download file then select the same file above</CSVLink>
                </>

            }
            <br></br>
            <br></br>
            {badResults &&
                <>
                    <Typography variant='p'>This file needs to be reformatted before uploading to the database</Typography>
                    <CSVLink
                        filename='pairings need correction.csv'
                        data={badResults}
                        onClick={() => {
                            // console.log('clicked');
                            setFileUploaded(true);
                        }}
                    > <br></br>Click to download file</CSVLink>
                </>
            }
        </Box>

    )
}

export default UploadPairings;