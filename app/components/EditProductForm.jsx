import React from 'react';
import { connect } from 'react-redux';
import { updateProductThunk } from '../redux/products.js';
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

class EditProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productListingId: 0,
      categoryId: 0,
      colorId: 0,
      gender: '',
      name: '',
      description: '',
      imageUrl: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }
  handleSubmit(ev) {
    //console.log('this.props.products.id', this.props.products.id);
    ev.preventDefault();
    const productId = this.props.products.id;
    const productListingId = this.props.products.productListing.id;
    this.props.updateProduct(productId, productListingId, { ...this.state });
    this.props.toggleEdit();
  }
  handleClick() {
    // const products = this.props.products;
    // console.log('products inside handleclick', products);
    // const productsListingId = products.productListingId;
    // const maxId = Math.max(...productsListingId);
    // const {
    //   categoryId,
    //   colorId,
    //   gender,
    //   size,
    //   price,
    //   quantity,
    //   name,
    //   description,
    //   imageUrl
    // } = this.state;
    // this.props.updateProduct(products, {
    //   gender,
    //   size,
    //   quantity,
    //   price,
    //   colorId,
    //   categoryId,
    //   productListingId: maxId + 1
    // });
    // axios
    //   .put(`/api/productListings/${productsListingId}`, {
    //     name,
    //     description,
    //     imageUrl,
    //     id: maxId + 1
    //   })
    //   .then(product => console.log('editedProduct', product))
    //   .catch(e => console.error(e));
    // this.props.toggleEdit();
  }

  render() {
    const products = this.props.products;
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

const mapDispatchToProps = dispatch => ({
  updateProduct: (productId, productListingId, edits) =>
    dispatch(updateProductThunk(productId, productListingId, edits))
});

export default connect(null, mapDispatchToProps)(EditProductForm);
