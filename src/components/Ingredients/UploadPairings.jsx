import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import { CSVLink, CSVDownload } from 'react-csv';

function UploadPairings() {

    const dispatch = useDispatch();
    const ref = useRef();

    const selectedFile = useSelector(state => state.uploadedFile);
    const ingredients = useSelector(store => store.ingredients);

    const [isSelected, setIsSelected] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [parsedResults, setParsedResults] = useState();
    const [parsedFile, setParsedFile] = useState();

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
            console.log("Parsing complete: results:", results, 'file: ', file);

            setParsedResults(results.data)

            // dispatch the parsed file for bulk upload
            // dispatch({ type: 'POST_PAIRINGS_FILE', payload: Papa.unparse(results, [unparseConfig])})
        },
        transform: function (value, header) {
            value = value.toLowerCase()
            // console.log('value in transform: ', value.toLowerCase());
            console.log('header in transform: ', header);
            for (let ingredient of ingredients) {
                // console.log('ingredient in transform loop: ', ingredient.name.toLowerCase());
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
        console.log('in handle posting');
        dispatch({ type: 'POST_PAIRINGS_FILE', payload: selectedFile })
    }

    const reset = () => {
        ref.current.value = '';
    }

    return (
        <div>
            {!fileUploaded ? (

                <form encType="multipart/form-data">
                    <Typography sx={{p: 1}} variant="body1">Select a file to show details</Typography>
                    <input type="file" name="file" ref={ref} onChange={changeHandler} />
                    {/* {isSelected ? (
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
                )} */}
                    <button onClick={handleSubmission}>Convert</button>
                </form>) : (
                <form encType="multipart/form-data">
                    <p>Choose a file to send to the database</p>
                    <input type='file' name='file' onChange={changeHandler} />
                    <button onClick={handlePosting}>Post File to DB</button>
                </form>
            )}
            {parsedResults &&
                // <CSVDownload
                //     data={parsedResults}
                //     target='_blank'/>
                <CSVLink
                    filename='converted pairings data.csv'
                    data={parsedResults}
                    onClick={() => {
                        console.log('clicked');
                        setFileUploaded(true);
                    }}
                > Download converted file for upload to DB</CSVLink>
            }
            {!fileUploaded ? (
                <button onClick={()=>{setFileUploaded(true)}}>I already have a converted file</button>
            ) : (
                <button onClick={()=>{setFileUploaded(false)}}>I need to convert a file</button>
            )}
        </div>
    )
}

export default UploadPairings;