import React, { useEffect, useState } from 'react';
import TextField from './fields/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& > div:first-child': {
      marginLeft: 0
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormFilter({ data, onUpdateFilter }) {
  const classes = useStyles();
  const [filterFields, setFilterFields] = useState({})
  const onChange = (id, value) => {
    filterFields[id] = value;
    setFilterFields({ ...filterFields })
  }
  const handleFilter = () => {
    onUpdateFilter({ ...filterFields });
  }
  const resetFilter = () => {
    let filters = {};
    data.map(filter => filters[filter.id] = undefined);
    setFilterFields({})
    onUpdateFilter({});
  }
  const getFilterInput = (filter, index) => {
    switch (filter.type) {
      case "TextField": return <TextField value={filterFields[filter.id] || ""} InputLabelProps={{ shrink: filterFields[filter.id] ? true : false }} key={index} onChange={onChange} id={filter.id} label={filter.label} variant="outlined" />
      default: return null;
    }
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Typography variant="body2" component="div">Filters</Typography>
      {data.map(getFilterInput)}
      <div>
        <Button onClick={handleFilter} variant="contained" color="primary">
          Filter
      </Button>
        <Button onClick={resetFilter} variant="contained" color="primary">
          Reset
      </Button>
      </div>
    </form>
  );
}