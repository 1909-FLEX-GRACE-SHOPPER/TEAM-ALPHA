import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MenuItem, FormHelperText } from '@material-ui/core';
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
      productListingId: 11,
      categoryId: 0,
      colorId: 0,
      gender: '',
      size: '',
      price: 0,
      quantity: 0,
      name: '',
      description: '',
      imageUrl: '',
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }
  // handleChangeNum({ target: { value, name } }) {
  //   this.setState({ [name]: Math.floor(value) });
  // }

  handleSubmit(event) {
    const {
      productListingId,
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
    event.preventDefault();

    if (
      productListingId === 0 ||
      categoryId === 0 ||
      colorId === 0 ||
      gender === '' ||
      size === '' ||
      price === 0 ||
      quantity === '' ||
      name === '' ||
      description === '' ||
      imageUrl === ''
    ) {
      this.setState({ error: true });
    }
  }
  handleClick() {
    const {
      productListingId,
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

    this.props.createProduct({
      gender,
      size,
      quantity,
      price,
      colorId,
      categoryId,
      productListingId
    });
    // axios
    //   .post('/api/productListings', { name, description, imageUrl })
    //   .then(product => console.log('newProduct', product))
    //   .catch(e => console.error(e));
  }

  render() {
    const products = this.props.products; // might want authentication info too

    return (
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
          ADD NEW PRODUCT
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={2} style={{ marginLeft: '8rem' }}>
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
                label="Product category"
                name="category"
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
                label="Product color"
                name="color"
                onChange={this.handleChangeNum}
                variant="outlined"
              />
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <TextField
                id="standard-select-size"
                select
                label="Size"
                name="size"
                onChange={this.handleChange}
                helperText="Please select the size"
              >
                {sizes.map(option => (
                  <MenuItem
                    key={option}
                    value={option}
                    onChange={this.handleChange}
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="select-gender"
                select
                label="Gender"
                name="gender"
                onChange={this.handleChange}
                helperText="Please select the gender"
              >
                {gender.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="select-category"
                select
                name="categoryId"
                label="Category"
                onChange={ev =>
                  this.setState({
                    [ev.target.name]: 1 + categories.indexOf(ev.target.value)
                  })
                }
                helperText="Please select the Category"
              >
                {categories.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="select-color"
                select
                name="colorId"
                label="Color"
                onChange={ev =>
                  this.setState({
                    [ev.target.name]: 1 + +colorsList.indexOf(ev.target.value)
                  })
                }
                helperText="Please select the Color"
              >
                {colorsList.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClick}
              >
                Add product
              </Button>
              {this.state.error ? (
                <FormHelperText
                  id="component-error-text"
                  style={{ textColor: 'red' }}
                >
                  Fill out required fields
                </FormHelperText>
              ) : null}
            </Grid>
          </Grid>
        </form>
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
