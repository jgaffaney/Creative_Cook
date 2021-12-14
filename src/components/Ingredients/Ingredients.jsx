import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
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

export default function QuickFilteringGrid() {

  const ingredients = useSelector(store => store.ingredients);

  const dispatch = useDispatch();

  const data = {
    columns: [
      {field: 'id', hide: true},
      {field: 'name', headerName: 'Name'},
      {field: 'description', headerName: 'Description'},
      {field: 'pic', headerName: 'Pic'},
      {field: 'taste', headerName: 'Taste'},
      {field: 'season', headerName: 'Season'},
      {field: 'weight', headerName: 'Weight'},
      {field: 'volume', headerName: 'Volume'},
      {field: 'type', headerName: 'Type'},
    ],
    rows: ingredients
  }

  // const { data } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  const [searchText, setSearchText] = React.useState('');
  const [rows, setRows] = React.useState(data.rows);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data.rows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]);
      });
    });
    setRows(filteredRows);
  };

  React.useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS'})
    setRows(data.rows);
  }, []);

  console.log('Demo Data: ', data);
  // console.log('New Data: ', newdata);

  return (
    <Box sx={{ height: 400, width: 1 }}>
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
    </Box>
  );
}