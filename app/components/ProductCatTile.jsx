import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductThunk } from '../redux/singleProduct.js';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

const ProductCatTile = props => {
  const mapCategories = {
    1: 'Skis',
    2: 'Boots',
    3: 'Pants',
    4: 'Jackets',
    5: 'Shirts',
    6: 'Poles',
    7: 'Gloves',
    8: 'Goggles'
  };

  const product = props.product;

  const categoryId = product.categoryId;

  const useStyles = makeStyles({
    card: {
      maxWidth: 300
    },
    media: {
      height: 140
    }
  });
  const classes = useStyles();

  if (!product.categoryId) {
    return <div>Product not found...</div>;
  } else {
    return (
      <div>
        <Card className={classes.card}>
          <Link to={`/categories/${product.categoryId}`}>
            <ButtonBase className={classes.image}>
              <img
                height="256"
                width="256"
                className={classes.img}
                alt="complex"
                src={product.productListing.imageUrl}
              />
            </ButtonBase>
          </Link>
          <CardActions>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/categories/${product.categoryId}`}
            >
              {mapCategories[categoryId]}
            </Link>
          </CardActions>
        </Card>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProductThunk(productId))
});

export default connect(null, mapDispatchToProps)(ProductCatTile);
