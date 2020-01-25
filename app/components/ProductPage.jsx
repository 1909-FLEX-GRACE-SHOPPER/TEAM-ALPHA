import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductThunk } from '../redux/singleProduct.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import IncrementCounter from './IncrementCounter.jsx';

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

const mapSizes = {
  1: 'XS',
  2: 'S',
  3: 'M',
  4: 'L',
  5: 'XL',
  6: 'XXL'
};
const mapCategories = {
  1: 'skis',
  2: 'boots',
  3: 'pants',
  4: 'jackets',
  5: 'shirts',
  6: 'poles',
  7: 'gloves',
  8: 'goggles'
};
const mapGenders = {
  1: 'F',
  2: 'M',
  3: 'N'
};
// const productsWithTextFields = products.map(product => {
//   const color = mapColors[product.colorId];
//   const size = mapSizes[product.genderId];
//   const category = mapCategories[product.categoryId];
//   const gender = mapGenders[product.genderId];
//   product.color = color;
//   product.size = size;
//   product.category = category;
//   product.gender = gender;
//   return product;
// });
const ProductPage = props => {
  useEffect(() => {
    const { id } = props.match.params;
    props.getProduct(id);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const product = props.product;
  console.log(product);
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
              <Button
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                Color
              </Button>
              <Button
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                Size
              </Button>

              <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose}>
                  {mapSizes[product.sizeId]}
                </MenuItem>
              </Menu>
              <Typography variant="subtitle1">${product.price}</Typography>
              <IncrementCounter />
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
// need to
//add onClick to add to cart
// link incrementor to cart
// map through menu options
