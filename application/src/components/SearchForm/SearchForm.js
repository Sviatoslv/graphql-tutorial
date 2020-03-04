import React from 'react';
import TextField from '@material-ui/core/TextField';
import withHocs from './SearchFromHoc'

const SearchForm = ({ classes, searchValue, handleQuery }) => (
  <form className={classes.wrapper} noValidate autoComplete="off">
    <TextField
      onChange={handleQuery}
      id="filled-basic"
      label="Serch"
      variant="filled"
      value={searchValue}
      className={classes.textField}
    />
  </form>
);

export default withHocs(SearchForm)
