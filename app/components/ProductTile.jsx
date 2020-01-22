import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductThunk } from '../redux/singleProduct.js';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const ProductTile = props => {
  useEffect(() => {
    const { id } = props.match.params;
    props.getProduct(id);
  }, []);

  const product = props.product;
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
          <Link
            to={`/products/${product.id}`}
            onClick={() => props /*props.singleProduct(product)}*/}
          >
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={product.imageUrl}
              />
            </ButtonBase>
          </Link>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => props /*props.singleProduct(product)}*/}
            >
              {product.name}
            </Button>
            <Typography variant="body2" color="textSecondary" component="p">
              ${product.price}
            </Typography>
          </CardActions>
        </Card>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  product: state.product
});

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProductThunk(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductTile);
