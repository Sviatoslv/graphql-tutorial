import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import MoviesDialog from '../MoviesDialog/MoviesDialog';
import MoviesForm from '../MoviesForm/MoviesForm';
import SearchForm from '../SearchForm/SearchForm';

import withHocs from './MoviesTableHoc';

class MoviesTable extends React.Component {
  state = {
    anchorEl: null,
    openDialog: false,
    searchValue: '',
  };

  handleDialogOpen = () => { this.setState({ openDialog: true }); };
  handleDialogClose = () => { this.setState({ openDialog: false }); };

  handleClick = ({ currentTarget }, data) => {
    this.setState({
      anchorEl: currentTarget,
      data,
    });
  };

  handleClose = () => { this.setState({ anchorEl: null }); };

  handleEdit = () => {
    this.props.onOpen(this.state.data);
    this.handleClose();
  };

  handleDelete = () => {
    this.handleDialogOpen();
    this.handleClose();
  };

  handleQuery = event => {
    const { value } = event.target;
    const { data } = this.props;

    this.setState({
      searchValue: value,
    });

    data.fetchMore({
      variables: { name: value },
      updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
    })
  };

  render() {
    const { anchorEl, openDialog, data: activeElem = {}, searchValue } = this.state;
    const { classes, data, state, handleChange, handleCheckboxChange, handleSelectChange, onClose} = this.props;
    const { movies = [] } = data;

    return (
      <>
        <MoviesForm handleChange={handleChange} handleSelectChange={handleSelectChange} handleCheckboxChange={handleCheckboxChange} selectedValue={state} open={state.open} onClose={onClose} />

        <SearchForm searchValue={searchValue} handleQuery={this.handleQuery}/>

        <MoviesDialog open={openDialog} handleClose={this.handleDialogClose} id={activeElem.id} />
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell align="right">Rate</TableCell>
                <TableCell>Director</TableCell>
                <TableCell>Watched</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map(movie => {
                return (
                  <TableRow key={movie.id}>
                    <TableCell component="th" scope="row">{movie.name}</TableCell>
                    <TableCell>{movie.genre}</TableCell>
                    <TableCell align="right">{movie.rate}</TableCell>
                    <TableCell>{movie.director?.name}</TableCell>
                    <TableCell>
                      <Checkbox checked={movie.watched} disabled />
                    </TableCell>
                    <TableCell align="right">
                      <>
                        <IconButton color="inherit" onClick={(e) => this.handleClick(e, movie)}>
                          <MoreIcon />
                        </IconButton>
                        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
                          <MenuItem onClick={this.handleEdit}><CreateIcon /> Edit</MenuItem>
                          <MenuItem onClick={this.handleDelete}><DeleteIcon/> Delete</MenuItem>
                        </Menu>
                      </>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
};

export default withHocs(MoviesTable);
