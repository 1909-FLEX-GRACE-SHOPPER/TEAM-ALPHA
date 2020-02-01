import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductThunk } from '../redux/singleProduct.js';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const ProductTile = props => {
  const products = props.product;
  const product = products.productListing;
  console.log('products.color.color', products.color.color);
  console.log('product');

  const useStyles = makeStyles({
    card: {
      maxWidth: 300
    },
    media: {
      height: 140
    }
  });
  const classes = useStyles();

  if (!product.name) {
    return <div>Product not found...</div>;
  } else {
    return (
      <div>
        <Card className={classes.card}>
          <Link to={`/products/${products.id}`}>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={product.imageUrl}
              />
            </ButtonBase>
          </Link>
          <CardActions>
            <Link
              style={{ textDecoration: 'none' }}
              size="small"
              color="primary"
              to={`/products/${products.id}`}
            >
              {product.name}
            </Link>
            <Typography variant="subtitle1" color="textSecondary" component="p">
              {products.color.color}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ${products.price}
            </Typography>
          </CardActions>
        </Card>
      </div>
    );
  }
};

// const mapStateToProps = state => ({
//   product: state.product
// });

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProductThunk(productId))
});
//const mapStateToProps = ({ product }) => ({ product });

//export default connect(mapStateToProps)(ProductTile);
export default connect(null, mapDispatchToProps)(ProductTile);
