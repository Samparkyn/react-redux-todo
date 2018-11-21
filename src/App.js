import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import Home from './pages/Home';
import EditTodo from './pages/Edit';


class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ padding: 8 }}>
          <Grid container spacing={16} justify="center">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/edit/:id" component={EditTodo} />
            </Switch>
          </Grid>
        </div>
      </Router >
    );
  }
}

export default App;
