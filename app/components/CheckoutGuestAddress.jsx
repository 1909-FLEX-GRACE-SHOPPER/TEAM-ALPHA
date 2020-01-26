import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderSummary from './OrderSummary';
import { Button, TextField, Grid, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { modifyUser } from '../redux/activeUser';

class GuestAddressForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      shippingAddress1: '',
      shippingAddress2: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: ''
    };
  }

  // handleChange = ({ target: { value, name } }) => {
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  // NOTE: I think we need to use a thunk here to POST the information input in the form for guests / new users. Pre-existing users should have the fields pre-populated with values stored in database. Let me know your thoughts.

  // onSubmit = ev => {
  //   ev.preventDefault();
  //   const {
  //     firstName,
  //     lastName,
  //     shippingAddress1,
  //     shippingAddress2,
  //     shippingCity,
  //     shippingState,
  //     shippingZip
  //   } = this.state
  // };

  render() {
    const { activeUser } = this.props;

    return (
      <Fragment>
        {/* <CssBaseline /> */}
        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        > */}
        <Grid container>
          <Grid container item xs={8}>
            <Grid container item>
              <h2>Customer Shipping Information</h2>
              <div>
                <Link to="/login">Already a user?</Link>
              </div>
            </Grid>
            <Grid container item>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  // value={} to be filled
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid container item>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First name"
                    // value={} to be filled
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    // value={} to be filled
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container item>
              <Grid item xs={9}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="shippingAddress1"
                  name="shippingAddress1"
                  label="Address"
                  // value={} to be filled
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="shippingAddress1"
                  name="shippingAddress2"
                  label="Apt. (optional)"
                  // value={} to be filled
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>

            <Grid container item>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="shippingCity"
                  name="shippingCity"
                  label="City"
                  // value={} to be filled
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="shippingState"
                  name="shippingState"
                  label="State"
                  // value={} to be filled
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="shippingZip"
                  name="shippingZip"
                  label="Zip Code"
                  // value={} to be filled
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>

            <Grid container item>
              <Grid container justify="space-between">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Link to="/cart">
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row'
                      }}
                    >
                      <ArrowBackIcon /> <Typography>Return to Cart</Typography>
                    </div>
                  </Link>
                </div>
                <Link to="/checkout2">
                  <Button color="primary">Next</Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid container item alignItems="center" xs={4}>
            <OrderSummary />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ activeUser, cart }) => ({ activeUser, cart });

const mapDispatchToProps = dispatch => {
  return {
    editUser: edits => dispatch(modifyUser(edits))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestAddressForm);
