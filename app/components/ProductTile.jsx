import React from 'react';
import { connect } from 'react-redux';
import { getProductThunk } from '../redux/singleProduct.js';
import { Link } from 'react-router-dom';

import {
  ButtonBase,
  Button,
  TextField,
  Grid,
  Typography,
  CardActions,
  Card
} from '@material-ui/core';

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
              <Grid item xs={3}>
                <Link
                  style={{ textDecoration: 'none' }}
                  size="small"
                  color="primary"
                  to={`/products/${products.id}`}
                >
                  {product.name}
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                >
                  {products.color.color}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary" component="p">
                  ${products.price}
                </Typography>
              </Grid>
            </CardActions>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                {products.productListing.description}
              </Typography>
            </Grid>
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
