import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Nav from './Nav';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography,
  Toolbar
} from '@material-ui/core';

const Home = () => {
  return (
    <Container
      component="div"
      style={{
        position: 'center'
      }}
    >
      <Nav />
      <img src="https://cdn.shopify.com/s/files/1/1123/9358/files/St-Paul-Minneapolis-Ski-Shop-Store.jpg?v=1569521134" />
      <AppBar position="static" style={{ backgroundColor: 'lightGrey' }}>
        <Toolbar>
          <h3 style={{ paddingLeft: '32rem' }}>All Products</h3>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Home;
