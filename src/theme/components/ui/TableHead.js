import {
  withStyles,
} from '@material-ui/core/styles';
import { TableHead } from '@material-ui/core';
const CssTableHead = withStyles({
  root: {
    fontWeight: "bold"
  }
})(TableHead);

export default CssTableHead;