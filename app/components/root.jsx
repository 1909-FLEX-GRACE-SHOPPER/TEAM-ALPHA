import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import store from '../store';
import Home from './Home';
import ProductTile from './ProductTile';

export default class Root extends Component {
  async componentDidMount() {
    // fetch products
    // fetch users
    // fetch login
  }
  render() {
    return (
      <Router>
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/products/:id" component={ProductTile} exact />
          </Switch>
        </main>
      </Router>
    );
  }
}
