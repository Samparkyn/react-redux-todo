import React, { Component } from 'react';

// material-ui components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditIcon from '@material-ui/icons/Edit';

// react redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// action creators
import { actions as todoActions } from '../reducers/todo';

//lodash
import uniqueId from 'lodash/uniqueId';

class Home extends Component {
  state = {
    form: {
      title: ''
    },
    filter: 'all'
  }

  handleChangeFilter = e => {
    console.log('value', e.target.value)
    this.setState({ filter: e.target.value });
  }

  handleChange = name => e => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: e.target.value
      }
    })
    console.log('change detected...')
  }


  handleFormSubmit = (e) => {
    e.preventDefault();
    const { form } = this.state;
    if (form.title) {
      const { todoActions } = this.props;
      const item = {
        id: uniqueId(),
        title: form.title,
        completed: false
      };
      todoActions.create(item);
      this.setState({ form: { title: '' } });
    }
  }

  handleToggleCompleted = value => (e, b) => {

    const { todoActions } = this.props;
    const item = {
      ...value,
      completed: !value.completed
    }
    todoActions.update(item);
  }

  handleEdit = value => e => {
    const { history } = this.props;
    history.push(`/edit/${value.id}`);
  }

  handleDelete = value => e => {
    const { todoActions } = this.props;
    todoActions.delete(value);
  }

  // filter todo items based on filter state
  filterTodoItems = (item) => {
    const { filter } = this.state;
    if (filter === 'completed') {
      return item.completed;
    } else if (filter === 'active') {
      return !item.completed;
    } else {
      return true;
    }
  }

  render() {
    const { todo } = this.props;
    const { form, filter } = this.state;

    return (
      <Grid item xs={12} sm={6}>
        <form onSubmit={this.handleFormSubmit}>
          <TextField
            id="todo"
            label="What needs to be done?"
            onChange={this.handleChange('title')}
            fullWidth
            margin="normal"
            value={form.title}
            autoComplete="off"
          />
        </form>

        {todo.items.length > 0 &&
          <FormControl fullWidth>
            <Select
              value={filter}
              onChange={this.handleChangeFilter}
              name="filter"
              fullWidth
              margin="normal"
            >
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='completed'>Completed</MenuItem>
              <MenuItem value='active'>Active</MenuItem>
            </Select>
          </FormControl>
        }

        <List>
          {todo.items.filter(this.filterTodoItems).map(value => (
            <ListItem
              key={value.id}
              dense
              button
              onClick={this.handleToggleCompleted(value)}
            //className={classes.listItem}
            >
              <Checkbox
                checked={value.completed}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={value.title} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Edit" onClick={this.handleEdit(value)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="Delete" onClick={this.handleDelete(value)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid >
    );
  }
}

const mapStateToProps = ({ todo }) => ({ todo });
const mapDispatchToProps = (dispatch) => ({ todoActions: bindActionCreators(todoActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
