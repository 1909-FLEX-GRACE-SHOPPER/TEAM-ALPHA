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
import { fetchActiveOrder } from '../redux/orders';
import { fetchUsers } from '../redux/users';
import CheckoutGuestAddress from './CheckoutGuestAddress';
import CheckoutGuestPay from './CheckoutGuestPay';
import Success from './Success';
import { initialLogInAttempt } from '../redux/authentication';
import AddProduct from './AddProduct';
import EditUserProfile from './editUserProfile';
import NotFound from './NotFound';
export default class Root extends Component {
  async componentDidMount() {
    await store.dispatch(fetchProducts());
    await store.dispatch(initialLogInAttempt());
    // await store.dispatch(fetchOrders());
    // store.dispatch(fetchUsers());
  }
  render() {
    return (
      <Router>
        <main>
          <Nav />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/cart" component={CartTable} exact />
            <Route
              path="/products/women"
              component={CategoriesGridPage}
              exact
            />
            <Route path="/products/men" component={CategoriesGridPage} exact />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/categories/:id" component={CategoriesGridPage} />
            <Route path="/login" component={Login} />
            <Route path="/myaccount" component={MyAccount} />
            <Route path="/checkout" component={CheckoutGuestAddress} exact />
            <Route path="/checkout2" component={CheckoutGuestPay} exact />
            <Route path="/success/:id" component={Success} exact />
            <Route path="/addproduct" component={AddProduct} exact />
            <Route path="/editprofile" component={EditUserProfile} exact />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </main>
      </Router>
    );
  }
}
