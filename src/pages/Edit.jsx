import React, { Component } from 'react';

// material-ui components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import BackIcon from '@material-ui/icons/ArrowBack';
import { InputAdornment } from '@material-ui/core/Input';
// react redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// action creators
import { actions as todoActions } from '../reducers/todo';

class EditTodo extends Component {

  state = {
    item: {
      title: ''
    }
  }

  // get active item by ID from router (match.params.id)
  componentDidMount() {
    const { match, todo } = this.props;
    const item = todo.items.find(item => item.id === match.params.id) || { title: '' };

    this.setState({ item });
  }

  // handle change active item data
  handleChange = name => e => {
    this.setState({
      item: {
        ...this.state.item,
        [name]: e.target.value
      }
    })
  }

  //handle submit to update todo on redux state and go back to home

  handleSubmit = (e) => {
    e.preventDefault();
    const { item } = this.state;
    if (item.title) {
      const { todoActions } = this.props;

      todoActions.update(item);
      this.goBack();

    }
  }

  //go back home
  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  render() {

    const { item } = this.state;

    return (
      <Grid item xs={12} sm={6}>
        <Typography align="center" type="display3">Edit Todo</Typography>
        <Paper style={{ paddingLeft: 16, paddingRight: 16 }}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="todo"
              label="What needs to be done?"
              onChange={this.handleChange('title')}
              fullWidth
              margin="normal"
              value={item.title}
              autoComplete="off"
              autoFocus={true}
              InputProps={{
                endAdornment:
                  (<InputAdornment position="end">
                    <IconButton
                      onClick={this.handleSubmit}

                    >
                      <CheckIcon />
                    </IconButton>
                  </InputAdornment>)

              }}
            />
            <IconButton aria-label="Edit" onClick={this.handleSubmit}>
              <BackIcon />
            </IconButton>
          </form>

        </Paper>
      </Grid >
    );
  }
}

const mapStateToProps = ({ todo }) => ({ todo });
const mapDispatchToProps = (dispatch) => ({ todoActions: bindActionCreators(todoActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);