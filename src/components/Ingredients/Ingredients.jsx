import React, { useEffect, useMemo } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useTable, useGlobalFilter, useFilters } from 'react-table';
import { COLUMNS } from './columns';
import './table.css';
import { GlobalFilter } from '../../components/GlobalFilter/GlobalFilter';



function Ingredients() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const ingredients = useSelector((store) => store.ingredients);

  const dispatch = useDispatch();

  const columns = useMemo(() => COLUMNS, []);
  const ingredientList = useMemo(() => ingredients, []);


  useEffect(() => {
    dispatch({ type: 'FETCH_INGREDIENTS' })
  }, [])

  const {
    getTableProps,
    // getTableBodyProps,
    headerGroups,
    // footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({
    columns,
    ingredientList,
  },
    useFilters,
    useGlobalFilter)

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
    <div className="container">
      <h2>Welcome To The Ingredients Page!</h2>
    </div>
    <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                        <div>
                                            {column.canFilter ? column.render('Filter') : null }
                                        </div>
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableProps()}>
                {
                    rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                            </tr>
                        )
                    })}
            </tbody>
          </table>
    </>
  );
}

// this allows us to use <App /> in index.js
export default Ingredients;
