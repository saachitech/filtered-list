import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return numSelected > 0 ? <Toolbar
    className={clsx(classes.root, {
      [classes.highlight]: numSelected > 0,
    })}
  >
    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
      {numSelected} selected
        </Typography>
  </Toolbar>
    :
    null
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar