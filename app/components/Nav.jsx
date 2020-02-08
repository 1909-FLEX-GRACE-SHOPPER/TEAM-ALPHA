import React, { Component } from 'react';
import { connect } from 'react-redux'; // will want for authentication
import { Link } from 'react-router-dom';
import {
  Toolbar,
  AppBar,
  Button,
  IconButton,
  ButtonGroup
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { logOutAttempt } from '../redux/authentication';
// styling nav
// could create two divs within the toolbar flex box and space them properly
// and have one div be the links
// and the other be the log in and cart

class Nav extends Component {
  loginStatus = () => {
    const { authentication } = this.props;
    const { isLoggedIn } = authentication;
    if (isLoggedIn) {
      // need to add an onClick to the button
      // need authentication thunk for it
      return (
        <div>
          <Link
            to="/myaccount"
            style={{ textDecoration: 'none', marginLeft: '5px' }}
          >
            My Account
          </Link>
          <Button onClick={this.props.signout}>Log Out!</Button>
        </div>
      );
    }
    return (
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Button>Log in / Register</Button>
      </Link>
    );
  };

  adminOptions = () => {
    const { authentication, activeUser } = this.props;
    const { isLoggedIn } = authentication;
    if (isLoggedIn && activeUser.userType === 'admin') {
      return (
        <ButtonGroup
          variant="text"
          color="inhereit"
          aria-label="admin nav button group"
        >
          <Link to="/addproduct" style={{ textDecoration: 'none' }}>
            <Button>Add a Product</Button>
          </Link>
        </ButtonGroup>
      );
    }
  };

  render() {
    const { cart } = this.props;
    const numItemsInCart = cart.items.length;
    return (
      <AppBar position="static">
        <Toolbar
          style={{
            alignItems: 'center',
            color: 'white',
            display: 'flex',
            height: '80px',
            padding: '10px',
            justifyContent: 'space-around',
            flexWrap: 'wrap'
          }}
        >
          <Link to="/">
            <IconButton color="default" aria-label="home">
              <AcUnitIcon style={{ fontSize: 60 }} />
            </IconButton>
          </Link>
          <ButtonGroup
            variant="text"
            color="inherit"
            aria-label="text nav button group"
          >
            <Link to="/products/men" style={{ textDecoration: 'none' }}>
              <Button>Men</Button>
            </Link>
            <Link to="/products/women" style={{ textDecoration: 'none' }}>
              <Button>Women</Button>
            </Link>
          </ButtonGroup>
          {this.loginStatus()}
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <IconButton color="default" aria-label="shopping cart">
              <ShoppingCartIcon />
              Cart ({numItemsInCart})
            </IconButton>
          </Link>
          {this.adminOptions()}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ cart, authentication, activeUser }) => ({
  cart,
  authentication,
  activeUser
});

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(logOutAttempt())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
