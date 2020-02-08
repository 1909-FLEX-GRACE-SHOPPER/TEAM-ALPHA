import React from 'react';
import { connect } from 'react-redux';
import { updateProductThunk } from '../redux/products.js';
import { getProductThunk } from '../redux/singleProduct.js';
import { getProductListingThunk } from '../redux/productListing.js';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
const sizes = ['one size', 'XS', 'S', 'M', 'L', 'XL'];
const gender = ['F', 'M', 'N'];

const categories = [
  'skis',
  'boots',
  'pants',
  'jackets',
  'shirts',
  'poles',
  'gloves',
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

class EditProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productListingId: '',
      categoryId: '',
      colorId: '',
      gender: '',
      name: '',
      description: '',
      imageUrl: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    console.log('this.state in EPF, is toggle here?', this.state);
    //console.log('this.props.products.id', this.props.products.id);
    ev.preventDefault();
    const productId = this.props.product.id;
    const productListingId = this.props.product.productListing.id;
    console.log(' inside handleSubmit');
    this.props.updateProduct(productId, productListingId, { ...this.state });
  }
  componentDidMount() {
    const productLarger = this.props.product;
    this.setState({
      productListingId: productLarger.productListing.id,
      categoryId: productLarger.categoryId,
      colorId: productLarger.colorId,
      gender: productLarger.gender,
      name: productLarger.productListing.name,
      description: productLarger.productListing.description,
      imageUrl: productLarger.productListing.imageUrl
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.product.productListing.name &&
      prevProps.product.productListing.name !==
        this.props.product.productListing.name
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
    console.log('this.props inside EPF', this.props);
    const products = this.props.product;
    const productsListingId = products.productListingId;
    const maxId = Math.max(...productsListingId);
    return (
      <div>
        <form onSubmit={ev => this.handleSubmit(ev)}>
          <TextField
            id="product-name"
            name="name"
            label="Product Name"
            onChange={this.handleChange}
            variant="outlined"
          />

          <TextField
            id="product-ImageURL"
            name="imageUrl"
            label="Product ImageURL"
            onChange={this.handleChange}
            variant="outlined"
          />

          <TextField
            id="product-description"
            name="description"
            label="Product Description"
            onChange={e => this.handleChange(e)}
            variant="outlined"
          />

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

          <TextField
            id="product-quantity"
            label="Product quantity"
            name="quantity"
            onChange={e => this.handleChange(e)}
            variant="outlined"
          />

          <TextField
            id="product-size"
            label="Product Size"
            name="size"
            onChange={e => this.handleChange(e)}
            variant="outlined"
          />

          <TextField
            id="product-quantity"
            label="Product gender"
            name="gender"
            onChange={e => this.handleChange(e)}
            variant="outlined"
          />

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

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '2rem' }}
            onClick={this.handleSubmit}
          >
            Submit Edit
          </Button>
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
