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

        // for (let pairOne of results.data) {
        //     console.log('pairOne.ingredientName in first loop: ', pairOne.ingredientName.toLowerCase());
        //     for (let ingredient of ingredients) {
        //         console.log('ingredient in second loop: ', ingredient.name.toLowerCase());
        //         if (pairOne.ingredientName.toLowerCase() === ingredient.name.toLowerCase()) {
        //             pairOne.ingredientName = ingredient.id;
        //             console.log('found id');
        //             break;
        //         }
        //         if (pairOne.ingredient.toLowerCase() === ingredient.name.toLowerCase()) {
        //             pairOne.ingredient = ingredient.id;
        //             console.log('found id again');
        //             break;
        //         }
        //     }
        // }
        console.log('results after convert ids: ', results);
    }


    const config = {
        header: true,
        dynamicTyping: false,
        preview: 0,
        worker: false,
        comments: false,
        step: undefined,
        complete: function (results, file) {
            console.log("Parsing complete:", results, file);
            dispatch({ type: 'POST_PAIRINGS_FILE', payload: selectedFile})
        },
        transform: function(value, header){
            value = value.toLowerCase()
            console.log('value in transform: ', value.toLowerCase());
            // console.log('header in transform: ', header);
            for(let ingredient of ingredients){
                console.log('ingredient in transform loop: ', ingredient.name.toLowerCase());
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

        // convert the pairing ingredients names to id's

        // convert the file to a useable object
        Papa.parse(selectedFile, config);




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