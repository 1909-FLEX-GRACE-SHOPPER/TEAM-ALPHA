import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductThunk } from '../redux/singleProduct.js';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ProductPageQuantityTracker from './ProductPageQuantityTracker.jsx';
import createOrder from '../redux/orders';
import updateOrder from '../redux/orders';
import { withStyles } from '@material-ui/core/styles';
import EditProductForm from './EditProductForm';
import AllProductsGrid from './AllProductsGrid';

const styles = {
  root: {
    //height: '100vh'
    flexGrow: 1
  },
  paper: {
    margin: 'auto'
  },

  img: {
    margin: 'auto',
    display: 'flex',
    maxWidth: '100%',
    maxHeight: '100%'
  }
};

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItem: {},
      quantityOfProduct: 0,
      isEdit: false,
      viewAll: false
    };
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing() {
    //console.log('isEdit', this.state.isEdit);
    this.setState({ isEdit: !this.state.isEdit });
    // console.log('isEdit', this.state.isEdit);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);
  }

  render() {
    console.log(
      'this.props.activeUser.userType',
      this.props.activeUser.userType
    );
    const product = this.props.product;
    if (!product.productListing) {
      return <div>Product not found...</div>;
    } else {
      return (
        <div className={styles.root}>
          <Paper className={styles.paper}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <img
                  className={styles.img}
                  alt="complex"
                  src={product.productListing.imageUrl}
                />
              </Grid>
              <Grid item xs={6} sm container>
                <Grid item>
                  <Typography gutterBottom variant="h5">
                    {product.productListing.name}
                  </Typography>
                  <Grid container direction="row">
                    <Grid item xs={2}>
                      <Paper className={styles.paper}>
                        {' '}
                        {product.color.color}{' '}
                      </Paper>
                      <Paper className={styles.paper}>
                        {' '}
                        {product.gender.gender}{' '}
                      </Paper>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle1">
                      ${product.price}
                    </Typography>
                    <ProductPageQuantityTracker
                      totalNumber={product.quantity}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          {this.props.activeUser.userType === 'admin' ? (
            <Link to="/editProductForm">
              <Button toggleEditing={this.toggleEditing} size="small">
                Edit Product
              </Button>
            </Link>
          ) : (
            ''
          )}
          {this.props.activeUser.userType === 'admin' ? (
            <Link to="/seeAllProducts">
              <Button size="small">See All Products</Button>
            </Link>
          ) : (
            ''
          )}
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  product: state.product,
  cart: state.cart,
  orders: state.orders,
  activeUser: state.activeUser
});

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProductThunk(productId)),
  addToCart: (quantity, cartItem) => dispatch(createOrder(quantity, cartItem)),
  editQuantity: (edits, orderItem) => dispatch(updateOrder(edits, order))
});

const styledComponent = withStyles(styles)(ProductPage);
export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);
