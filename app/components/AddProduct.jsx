import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createProduct } from '../redux/products';
const sizes = ['one size', 'XS', 'S', 'M', 'L', 'XL'];
const gender = ['F', 'M', 'N'];

const categories = [
  'skis',
  'boots',
  'pants',
  'jackets',
  'shirts',
  'poles',
  ' gloves',
  'goggles'
];

const colorsList = [
  'blue',
  'green',
  'yellow',
  'tomato',
  'red',
  'dodgerBlue',
  'white',
  'black',
  'gray'
];

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productListingId: 0,
      categoryId: 0,
      colorId: 0,
      gender: '',
      size: '',
      price: 0,
      quantity: 0,
      name: '',
      description: '',
      imageUrl: '',
      error: false,
      errorText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  handleClick() {
    const products = this.props.products; // might want authentication info too
    const productsListingId = products.map(product => product.productListingId);
    const maxId = Math.max(...productsListingId);
    const {
      categoryId,
      colorId,
      gender,
      size,
      price,
      quantity,
      name,
      description,
      imageUrl
    } = this.state;
    if (price === '') {
      this.state.error = true;
      this.setState({ errorText: 'Price' });
    }
    if (categoryId === '') {
      this.state.error = true;
      this.setState({ errorText: 'Category Id' });
    }
    if (colorId === '') {
      this.state.error = true;
      this.setState({ errorText: 'Color Id' });
    }
    if (gender === '') {
      this.state.error = true;
      this.setState({ errorText: 'Gender' });
    }
    if (quantity === '') {
      this.state.error = true;
      this.setState({ errorText: 'Quantity' });
    }
    if (name === '') {
      this.state.error = true;
      this.setState({ errorText: 'Product Name' });
    }
    if (description === '') {
      this.state.error = true;
      this.setState({ errorText: 'Description' });
    }
    if (imageUrl === '') {
      this.state.error = true;
      this.setState({ errorText: 'Image URL' });
    }
    if (this.state.error === false) {
      this.props.history.push('/');
    }

    this.props.createProduct({
      gender,
      size,
      quantity,
      price,
      colorId,
      categoryId,
      productListingId: maxId + 1
    });
    axios
      .post('/api/productListings', {
        name,
        description,
        imageUrl,
        id: maxId + 1
      })
      .then(product => console.log('newProduct', product))
      .catch(e => console.error(e));
  }

  render() {
    const products = this.props.products; // might want authentication info too
    const productsListingId = products.map(product => product.productListingId);
    const maxId = Math.max(...productsListingId);
    return (
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '5rem',
          borderBottom: 'solid 2px darkGrey'
        }}
      >
        <form onSubmit={ev => this.handleSubmit(ev)}>
          <Grid container spacing={2} style={{ marginLeft: '8rem' }}>
            <Grid item xs={12} style={{ marginLeft: '25rem' }}>
              <Typography component="h1" variant="h5">
                ADD NEW PRODUCT
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="product-name"
                name="name"
                label="Product Name"
                onChange={this.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="product-ImageURL"
                name="imageUrl"
                label="Product ImageURL"
                onChange={this.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="product-description"
                name="description"
                label="Product Description"
                onChange={e => this.handleChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="product-price"
                label="Product Price"
                name="price"
                onChange={ev =>
                  this.setState({
                    [ev.target.name]: parseFloat(ev.target.value)
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="product-quantity"
                label="Product quantity"
                name="quantity"
                onChange={e => this.handleChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="product-size"
                label="Product Size"
                name="size"
                onChange={e => this.handleChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="product-quantity"
                label="Product gender"
                name="gender"
                onChange={e => this.handleChange(e)}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                id="product-quantity"
                label="Product Category Id"
                name="categoryId"
                onChange={ev =>
                  this.setState({
                    [ev.target.name]: parseInt(ev.target.value)
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="product-quantity"
                label="Product Color Id"
                name="colorId"
                onChange={ev =>
                  this.setState({
                    [ev.target.name]: parseInt(ev.target.value)
                  })
                }
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} style={{ marginLeft: '28.5rem' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '2rem' }}
                onClick={this.handleClick}
              >
                Add product
              </Button>
            </Grid>
          </Grid>
        </form>
        {this.state.error === true ? (
          <FormHelperText
            id="component-error-text"
            style={{
              fontSize: '1.5rem',
              color: 'red',
              marginLeft: '3rem'
            }}
          >
            {this.state.errorText} is required!
          </FormHelperText>
        ) : null}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createProduct: productObj => {
      dispatch(createProduct(productObj));
    }
  };
};
const mapStateToProps = ({ products }) => ({ products });

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
