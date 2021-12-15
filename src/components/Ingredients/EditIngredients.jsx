import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
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
import { useDispatch, useSelector } from 'react-redux';

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {

  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
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
        sx={{
          width: {
            xs: 1,
            sm: 'auto',
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0.5,
          },
          '& .MuiInput-underline:before': {
            borderBottom: 1,
            borderColor: 'divider',
          },
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

  // dispatch({type: 'FETCH_INGREDIENTS'});
  const editIngredient = (ingredient) => {
    console.log('Edit clicked with: ', ingredient);
    
  }

  const renderEditButton = (params) => {
    return (
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                  editIngredient(JSON.stringify(params.row.id))
                }}
            >
                Edit
            </Button>
    )
  }

  const data = {
    columns: [
      {field: 'edit',
        headerName: '',
        renderCell: renderEditButton,
        disableClickEventBubbling: true
      },
      { field: 'id', hide: true },
      { field: 'name', headerName: 'Name' },
      { field: 'description', headerName: 'Description' },
      { field: 'pic', headerName: 'Pic' },
      { field: 'taste', headerName: 'Taste' },
      { field: 'season', headerName: 'Season' },
      { field: 'weight', headerName: 'Weight' },
      { field: 'volume', headerName: 'Volume' },
      { field: 'type', headerName: 'Type' },
    ],
    rows: ingredients
  }

  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);
  // const [searchedValue, setSearchedValue] = useState(' ');


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

  useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS' })

  }, []);

  useEffect(() => {
    setRows(ingredients)
  }, [ingredients])

  // console.log('Demo Data: ', data);

  return (
    <Box sx={{ height: 400, width: 1 }}>
      {rows && (
        <DataGrid
          components={{ Toolbar: QuickSearchToolbar }}
          rows={rows}
          columns={data.columns}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(''),
            },
          }}
        />
      )
      }

    </Box>
  );
}