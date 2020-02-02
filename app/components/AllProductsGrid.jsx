import React from 'react';
import { connect } from 'react-redux';
import ProductTile from './ProductTile';
import Grid from '@material-ui/core/Grid';

//why isn't this map working??

// const getAllProd = products => {
//   let allProdArr = products.map(prodNum => {
//     if (prodNum.quantity === 1) {
//       return prodNum.productListing;
//     } else {
//       for (let i = 0; i < prodNum.quantity; i++) {
//         return prodNum.productListing;
//       }
//     }
//   });
//   console.log('allProdArr', allProdArr);
//   return allProdArr;
// };

/** function gathers one of each product and push into array * */
const getAllProd = products => {
  let allProdArr = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].quantity === 1) {
      allProdArr.push(products[i]);
    } else {
      let numToPush = products[i].quantity;
      for (let i = 0; i < numToPush; i++) {
        allProdArr.push(products[i]);
      }
    }
  }

  return allProdArr;
};

const AllProductsGrid = props => {
  const productsArr = props.products;
  // might want authentication info too

  if (productsArr.length === 0) return <h3>No Products</h3>;
  return (
    <Grid container spacing={2} style={{ padding: 24 }}>
      {getAllProd(productsArr).map(uniqueProd => {
        return (
          <Grid key={uniqueProd.id} item xs={12} sm={6} lg={3} xl={2}>
            <ProductTile product={uniqueProd} />
          </Grid>
        );
      })}
    </Grid>
  );
};

const mapStateToProps = ({ products }) => ({ products }); // might want authentication too

export default connect(mapStateToProps, null)(AllProductsGrid);
//map key not unique
