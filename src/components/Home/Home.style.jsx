

// --- HOME PAGE STYLES --- // 



// CONTAINER that centers everything on this page
export const sxHomePageContainer = {
    // border: '1px solid red',
    display: 'flex',
    justifyContent: 'center',
}

// PAGE CONTENT holds the left column and the right column
export const sxPageContent = {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    height: '100%',
    m: 2
}





// LEFT COLUMN holds all of the profile / metrics / goal info
export const sxLeftColumn = {
    border: '1px solid green',
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
}

// PROFILE CONTAINER controlling profile info being held in the left column
export const sxProfileContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}

// Centers Text
export const sxCenterText = {
    textAlign: 'center',
}

// PROFILE PHOTOS properties being held in the left column
export const sxPhotoBox = {
    // border: '1px solid lightgray',
    width: 150,
    height: 150,
    boxShadow: 3,
    mb: .25,
    borderRadius: '50%',
    mx: 'auto',
};





// RIGHT COLUMN holds the top and bottom sections 
export const sxRightColumn = {
    // border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: '100%',
}





// TOP SECTION holds the flavor combo tool
export const sxTopSection = {
    border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 220,

}

// SEARCH CONTAINER holds text input and the search button
export const sxSearchContainer = {
    // border: '1px solid red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
}

// SEARCH INPUT TEXT BOX
export const sxSearchText = {
    width: 300,
    m: 2,
    
}




// BOTTOM SECTION holds the feed content
export const sxBottomSection = {
    border: '1px solid lightblue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 300,
}

// FEED CONTAINER holds the actual content / combo cards 
export const sxFeedContainer = {
    border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 250,
}