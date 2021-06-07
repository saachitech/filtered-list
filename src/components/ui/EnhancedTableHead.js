import TableHead from '../../theme/components/ui/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '../../theme/components/ui/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';


function EnhancedTableHead(props) {
  const { canSort, actions, classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columns, canSelectAll } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {canSelectAll ? <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell> : false}
        {columns.map((headCell, index) => (
          <TableCell
            key={index}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.field ? order : false}
          >{canSort ?
            <TableSortLabel
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : 'asc'}
              onClick={createSortHandler(headCell.field)}
            >
              {headCell.headerName}
              {orderBy === headCell.field ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
            :
            headCell.headerName
            }
          </TableCell>
        ))}
        {actions ? <TableCell style={{ width: '1%' }}><span></span></TableCell> : null}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default EnhancedTableHead;