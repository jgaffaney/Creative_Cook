

// --- INGREDIENTS PAGE STYLES --- // 
// --- includes AddIngredients, EditIngredients, & PairingsTool --- //




// -- Ingredient Page -- //

// CONTAINER that holds everything on this page
export const sxIngredientsPageContainer = {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    p: 2, 
}


// general Centers Text
export const sxCenterText = {
    textAlign: 'center',
}

export const sxPairToolHeader = {
    // border: '1px solid green',
    textAlign: 'center',
    my: 2,
}


// -- AddIngredients Component -- //

export const sxAddIngredientHeaderContainer = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    gap: 1,
}


export const sxAddIngredient = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'sticky',
    top: 0,
    m: 1,
    mx: 'auto',
    zIndex: 100,

    width: '95%',
    bgcolor: 'white',
    borderBottom: '1px solid gray',
}

export const sxTextInputForm = {
    // border: '1px solid red',
    width: 250,
}


// -- EditIngredients Component -- // 

// holds filters, density, and the search bar above the data grid
export const sxTableFiltersContainer = {
    // border: '1px solid blue', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    py: 2,
    gap: 10,
}

// search bar properties
export const sxSearchBar = {
    width: {
        // border: '1px solid blue',
        xs: 1,
        sm: 'auto',
      },
      m: (theme) => theme.spacing(1, 0.5, 1.5),
      '& .MuiSvgIcon-root': {
        mr: 0.5,
      },
      '& .MuiInput-underline:before': {
        borderBottom: 2,
        borderColor: 'divider',
      },
}

// holds everything in the ingredient Data Grid
export const sxDataGridContainer = {
    // border: '1px solid red', 
    mt: 6,
    mb: 12,
    height: 650, 
    width: 1 
}






// -- PairingsTool Component -- //

// hold all of the PairingTool contents
export const sxPairingToolContainer = {
    // border: '1px solid blue',
    // mt: 4,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // gap: 10,
}

export const sxPairWithContainer = {
    // border: '1px solid red',
    display: 'flex',
    justifyContent: 'center', 
    gap: 4, 
    p: 1,
}

export const sxPairedWithContent = {
    // border: '1px solid green',
    height: 450, 
    width: '45%',
}

export const sxNotPairedWithContent = {
    // border: '1px solid green',
    height: 450, 
    width: '45%',
}











// // PAGE CONTENT holds the left column and the right column
// export const sxPageContent = {
//     // border: '1px solid red',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     width: '80%',
//     // height: 'auto',
//     m: 2,
//     gap: 1,

//     position: 'relative',
//     // position: 'relative',
// }





// // LEFT COLUMN holds all of the profile / metrics / goal info
// export const sxLeftColumn = {
//     // border: '1px solid green',
//     display: 'flex',
//     flexDirection: 'column',
//     minWidth: 250,
//     maxWidth: 250,
//     gap: 2,
//     height: 'auto',

//     borderRadius: 3,
//     // boxShadow: 20,


//     position: 'absolute',
//     right: 'calc(50% + 290px)',
//     // mr: '305px',

// }

// // PROFILE CONTAINER controlling profile info being held in the left column
// export const sxProfileContainer = {
//     // border: '1px solid red',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
// }

// // PROFILE PHOTOS properties being held in the left column
// export const sxPhotoBox = {
//     // border: '1px solid lightgray',
//     width: 100,
//     height: 100,
//     boxShadow: 2,
//     my: 2,
//     borderRadius: '50%',
//     mx: 'auto',
//     cursor: 'pointer',

//     '&:hover': {
//         // transform: 'scale(1.1)',
//         boxShadow: 5,
//     }
// };

// // Centers Text
// export const sxCenterText = {
//     textAlign: 'center',
// }




// // RIGHT COLUMN holds the top and bottom sections 
// export const sxRightColumn = {
//     // border: '1px solid blue',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // maxWidth: 550,
//     width: 550,
//     height: 'auto',
//     // mx: 'auto',



//     position: 'relative',
//     // top: 100,
// }





// // TOP SECTION holds the flavor combo tool
// export const sxTopSection = {
//     // border: '1px solid blue',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: '25vh',

// }

// // SEARCH CONTAINER holds text input and the search button
// export const sxSearchContainer = {
//     // border: '1px solid red',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     mt: 1,
// }

// // SEARCH INPUT TEXT BOX
// export const sxSearchText = {
//     width: 300,
//     m: 2,
    
// }




// // BOTTOM SECTION holds the feed content
// export const sxBottomSection = {
//     // border: '1px solid lightblue',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '95%',
//     height: 'auto',
// }

// // FEED CONTAINER holds the actual content / combo cards 
// export const sxFeedContainer = {
//     // border: '1px solid red',
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // width: 'inherit',
//     height: 'auto',
//     gap: 2,
// }

// // CONTENT PAPER wraps the combo text and ingredient names
// export const sxContentPaper = {
//     // border: '1px solid green',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     // alignItems: 'center',
//     width: 500, 
//     height: 'auto',
    
//     p: 2,
//     borderRadius: 2,
//     cursor: 'pointer',

//     '&:hover': {
//         boxShadow: 5,
//     }
// }

// // INGREDIENT PHOTO CONTAINER holds all of the ingredient photos for featured the combo card
// export const sxPhotoIngredientContainer = {
//     // border: '1px solid red',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 7,
//     width: 350,
//     mx: 'auto',
//     my: 1,
//     // gap: 2,

// }

// // INGREDIENT PHOTOS properties being held in the feed content card
// export const sxPhotoIngredient = {
//     // border: '1px solid lightgray',
//     width: 70,
//     height: 70,
//     boxShadow: 3,
//     borderRadius: '50%',
//     backgroundSize: 'cover',
// };

// export const sxComboDescription = {
//     // border: '1px solid blue',
//     width: '100%',
//     height: 'auto',
//     textAlign: 'center',
// }

// export const sxRemoveButton = {
//     width: '50%',
//     mx: 'auto',
//     mt: 1,
//     bgcolor: 'error.main',
// }