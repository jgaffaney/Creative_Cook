import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';


function Home() {

    const dispatch = useDispatch();
    const history = useHistory();
    // const user = useSelector((store) => store.user);
    // const ingredients = useSelector((store) => store.ingredients);
    // const userProfile = useSelector((store) => store.userProfile);
    // const feed = useSelector((store) => store.feed);

    useEffect(() => {
      dispatch({ type: 'FETCH_CHALLENGE' });
  }, []);


    const handleSearch = () => {
        console.log('CLICKED on handleSearch');
    }

    const sxHomePageContainer = {
        border: '1px solid red',
        display: 'flex',
        justifyContent: 'center',
    }

    const sxPageContent = {
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        height: '100%',
        m: 2
    }

    const sxLeftColumn = {
        border: '1px solid green',
        display: 'flex',
        flexDirection: 'column',
        width: '25%',
    }

    const sxRightColumn = {
        border: '1px solid blue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        height: '100%',
    }


    const sxTopSection = {
        border: '1px solid lightblue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 300,
    }

    const sxPhotoBox = {
        // border: '1px solid lightgray',
        width: 120,
        height: 120,
        boxShadow: 3,
        mb: .25,
        borderRadius: 1,
    };


    const sxBottomSection = {
        border: '1px solid lightblue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 300,
    }

    const sxFeedContainer = {
        border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 250,
    }


    return (
        <Box sx={sxHomePageContainer}>
            <Box sx={sxPageContent}>

                <Box sx={sxLeftColumn}>

                    {/* user profile section */}
                    <Box>
                        <Typography>Side Section: User Profile</Typography>
                        <CardMedia sx={sxPhotoBox} component="img" image={'Gordon.jpeg'} />
                        <Typography>User Name</Typography>
                        <Typography>User Bio goes here it will be kinda long but maybe it's a bit longer of a description of the person? </Typography>
                    </Box>
                    <br />

                    {/* any metrics will go here */}
                    <Box>
                        <Typography>Side Section: Metrics</Typography>
                    </Box>
                    <br />

                    {/* recent combos */}
                    <Box>
                        <Typography>Side Section: Recent Combos</Typography>
                    </Box>
                    <br />

                    {/* goal progress */}
                    <Box>
                        <Typography>Side Section: Goal Progress</Typography>
                    </Box>

                </Box>


                <Box sx={sxRightColumn}>

                    <Box sx={sxTopSection}>
                        <Typography>Top Section: Create Flavor Combo</Typography>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <Button onClick={() => handleSearch()} variant="contained">search</Button>
                    </Box>

                    <Box sx={sxBottomSection}>
                        <Typography>Bottom Section: Curated Feed</Typography>
                        <Box sx={sxFeedContainer}>FEED GOES IN HERE</Box>
                    </Box>

                </Box>

            </Box>
        </Box >
    );
};


export default Home;
