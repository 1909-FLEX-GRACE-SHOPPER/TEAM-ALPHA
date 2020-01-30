import React from 'react';
import { connect } from 'react-redux';
import ProductCatTile from './ProductCatTile';
import Grid from '@material-ui/core/Grid';

/** function gathers one of each product by category * */
const getArrOfCategories = arr => {
  const ids = {};
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    let possibleId = arr[i].categoryId;
    if (!ids[possibleId]) {
      ids[possibleId] = 1;
      results.push(arr[i]);
    }
  }
  return results;
};

const ProductGrid = props => {
  const products = props.products; // might want authentication info too

  if (products.length === 0) return <h3>No Products</h3>;
  return (
    <Grid container spacing={2} style={{ padding: 24 }}>
      {getArrOfCategories(products).map(uniqueProd => {
        return (
          <Grid key={uniqueProd.id} item xs={12} sm={6} lg={3} xl={2}>
            <ProductCatTile product={uniqueProd} />
          </Grid>
        );
      })}
    </Grid>
  );
};

const mapStateToProps = ({ products }) => ({ products }); // might want authentication too

export default connect(mapStateToProps)(ProductGrid);
