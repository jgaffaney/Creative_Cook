const filteredIngredients = (state = [], action) => {
    switch(action.type) {
        case 'FILTER_INGREDIENTS':
            const searchRegex = new RegExp((action.payload), 'i');
            const filteredRows = action.data.filter((row) => {
                return Object.keys(row).some((field) => {
                  return searchRegex.test(row[field]);
                });
              });
            return filteredRows;
        default:
            return state;
    }
}

export default filteredIngredients;


// const requestSearch = (searchValue) => {
//     setSearchText(searchValue);
//     const searchRegex = new RegExp((searchValue), 'i');
//     const filteredRows = data.rows.filter((row) => {
//       return Object.keys(row).some((field) => {
//         return searchRegex.test(row[field]);
//       });
//     });
//       setRows(filteredRows);
//   };