import React from 'react';
import { connect } from 'react-redux';
import ProductTile from './ProductTile';
import Grid from '@material-ui/core/Grid';

const ProductGrid = props => {
  const { products } = props; // might want authentication info too
  if (products.length === 0) return <h3>No Products</h3>;
  return (
    <Grid container spacing={2} style={{ padding: 24 }}>
      {products.map(product => {
        console.log('hello from map', product);
        return (
          <Grid key={product.id} item xs={12} sm={6} lg={3} xl={2}>
            <ProductTile product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};

const mapStateToProps = ({ products }) => ({ products }); // might want authentication too

export default connect(mapStateToProps)(ProductGrid);
