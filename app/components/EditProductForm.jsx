import React from 'react';
import { connect } from 'react-redux';
import { updateProductThunk } from '../redux/products.js';
import { getProductThunk } from '../redux/singleProduct.js';
import { getProductListingThunk } from '../redux/productListing.js';
import { Button, TextField, Grid, Typography } from '@material-ui/core';
const sizes = ['one size', 'XS', 'S', 'M', 'L', 'XL'];
const gender = ['F', 'M', 'N'];

function checkCategories(currentValue) {
  const categories = {
    1: 'skis',
    2: 'boots',
    3: 'pants',
    4: 'jackets',
    5: 'shirts',
    6: 'poles',
    7: 'gloves',
    8: 'goggles'
  };
  if (categories[currentValue]) {
    return categories[currentValue];
  }
}

function checkColor(currentValue) {
  const colorsList = {
    1: 'blue',
    2: 'green',
    3: 'yellow',
    4: 'tomato',
    5: 'red',
    6: 'dodgerBlue',
    7: 'white',
    8: 'black',
    9: 'gray'
  };
  if (colorsList[currentValue]) {
    return colorsList[currentValue];
  }
}
function setCategoryKey(ev) {
  const categories = {
    1: 'skis',
    2: 'boots',
    3: 'pants',
    4: 'jackets',
    5: 'shirts',
    6: 'poles',
    7: 'gloves',
    8: 'goggles'
  };
  console.log(
    'Object.keys(categories).find(key => categories[key] === ev.target.value)',
    Object.keys(categories).find(key => categories[key] === ev.target.value)
  );
  return Object.keys(categories).find(
    key => categories[key] === ev.target.value
  );
}

function setColorKey(ev) {
  const colorList = {
    1: 'blue',
    2: 'green',
    3: 'yellow',
    4: 'tomato',
    5: 'red',
    6: 'dodgerBlue',
    7: 'white',
    8: 'black',
    9: 'gray'
  };
  console.log(
    'Object.keys(colorList).find(key => colorList[key] === ev.target.value)',
    Object.keys(colorList).find(key => colorList[key] === ev.target.value)
  );
  return Object.keys(colorList).find(key => colorList[key] === ev.target.value);
}

class EditProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productListingId: '',
      categoryId: '',
      colorId: '',
      gender: '',
      name: '',
      price: '',
      size: '',
      quantity: '',
      description: '',
      imageUrl: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    console.log('...this.state inside HandleSubmit', { ...this.state });
    const productId = this.props.product.id;
    const productListingId = this.props.product.productListing.id;
    this.props.updateProduct(productId, productListingId, { ...this.state });
  }
  componentDidMount() {
    const productLarger = this.props.product;

    this.setState({
      productListingId: productLarger.productListing.id,
      categoryId: productLarger.categoryId,
      price: productLarger.price,
      size: productLarger.size,
      quantity: productLarger.quantity,
      colorId: productLarger.colorId,
      gender: productLarger.gender,
      name: productLarger.productListing.name,
      description: productLarger.productListing.description,
      imageUrl: productLarger.productListing.imageUrl
    });
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.product.productListing.name &&
        prevProps.product.productListing.name !==
          this.props.product.productListing.name) ||
      (prevProps.product.price &&
        prevProps.product.price !== this.props.product.price) ||
      (prevProps.product.gender &&
        prevProps.product.gender !== this.props.product.gender) ||
      (prevProps.product.productListing.imageUrl &&
        prevProps.product.productListing.imageUrl !==
          this.props.product.productListing.imageUrl) ||
      (prevProps.product.quantity &&
        prevProps.product.quantity !== this.props.product.quantity) ||
      (prevProps.product.productListing.categoryId &&
        prevProps.product.productListing.categoryId !==
          this.props.product.productListing.categoryId) ||
      (prevProps.product.productListing.description &&
        prevProps.product.productListing.description !==
          this.props.product.productListing.description) ||
      prevProps.product.size &
        (prevProps.product.size !== this.props.product.size) ||
      (prevProps.product.colorId &&
        prevProps.product.colorId !== this.props.product.colorId)
    ) {
      const productId = this.props.product.id;
      console.log('component updated');
      this.props.history.push(`/products/${productId}`);
    } else {
      console.log('prev props', prevProps.product.productListing);
    }
  }
  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };
  render() {
    const products = this.props.product;
    const productsListingId = products.productListingId;
    return (
      <div>
        <form
          onSubmit={ev => this.handleSubmit(ev)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '3rem 3rem 3rem 3rem',
            borderBottom: 'solid 2px darkGrey',
            paddingBottom: '4rem'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginLeft: '15rem' }}>
              <Typography variant="h5" color="textPrimary">
                Edit Product here:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="product-name"
                name="name"
                label="Product Name"
                value={this.state.name}
                onChange={this.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="product-ImageURL"
                name="imageUrl"
                label="Product ImageURL"
                value={this.state.imageUrl}
                onChange={this.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="product-description"
                name="description"
                label="Product Description"
                value={this.state.description}
                onChange={e => this.handleChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="product-price"
                label="Product Price"
                name="price"
                value={this.state.price}
                onChange={ev =>
                  this.setState({
                    [ev.target.name]: parseFloat(ev.target.value)
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="product-quantity"
                label="Product quantity"
                name="quantity"
                value={this.state.quantity}
                onChange={ev =>
                  this.setState({
                    [ev.target.name]: parseFloat(ev.target.value)
                  })
                }
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="product-quantity"
                label="Product gender"
                name="gender"
                value={this.state.gender}
                onChange={e => this.handleChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="product-category"
                label="Product Category"
                name="categoryId"
                value={this.state.categoryId}
                onChange={ev =>
                  this.setState({
                    [ev.target.name]: parseInt(ev.target.value)
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="product-color"
                label="Product Color"
                name="colorId"
                value={this.state.colorId}
                onChange={ev =>
                  this.setState({ [ev.target.name]: parseInt(ev.target.value) })
                }
              />
            </Grid>

            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '2rem' }}
                onClick={this.handleSubmit}
              >
                Submit Edit
              </Button>
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="product-catagory-key"
                label="Product Catagory Key"
                name="catagoryKey"
                value="1: skis 2: boots 3: pants 4: jackets 5: shirts 6: poles 7: gloves 8: goggles"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="product-color-key"
                label="Product Color Key"
                name="colorKey"
                value="1: blue 2: green 3: yellow 4: tomato 5: red 6: dodgerBlue 7: white 8: black 9: gray"
              />
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({ product }) => ({ product });

const mapDispatchToProps = dispatch => ({
  updateProduct: (productId, productListingId, edits) =>
    dispatch(updateProductThunk(productId, productListingId, edits)),
  getProduct: productId => dispatch(getProductThunk(productId)),
  getProductListing: productListingId =>
    dispatch(getProductListingThunk(productListingId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm);
