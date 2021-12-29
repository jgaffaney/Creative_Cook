

// --- HOME PAGE STYLES --- // 


// UI hints at clickable content
export const sxClickableDiv = {
    cursor: 'pointer',
    p: 2,

     '&:hover': {
        // transform: 'scale(1.1)',
        boxShadow: 2,
        borderRadius: 2,
    }
}

export const sxClickableCombo = {
    cursor: 'pointer',
}


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
    justifyContent: 'center',
    width: '80%',
    height: 'auto',
    m: 2,
    gap: 1,
}





// LEFT COLUMN holds all of the profile / metrics / goal info
export const sxLeftColumn = {
    // border: '1px solid green',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 220,
    gap: 2,
    // position: 'sticky',
    // top: 200,

}

// PROFILE CONTAINER controlling profile info being held in the left column
export const sxProfileContainer = {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}

// PROFILE PHOTOS properties being held in the left column
export const sxPhotoBox = {
    // border: '1px solid lightgray',
    width: 150,
    height: 150,
    boxShadow: 2,
    my: 2,
    borderRadius: '50%',
    mx: 'auto',
    cursor: 'pointer',

    '&:hover': {
        // transform: 'scale(1.1)',
        boxShadow: 5,
    }
};

// Centers Text
export const sxCenterText = {
    textAlign: 'center',
}





// RIGHT COLUMN holds the top and bottom sections 
export const sxRightColumn = {
    // border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '60%',
    minWidth: 550,

    height: '100%',
}





// TOP SECTION holds the flavor combo tool
export const sxTopSection = {
    // border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '25vh',

}

// SEARCH CONTAINER holds text input and the search button
export const sxSearchContainer = {
    // border: '1px solid red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    mt: 1,
}

// SEARCH INPUT TEXT BOX
export const sxSearchText = {
    width: 300,
    m: 2,
    
}




// BOTTOM SECTION holds the feed content
export const sxBottomSection = {
    // border: '1px solid lightblue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    height: 'auto',
}

// FEED CONTAINER holds the actual content / combo cards 
export const sxFeedContainer = {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // width: 'inherit',
    height: 'auto',
    gap: 2,
}

// CONTENT PAPER wraps the combo text and ingredient names
export const sxContentPaper = {
    // border: '1px solid green',
    display: 'flex',
    flexDirection: 'column',
    width: 500, 
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    p: 2,
    borderRadius: 2,
    cursor: 'pointer',

    '&:hover': {
        boxShadow: 5,
    }
}

// INGREDIENT PHOTO CONTAINER holds all of the ingredient photos for featured the combo card
export const sxPhotoIngredientContainer = {
    // border: '1px solid red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    mx: 'auto',
    my: 1,
    // gap: 2,

}

// INGREDIENT PHOTOS properties being held in the feed content card
export const sxPhotoIngredient = {
    // border: '1px solid lightgray',
    width: 70,
    height: 70,
    boxShadow: 3,
    borderRadius: '50%',
    mx: 'auto',
    mb: 1,
};

export const sxComboDescription = {
    // border: '1px solid blue',
    width: '90%',
    height: 'auto',
    textAlign: 'center',
}

export const sxRemoveButton = {
    
}