import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import editGridData from './myAction';

// --- sx STYLES --- // 
import {
  sxTableFiltersContainer,
  sxSearchBar,
  sxDataGridContainer,
} from './Ingredients.style';


// cleans up search string
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// creates the toolbar at the top of the data grid.
// calls in filter and density components
function QuickSearchToolbar(props) {

  return (
    <Box sx={sxTableFiltersContainer}>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </Box>

      <TextField
        sx={sxSearchBar}
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};


export default function EditIngredients() {

  const ingredients = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);
  const [snackbar, setSnackbar] = useState(null);

  const seasons = [
    {
      value: 'Spring',
      label: 'Spring'
    },
    {
      value: 'Summer',
      label: 'Summer'
    },
    {
      value: 'Autumn',
      label: 'Autumn'
    },
    {
      value: 'Winter',
      label: 'Winter'
    },
    {
      value: 'Summer-Autumn',
      label: 'Summer-Autumn'
    },
    {
      value: 'Autumn-Winter',
      label: 'Autumn-Winter'
    },
    {
      value: 'Winter-Spring',
      label: 'Winter-Spring'
    },
    {
      value: 'Spring-Early Autumn',
      label: 'Spring-Early Autumn'
    },
    {
      value: 'Spring-Summer',
      label: 'Spring-Summer'
    },
    {
      value: 'Year-round',
      label: 'Year-round'
    },
  ]

  const foodType = [
    {
      value: 'Protein: Air',
      label: 'Protein: Air'
    },
    {
      value: 'Protein: Land',
      label: 'Protein: Land'
    },
    {
      value: 'Protein: Sea',
      label: 'Protein: Sea'
    },
    {
      value: 'Vegetable',
      label: 'Vegetable'
    },
    {
      value: 'Fruit',
      label: 'Fruit'
    },
    {
      value: 'Dairy',
      label: 'Dairy'
    },
    {
      value: 'Fat',
      label: 'Fat'
    },
    {
      value: 'Grain',
      label: 'Grain'
    },
    {
      value: 'Green',
      label: 'Green'
    },
    {
      value: 'Legume',
      label: 'Legume'
    },
    {
      value: 'Nut',
      label: 'Nut'
    },
    {
      value: 'Herb',
      label: 'Herb'
    },
    {
      value: 'Raw',
      label: 'Raw'
    },
  ]


  const handleCloseSnackbar = () => setSnackbar(null);

  // called when edit button clicked
  // will open popover window for editing
  const editIngredient = (ingredient) => {
    console.log('Edit clicked with: ', ingredient);

  }

  // creates the Edit button for each row in the data grid
  const renderEditButton = (params) => {
    return (
      <Button
        // sx={{border: 2}}
        variant="outlined"
        color="error"
        size="small"
        onClick={() => {
          editIngredient(JSON.stringify(params.row.id))
        }}
      >
        <DeleteForeverIcon fontSize='small' color='error' />
      </Button>
    )
  }

  async function handleCellEditCommit(params) {
    try {
      console.log('In the try of handleCellEditCommit with: ', { id: params.id, [params.field]: params.value });
      const response = await dispatch(editGridData({ id: params.id, field: params.field, value: params.value }))
      setSnackbar({ children: 'Ingredient successfully edited', severity: 'success' });
      setRows((prev) =>
        prev.map((row) => (row.id === params.id ? { ...row, ...response } : row)),
      );
    } catch (error) {
      setSnackbar({ children: 'Error while saving user', severity: 'error' });
      // Restore the row in case of error
      setRows((prev) => [...prev]);
    }
  }

  // an array for the column headers, including the edit button for every row
  const columns = [
    {
      field: 'edit',
      headerName: '',
      renderCell: renderEditButton,
      disableClickEventBubbling: true,
      editable: true
    },
    { field: 'id', hide: true, editable: true },
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'description', headerName: 'Description', editable: true, flex: true, resizable: true },
    { field: 'pic', headerName: 'Pic', editable: true },
    { field: 'taste', headerName: 'Taste', editable: true },
    { field: 'season', headerName: 'Season', editable: true, valueOptions: seasons, type: 'singleSelect' },
    { field: 'weight', headerName: 'Weight', editable: true },
    { field: 'volume', headerName: 'Volume', editable: true },
    { field: 'type', headerName: 'Type', editable: true, valueOptions: foodType, type: 'singleSelect' },
  ];

  // search function for the data grid
  // first cleans up search string
  // filters ingredients and set local state
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = ingredients.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]);
      });
    });
    setRows(filteredRows);
  };

  // updates ingredients
  useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS' })

  }, []);

  // updates ingredient on a reducer change
  useEffect(() => {
    setRows(ingredients)
  }, [ingredients])

  // console.log('Demo Data: ', data);

  return (
    <Box sx={sxDataGridContainer}>
      {/* {rows && ( */}
      <DataGrid
        density="compact"
        components={{ Toolbar: QuickSearchToolbar }}
        rows={rows}
        columns={columns}
        onCellEditCommit={handleCellEditCommit}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
        }}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={3000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  )
};
