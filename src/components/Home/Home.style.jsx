

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'auto',
    width: 'auto',
    cursor: 'pointer',
    gap: .5,
}


// CONTAINER that centers everything on this page
export const sxHomePageContainer = {
    display: 'flex',
    justifyContent: 'center',
    p: 2,
}

// PAGE CONTENT holds the left column and the right column
export const sxPageContent = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    m: 2,
    gap: 1,
    position: 'relative',
}





// LEFT COLUMN holds all of the profile / metrics / goal info
export const sxLeftColumn = {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 250,
    maxWidth: 250,
    gap: 2,
    height: 'auto',
    borderRadius: 3,
    position: 'absolute',
    right: 'calc(50% + 290px)',
}

// PROFILE CONTAINER controlling profile info being held in the left column
export const sxProfileContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}

// PROFILE PHOTOS properties being held in the left column
export const sxPhotoBox = {
    width: 100,
    height: 100,
    boxShadow: 2,
    my: 2,
    borderRadius: '50%',
    mx: 'auto',
    cursor: 'pointer',
    '&:hover': {
        boxShadow: 5,
    }
};

// Centers Text
export const sxCenterText = {
    textAlign: 'center',
}

// RIGHT COLUMN holds the top and bottom sections 
export const sxRightColumn = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 550,
    height: 'auto',
    gap: 6,
    position: 'relative',
}





// TOP SECTION holds the flavor combo tool
export const sxTopSection = {
    // border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
}

// SEARCH CONTAINER holds text input and the search button
export const sxSearchContainer = {
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    height: 'auto',
}

// FEED CONTAINER holds the actual content / combo cards 
export const sxFeedContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    gap: 2,
}

// CONTENT PAPER wraps the combo text and ingredient names
export const sxContentPaper = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 500, 
    height: 'auto',
    p: 2,
    borderRadius: 2,
    cursor: 'pointer',
    '&:hover': {
        boxShadow: 5,
    }
}

// INGREDIENT PHOTO CONTAINER holds all of the ingredient photos for featured the combo card
export const sxPhotoIngredientContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    width: 350,
    mx: 'auto',
    my: 1,
}

// INGREDIENT PHOTOS properties being held in the feed content card
export const sxPhotoIngredient = {
    width: 70,
    height: 70,
    boxShadow: 3,
    borderRadius: '50%',
    backgroundSize: 'cover',
};

export const sxComboDescription = {
    width: '100%',
    height: 'auto',
    textAlign: 'center',
}

export const sxRemoveButton = {
    width: '50%',
    mx: 'auto',
    mt: 1,
    bgcolor: 'error.main',
}