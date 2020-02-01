import React from 'react';
import { connect } from 'react-redux';
import { updateProduct } from '../redux/products.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class EditProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.products.productListing.name || '',
      imageUrl: props.products.productListing.imageUrl || '',
      quantity: props.products.quantity || '',
      price: props.products.price || '',
      color: props.products.color.color || '',
      gender: props.products.gender || ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.taget.value
    });
  }
  handleSubmit(ev) {
    this.props.updateProduct(this.props.products.id, { ...this.state });
  }
  render() {
    console.log('this.props inside EPF', this.props);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="color"
            label="color"
            onChange={ev => this.handleChange(ev)}
            value={this.state.color}
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
  editProduct: (edits, product) => dispatch(updateProduct(edits, product))
});

export default connect(null, mapDispatchToProps)(EditProductForm);
