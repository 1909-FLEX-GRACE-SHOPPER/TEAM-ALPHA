import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import store from '../store';
import Home from './Home';
import Nav from './Nav';
import Footer from './Footer';
import CartTable from './CartPage';
import ProductPage from './ProductPage';
import CategoriesGridPage from './CategoriesGridPage';
import Login from './LogIn';
import MyAccount from './MyAccount';
import { fetchProducts } from '../redux/products';
import { fetchOrders } from '../redux/orders';
import { fetchUsers } from '../redux/users';

export default class Root extends Component {
  async componentDidMount() {
    store.dispatch(fetchProducts());
    store.dispatch(fetchOrders());
    // store.dispatch(fetchUsers());
  }
  render() {
    return (
      <Router>
        <main>
          <Route component={Nav} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/cart" component={CartTable} exact />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/categories/:id" component={CategoriesGridPage} />
            <Route path="/login" component={Login} />
            <Route path="/myaccount" component={MyAccount} />
          </Switch>
          <Route component={Footer} />
        </main>
      </Router>
    );
  }
}
