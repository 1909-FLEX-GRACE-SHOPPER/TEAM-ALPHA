import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductThunk } from '../redux/singleProduct.js';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
//import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const ProductCatTile = props => {
  // // useEffect(() => {
  // //   const { id } = props.match.params;
  // //   props.getProduct(id);
  // // }, []);
  // console.log('the props are:', props);
  // const id = 5;
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

  if (!product.name) {
    return <div>Product not found...</div>;
  } else {
    return (
      <div>
        <Card className={classes.card}>
          <Link to={`/categories/${product.categoryId}`}>
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

// const mapStateToProps = state => ({
//   product: state.product
// });

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProductThunk(productId))
});

export default connect(null, mapDispatchToProps)(ProductCatTile);
