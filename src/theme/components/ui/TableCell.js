import {
  withStyles,
} from '@material-ui/core/styles';
import { TableCell } from '@material-ui/core';
const CssTableCell = withStyles({
  root: {
    border: "1px solid #dee2e6",
    padding: 8,
    '&:last-child': {
      whiteSpace: 'nowrap'
    }
  },
  head: {
    fontWeight: "bold"
  }
})(TableCell);

export default CssTableCell;