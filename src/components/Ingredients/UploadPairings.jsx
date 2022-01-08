import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';

function UploadPairings() {

    const dispatch = useDispatch();

    const selectedFile = useSelector(state => state.uploadedFile);
    const ingredients = useSelector(store => store.ingredients);

    const [isSelected, setIsSelected] = useState();

    const changeHandler = (event) => {
        dispatch({ type: 'SET_FILE_UPLOAD', payload: event.target.files[0] });
        setIsSelected(true);
    }

    const convertToIds = (results) => {

        console.log('results from papaParse: ', results);

        for (let pairOne of results.data) {
            for (let ingredient of ingredients) {
                if (pairOne.ingredientName === ingredient.name) {
                    pairOne.ingredientName === ingredient.id;
                    console.log('found id');
                    break;
                }
                if (pairOne.ingredient === ingredient.name) {
                    pairOne.ingredient === ingredient.id;
                    console.log('found id again');
                    break;
                }
            }
        }
        console.log('results after convert ids: ', results);
    }


    const config = {
        header: true,
        dynamicTyping: true,
        preview: 0,
        worker: false,
        comments: false,
        step: undefined,
        complete: function (results, file) {
            console.log("Parsing complete:", results, file);
            convertToIds(results);
        },
        delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
    }

    const handleSubmission = () => {

        // convert the pairing ingredients names to id's

        // convert the file to a useable object
        Papa.parse(selectedFile, config);




        // dispatch({ type: 'POST_PAIRINGS_FILE', payload: selectedFile})
    }

    return (
        <div>
            <h1>Pairings Upload</h1>
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
        </div>
    )
}

export default UploadPairings;