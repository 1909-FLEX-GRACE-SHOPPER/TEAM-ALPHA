import AppBar from '@material-ui/core/AppBar';
import React from 'react';
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
import ProductGrid from './ProductGrid';
import AllProductsGrid from './AllProductsGrid';

const Home = () => {
  return (
    <Container
      component="div"
      style={{
        position: 'center'
      }}
    >
      <img src="https://cdn.shopify.com/s/files/1/1123/9358/files/St-Paul-Minneapolis-Ski-Shop-Store.jpg?v=1569521134" />
      <AppBar position="static" style={{ backgroundColor: 'lightGrey' }}>
        <Toolbar>
          <h3 style={{ paddingLeft: '32rem' }}>All Catagories</h3>
        </Toolbar>
      </AppBar>
      <ProductGrid />
      {/* Need to move this to its own seperate page. Holding off just incase someone is working on it */}
      {/* <AllProductsGrid /> */}
    </Container>
  );
};

export default Home;

{
  /* if admin run allProducts */
}
