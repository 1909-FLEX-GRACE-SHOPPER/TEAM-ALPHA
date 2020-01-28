import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import addToCart from '../redux/cart';
import Grid from '@material-ui/core/Grid';

class ProductPageQuantityTracker extends React.Component {
  constructor(props) {
    super();
    this.state = {
      counter: 1,
      totalNumber: props.totalNumber
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleIncrement = this.handleIncrement.bind(this);
    // this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement = () => {
    console.log('this.state.totalNumber', this.state.totalNumber);
    if (this.state.counter < this.state.totalNumber) {
      this.setState(state => ({ counter: state.counter + 1 }));
    }
  };

  handleDecrement = () => {
    this.setState(state => ({ counter: state.counter - 1 }));
  };

  handleChange = (quantity, cartItem) => {
    this.props.addToCart(quantity, cartItem);
  };
  render() {
    const { counter, totalNumber } = this.state;
    return (
      <Grid>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button onClick={this.handleDecrement} disabled={counter === 1}>
            -
          </Button>
          <Button>{counter}</Button>

          <Button
            onClick={this.handleIncrement}
            disabled={counter === totalNumber}
          >
            +
          </Button>
        </ButtonGroup>
        <Button
          size="small"
          color="primary"
          onClick={ev => this.handleChange()}
        >
          add to cart
        </Button>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product,
  cart: state.cart,
  orders: state.orders
});
const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProductThunk(productId)),
  addToCart: (quantity, cartItem) => dispatch(createOrder(quantity, cartItem)),
  editQuantity: (edits, orderItem) => dispatch(updateOrder(edits, order))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPageQuantityTracker);
