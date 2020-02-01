import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography, TextField, Container } from '@material-ui/core';

const lineItemStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

class OrderSummary extends Component {
  constructor() {
    super();
    this.state = {
      // promoCode: '', //leaving this commented out until reaching stretch/optional goal of including this feature. Should be simple (depending on how we want the promocode to work ie. apply to single item / entire cart / BOGO )
      // codeArray: [] //will use this so we can map through array to find valid code.
    };
  }

  //NOTE: Leaving this commented out until we decide what kind of promo codes we want (would also be easier to set up if i have data to apply the codes to)
  // handleChange = ({ target: { value, name } }) => {
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  // handleSubmit = (ev) => {
  //   ev.preventDefault()
  //   this.setState({
  //     promoCode: this.state.promoCode
  //   })
  // }

  render() {
    const { promoCode } = this.state;
    const { cart } = this.props;
    console.log('props.cart', cart);

    const orderTax = parseInt(cart.orderTotal) * 0.088725;
    const orderTotal = parseInt(cart.orderTotal) + orderTax;

    return (
      <Container component="div" maxWidth="xs">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f4f4f4'
          }}
        >
          <form
            style={{
              width: '100%'
            }}
          >
            <Typography variant="h6">Summary</Typography>
            <div style={lineItemStyle}>
              <Typography variant="subtitle1">Subtotal:</Typography>
              <Typography variant="subtitle1">${cart.orderTotal}</Typography>
            </div>
            <div style={lineItemStyle}>
              <Typography variant="subtitle1">Shipping:</Typography>
              {/* Need to replace this when adding shipping options */}
              <Typography variant="subtitle1">FREE</Typography>
            </div>
            <div style={lineItemStyle}>
              <Typography variant="subtitle1">Estimated Taxes:</Typography>
              {/* Should we just do a fixed NYC tax for now? */}
              <Typography variant="subtitle1">
                ${orderTax.toFixed(2)}
              </Typography>
            </div>
            <TextField
              name="promoCode"
              label="Promo Code"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              onClick={() => this.handleSubmit(event)}
            >
              Apply Promocode
            </Button>
            <div style={lineItemStyle}>
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="subtitle1">
                ${orderTotal.toFixed(2)}
              </Typography>
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

export default connect(mapStateToProps)(OrderSummary);
