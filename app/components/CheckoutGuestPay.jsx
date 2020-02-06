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
import { submitOrder, createOrder } from '../redux/orders';
import { createUser } from '../redux/users';
import { postItemsToCartForGuestUser } from '../redux/cart';

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
      billingZip: '',

      ////

      address1Helper: '',
      address1Err: false,
      cityHelper: '',
      cityErr: false,
      stateHelper: '',
      stateErr: false,
      zipHelper: '',
      zipErr: false
    };
  }

  componentDidMount() {
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

  generateTextFields = (id, label, err, helper) => {
    return (
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={this.handleChange}
        id={id}
        name={id}
        label={label}
        error={this.state[err] || null}
        helperText={this.state[helper] || null}
        value={this.state[id]}
      />
    );
  };

  billingFields = () => {
    const { shippingIsBilling } = this.state;
    const { generateTextFields } = this;
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
            {generateTextFields(
              'billingAddress1',
              'Address Line 1',
              'address1Err',
              'address1Helper'
            )}
          </Grid>
          <Grid item xs={12}>
            {generateTextFields('billingAddress2', 'Address Line 2')}
          </Grid>
          <Grid item xs={12} sm={4}>
            {generateTextFields('billingCity', 'City', 'cityErr', 'cityHelper')}
          </Grid>
          <Grid item xs={12} sm={4}>
            {generateTextFields(
              'billingState',
              'State',
              'stateErr',
              'stateHelper'
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            {generateTextFields('billingZip', 'Zip', 'ZipErr', 'zipHelper')}
          </Grid>
        </Grid>
      );
    }
  };

  //Added this because if user clicks on different billing switch they cannot edit
  // eslint-disable-next-line complexity
  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
    if (name === 'billingAddress1') {
      if (value.length > 0)
        this.setState({ address1Helper: '', address1Err: false });
      else
        this.setState({
          address1Helper: 'Address cannot be empty',
          address1Err: true
        });
    }
    if (name === 'billingCity') {
      if (value.length > 0) this.setState({ cityHelper: '', cityErr: false });
      else
        this.setState({
          cityHelper: 'City cannot be empty',
          cityErr: true
        });
    }
    if (name === 'billingState') {
      if (value.length > 0) this.setState({ stateHelper: '', stateErr: false });
      else
        this.setState({
          stateHelper: 'State cannot be empty',
          stateErr: true
        });
    }
    if (name === 'billingZip') {
      if (isNaN(Number(this.state.billingZip))) {
        this.setState({ zipHelper: 'Zip code must be numeric', zipErr: true });
      } else if (value.length > 0 && !isNaN(Number(this.state.billingZip)))
        this.setState({ zipHelper: '', zipErr: false });
      else
        this.setState({
          zipHelper: 'Zip code cannot be empty',
          zipErr: true
        });
    }
  };

  onSubmit = ev => {
    ev.preventDefault();
    const { shippingIsBilling } = this.state;
    if (shippingIsBilling) {
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
    this.props.editUser(edits);
  };

  render() {
    const {
      activeUser,
      cart,
      orders,
      submitOrder,
      createOrder,
      createUser,
      postGuestItems,
      authentication
    } = this.props;
    const { orderTotal } = cart;
    const { activeOrder } = orders;

    // Found a way to hack in the totalCost for the order. Probably not the best way to do it.
    const updatedActiveOrderTotal = {
      ...activeOrder,
      totalCost: orderTotal
    };
    console.log('DID ORDER TOTAL UPDATE?????!?!', updatedActiveOrderTotal);

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
                  activeOrder={updatedActiveOrderTotal}
                  submitOrder={submitOrder}
                  // below is for guest
                  activeUser={activeUser}
                  createOrder={createOrder}
                  cart={cart}
                  postGuestItems={postGuestItems}
                  createUser={createUser}
                  authentication={authentication}
                  billingAddress={this.state.billingAddress1}
                  billingCity={this.state.billingCity}
                  billingState={this.state.billingState}
                  billingZip={this.state.billingZip}
                  shipBillStatus={this.state.shippingIsBilling}
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
    editUser: edits => dispatch(modifyUser(edits)),
    submitOrder: order => dispatch(submitOrder(order)),
    createOrder: order => dispatch(createOrder(order)),
    createUser: user => dispatch(createUser(user)),
    postGuestItems: items => dispatch(postItemsToCartForGuestUser(items))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestPayment);
