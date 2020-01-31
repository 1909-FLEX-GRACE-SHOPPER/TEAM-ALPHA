import React from 'react';
import { connect } from 'react-redux';
import { editSingleProductThunk } from '../redux/singleProduct.js';

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      description: this.props.description,
      address: this.props.address
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  handleSubmit(ev) {
    ev.preventDefault();
    //console.log('######this.props', this.props);
    const editedProduct = {
      name: this.state.name,
      description: this.state.description,
      address: this.state.address
    };
    this.props.editProduct(this.props.product.id, editedProduct);

    this.props.editing();
  }

  render() {
    console.log('props in editProduct', this.props);

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* <label htmlFor="name">
            Campus name:
            <input onChange={this.handleChange} type="text" name="name" />
          </label>
          <label htmlFor="address">
            Campus address:
            <input onChange={this.handleChange} type="text" name="address" />
          </label>
          <label htmlFor="description">
            Campus description:
            <input
              onChange={this.handleChange}
              type="text"
              name="description"
            />
          </label> */}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product
});

const mapDispatchToProps = dispatch => ({
  editProduct: (id, product) => dispatch(editSingleProductThunk(id, product))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
