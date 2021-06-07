import {
  withStyles,
} from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
const CssTable = withStyles({
  root: {
    padding: 0
  }
})(DataGrid);

export default CssTable;