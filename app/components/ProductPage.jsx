import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductThunk } from '../redux/singleProduct.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto'
  },

  img: {
    margin: 'auto',
    display: 'flex',
    maxWidth: '100%',
    maxHeight: '100%'
  }
}));

const ProductPage = props => {
  useEffect(() => {
    const { id } = props.match.params;
    props.getProduct(id);
  }, []);

  const classes = useStyles();
  const product = props.product;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img className={classes.img} alt="complex" src={product.imageUrl} />
          </Grid>
          <Grid item xs={6} sm container>
            <Grid item>
              <Typography gutterBottom variant="h5">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                colors: {product.colorId}
              </Typography>
              <Button size="small" color="primary">
                Men
              </Button>{' '}
              <Button size="small" color="primary">
                Women
              </Button>
              <Typography variant="subtitle1">${product.price}</Typography>
              <Button size="small" color="primary">
                Women
              </Button>
              <Button size="small" color="primary">
                add to cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
const mapStateToProps = state => ({
  product: state.product
});

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProductThunk(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
