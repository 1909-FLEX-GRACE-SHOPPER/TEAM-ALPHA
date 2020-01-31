import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductThunk } from '../redux/singleProduct.js';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import AllProductsGrid from './AllProductsGrid.jsx';
import { fetchProductsOfACat, fetchProducts } from '../redux/products.js';

class ProductTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUserType: this.props.activeUser.userTypes,
      products: this.props.products
    };
  }
  componentDidMount() {
    console.log('CDM');
    let id = parseInt(this.props.match.params.id);
    this.props.getProduct(id);
    this.props.fetchProductsOfACat(id);
    this.props.fetchProducts();
  }
  render() {
    console.log('this.state', this.state);
    console.log('this.props.match', this.props.match);

    if (!this.state.products) {
      return <div>Product not found...</div>;
    } else {
      return (
        <div>
          <Card>
            <Link to={`/products/${this.state.products.id}`}>
              <ButtonBase>
                <img
                  alt="complex"
                  src={this.state.products.productListing.imageUrl}
                />
              </ButtonBase>
            </Link>
            <CardActions>
              <Link
                style={{ textDecoration: 'none' }}
                size="small"
                color="primary"
                to={`/products/${this.state.products.id}`}
              >
                {this.state.product.name}
              </Link>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                {this.state.products.color.color}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                ${this.state.products.price}
              </Typography>
            </CardActions>
          </Card>
          {this.state.activeUserType === 'admin' ? <AllProductsGrid /> : ''}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  product: state.product,
  activeUser: state.activeUser,
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProductThunk(productId)),
  fetchProductsOfACat: categoryId => dispatch(fetchProductsOfACat(categoryId)),
  fetchProducts: () => dispatch(fetchProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductTile);
