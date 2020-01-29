import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { addNewItemToCart, fetchActiveOrder } from '../redux/cart';
import Grid from '@material-ui/core/Grid';
import { getProductThunk } from '../redux/singleProduct';

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

  componentDidMount() {
    this.setState({ counter: 1 });
    console.log('COUNTER CURRENTLY SET AT', this.state.counter);
  }

  handleIncrement = () => {
    console.log('this.state.totalNumber', this.state.totalNumber);
    if (this.state.counter < this.state.totalNumber) {
      this.setState(state => ({ counter: state.counter + 1 }));
    }
    console.log('COUNTER INCREMENT', this.state.counter);
  };

  handleDecrement = () => {
    this.setState(state => ({ counter: state.counter - 1 }));
  };

  handleSubmit = cartItem => {
    console.log('cartItem', cartItem);
    const quantity = this.state.counter;
    for (let i = 0; i < quantity; i++) {
      this.props.addToCart(cartItem);
    }
    console.log('SUBMIT PROPS CARTITEM', cartItem);
    return this.props.updateCart(cartItem.orderId);
  };
  render() {
    //price, productId, orderId
    // console.log('product', this.props.product.id, this.props.product.price);
    const productItemObject = {
      productId: this.props.product.id,
      unitPrice: this.props.product.price
    };
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
          onClick={ev => this.handleSubmit(productItemObject)}
        >
          add to cart
        </Button>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product,
  cart: state.cart
});
const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProductThunk(productId)),
  addToCart: cartItem => dispatch(addNewItemToCart(cartItem)),
  updateCart: activeOrderId => dispatch(fetchActiveOrder(activeOrderId))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPageQuantityTracker);
