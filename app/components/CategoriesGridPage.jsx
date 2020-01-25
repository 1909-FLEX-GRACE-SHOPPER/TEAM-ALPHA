import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProductTile from './ProductTile';
import Grid from '@material-ui/core/Grid';
import { fetchProductsOfACat } from '../redux/products.js';

/** function filters all products and returns array of products of selected category * */
const getArrOfProdsOfACat = (arrOfAllProd, id) => {
  //console.log(arrOfAllProd, id);
  const cats = arrOfAllProd.filter(prod => {
    // console.log('prod.categoryId', prod.categoryId);
    // console.log('id', id);
    return prod.categoryId == id;
  });
  return cats;
};
//console.log(getArrOfProdsOfACat);
const CategoriesGridPage = props => {
  const { products } = props;
  const id = parseInt(props.match.params.id, 10);

  // useEffect(() => {
  //   props.getProducts(id);
  // }, []);

  if (products.length === 0) return <h3>No Products</h3>;
  const result = getArrOfProdsOfACat(products, id);
  console.log(result);
  return (
    <Grid container spacing={2} style={{ padding: 24 }}>
      {console.log('productTile', result)}
      {result.map(product => {
        return (
          <Grid key={product.name} item xs={12} sm={6} lg={3} xl={2}>
            <ProductTile product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};
// const mapDispatchToProps = dispatch => ({
//   getProducts: id => dispatch(fetchProductsOfACat(id))
// });
const mapStateToProps = ({ products }) => ({ products });

export default connect(mapStateToProps, null)(CategoriesGridPage);
