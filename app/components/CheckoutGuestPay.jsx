import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderSummary from './OrderSummary';
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Checkout from './CheckoutButton';
import { modifyUser } from '../redux/activeUser';

const flexStyling = {
  display: 'flex'
};

// give payment info flex grow of 3 and order summary flex grow of 1

class GuestPayment extends Component {
  constructor() {
    super();
    this.state = {
      shippingIsBilling: true,
      billingAddress1: '',
      billingAddress2: '',
      billingCity: '',
      billingState: '',
      billingZip: ''
    };
  }

  componentDidUpdate() {
    const { activeUser } = this.props;
    if (
      this.props.authentication.isLoggedIn &&
      this.state.billingCity !== activeUser.billingCity
    ) {
      this.setState({
        billingAddress1: activeUser.billingAddress1,
        billingAddress2: activeUser.billingAddress2,
        billingCity: activeUser.billingCity,
        billingState: activeUser.billingState,
        billingZip: activeUser.billingZip
      });
    }
  }

  handleSwitchChange = () => {
    const { shippingIsBilling } = this.state;
    const newShippingIsBilling = !shippingIsBilling;
    this.setState({
      shippingIsBilling: newShippingIsBilling
    });
  };

  billingFields = () => {
    const { shippingIsBilling } = this.state;
    if (shippingIsBilling) {
      return null;
    } else {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Billing Address
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="billingAddress1"
              name="billingAddress1"
              label="Address Line 1"
              value={this.state.billingAddress1}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="billingAddress2"
              name="billingAddress2"
              label="Address Line 2"
              value={this.state.billingAddress2}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="billingCity"
              name="billingCity"
              label="City"
              value={this.state.billingCity}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="billingState"
              name="billingState"
              label="State"
              value={this.state.billingState}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="billingZip"
              name="billingZip"
              label="Zip"
              value={this.state.billingZip}
              onChange={this.handleChange}
            />
          </Grid>
        </Grid>
      );
    }
  };

  onSubmit = ev => {
    ev.preventDefault();
    // const { orders } = this.props;
    // const { activeOrder } = orders;
    console.log('props in pay page on submit, ', this.props);
    const { shippingIsBilling } = this.state;
    if (shippingIsBilling) {
      console.log('if you see this, shipping is Billing');
      const {
        shippingAddress1,
        shippingAddress2,
        shippingCity,
        shippingState,
        shippingZip
      } = this.props.activeUser;
      const edits = {
        billingAddress1: shippingAddress1,
        billingAddress2: shippingAddress2,
        billingCity: shippingCity,
        billingState: shippingState,
        billingZip: shippingZip
      };
      return this.props.editUser(edits);
    }
    const {
      billingAddress1,
      billingAddress2,
      billingCity,
      billingState,
      billingZip
    } = this.state;
    const edits = {
      billingAddress1,
      billingAddress2,
      billingCity,
      billingState,
      billingZip
    };
    console.log(this.state);
    console.log(edits);
    this.props.editUser(edits);
    // complete order thunk
  };

  render() {
    const { activeUser, cart } = this.props;
    // console.log('activeUser:', activeUser);
    console.log('props on checkout pay', this.props);
    const { orderTotal } = cart;
    // change edit link to correct address when we figure it out
    return (
      <Fragment>
        <CssBaseline />
        {/* <div>Insert Bread Crumbs Here</div> */}
        <div style={flexStyling}>
          <div style={{ flexGrow: 3 }}>
            <hr />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>
                <b>Shipping Address </b>
                {`${activeUser.shippingAddress1} ${activeUser.shippingAddress2} ${activeUser.shippingCity} ${activeUser.shippingState}`}
              </span>
              <Link to="/customerInfo">Edit</Link>
            </div>
            <hr />
            <Grid container>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.shippingIsBilling}
                        onChange={this.handleSwitchChange}
                        // need value?
                      />
                    }
                    label="Billing Address is Same as Shipping"
                  />
                </FormGroup>
              </Grid>
            </Grid>
            {this.billingFields()}
            <Grid container justify="space-between">
              <Grid item>
                <Link to="/customerInfo" style={{ textDecoration: 'none' }}>
                  <ArrowBackIcon /> Return to Customer Information
                </Link>
              </Grid>
              <Grid item onClick={() => this.onSubmit(event)}>
                <Checkout
                  name={`${activeUser.firstName} ${activeUser.lastName}`}
                  description="Enjoy your order!"
                  amount={orderTotal}
                />
              </Grid>
            </Grid>
          </div>
          <div style={{ flexGrow: 1 }}>
            <OrderSummary />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ activeUser, cart, authentication, orders }) => ({
  activeUser,
  cart,
  authentication,
  orders
});

const mapDispatchToProps = dispatch => {
  return {
    editUser: edits => dispatch(modifyUser(edits))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestPayment);
