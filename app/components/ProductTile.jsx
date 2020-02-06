import React from 'react';
import { connect } from 'react-redux';
import { getProductThunk } from '../redux/singleProduct.js';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';
import EditProductForm from './EditProductForm';

class ProductTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
    this.toggleEditing = this.toggleEditing.bind(this);
  }
  toggleEditing() {
    this.setState({ isEditing: !this.state.isEditing });
    console.log(this.state.isEditing);
  }

  render() {
    const products = this.props.product;
    const product = products.productListing;
    console.log('this.props', this.props);
    console.log('this.state.isEditing', this.state.isEditing);
    console.log(
      'this.props.activeUser.userTypes',
      this.props.activeUser.userTypes
    );

    if (!this.props.product) {
      return <div>Product not found...</div>;
    } else {
      return (
        <div>
          <Card>
            <Link to={`/products/${products.id}`}>
              <ButtonBase>
                <img alt="complex" src={product.imageUrl} />
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
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
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
  }
}

const mapStateToProps = state => ({
  activeUser: state.activeUser
});

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProductThunk(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductTile);
