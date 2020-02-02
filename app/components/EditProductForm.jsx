import React from 'react';
import { connect } from 'react-redux';
import { updateProduct } from '../redux/products.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

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
  }
  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }
  handleSubmit(ev) {
    console.log('this.props.products.id', this.props.products.id);
    ev.preventDefault();

    this.props.editProduct(this.props.products, { ...this.state });
    this.props.toggleEdit();
  }
  render() {
    console.log('this.props inside EPF', this.props);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* <TextField
            id="color"
            label="color"
            onChange={ev => this.handleChange(ev)}
            value={this.state.color}
          /> */}
          <label htmlFor="color">Color: </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="color"
            id="color"
          />
          {/* <label htmlFor="name">name: </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            id="name"
          />
          <label htmlFor="imageUrl">imageUrl: </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="imageUrl"
            id="imageUrl"
          />
          <label htmlFor="quantiy">quantity: </label>
          <input
            onChange={this.handleChange}
            type="number"
            name="quantity"
            id="quantity"
          /> */}
          <Button onClick={this.handleSubmit} type="submit">
            {' '}
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  editProduct: (product, edits) => dispatch(updateProduct(product, edits))
});

export default connect(null, mapDispatchToProps)(EditProductForm);
