/**
 * 
 */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '../../theme/components/ui/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EnhancedTableHead from './EnhancedTableHead'
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: '#FFF'
  },
  table: {
    minWidth: 450,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
}));

export default function EnhancedTable({
  extraColumns = true,
  columns, rows, idField, title,
  canEdit, canView, canSelect, canDelete, canSort = true,
  route, viewRoute, selected = [],
  onSelectItems, onUpdatePagination, onUpdateSort, count, pagination
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  //const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const actions = canEdit || canView || canDelete;
  const dense = false;
  useEffect(() => {
    setPage(pagination ? (pagination.offset ? pagination.offset / pagination.limit : 0) : 0);
    setRowsPerPage(pagination ? pagination.limit : 5);
  }, [pagination]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    if (onUpdateSort) {
      onUpdateSort(isAsc ? 'desc' : 'asc', property)
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n, index) => index);
      //setSelected(newSelecteds);
      if (onSelectItems) onSelectItems(newSelecteds)
      return;
    }
    //setSelected([]);
    if (onSelectItems) onSelectItems([])
  };

  const handleClick = (event, index) => {
    if (!canSelect) return;
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    //setSelected(newSelected);
    if (onSelectItems) onSelectItems(newSelected)
  };

  const handleChangePage = (event, newPage) => {
    onUpdatePagination({ offset: rowsPerPage * newPage, limit: rowsPerPage })
  };

  const handleChangeRowsPerPage = (event) => {
    onUpdatePagination({ offset: 0, limit: parseInt(event.target.value, 10) })
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = extraColumns ? (rowsPerPage - rows.length - page * rowsPerPage) : 0;

  const renderEditButton = entry => canEdit ? <IconButton to={`/${route}/${entry[idField || "id"]}/edit`} component={Link} aria-label="edit" className={classes.margin}>
    <EditIcon fontSize="small" />
  </IconButton> : null
  const renderViewButton = entry => canView ? <IconButton to={viewRoute ? viewRoute(entry) : `/${route}/${entry[idField || "id"]}/view`} component={Link} aria-label="view" className={classes.margin}>
    <VisibilityIcon fontSize="small" />
  </IconButton> : null
  const renderDeleteButton = entry => canDelete ? <IconButton aria-label="delete" className={classes.margin}>
    <DeleteIcon fontSize="small" />
  </IconButton> : null

  const renderCell = (row, column) => {
    let value = column.formating ? column.formating(row[column.field]) : row[column.field];
    if (column.link) {
      let route = column.link.match(/:\w+/);
      let routeWO = route[0].split(":")[1];
      return <Link to={column.link.replace(/:\w+/, row[routeWO])}>{value}</Link>
    }
    else {
      return value
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        {/*<EnhancedTableToolbar title={title} numSelected={selected.length} />*/}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              columns={columns}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              actions={actions}
              canSelectAll={canSelect}
              canSort={canSort}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(index);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                  >{canSelect ?
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, index)}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    : null
                    }
                    {columns.map(column => <TableCell key={column.field} className={classes.tableCell} align="left">{
                      renderCell(row, column)
                    }</TableCell>)}
                    {actions ? <TableCell>
                      {renderEditButton(row)}
                      {renderViewButton(row)}
                      {renderDeleteButton(row)}
                    </TableCell> : null}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={columns.length + 2} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination ? <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          rowsPerPage={rowsPerPage}
          page={page}
          count={count}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> : null}
      </div>
    </div>
  );
}
