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
      email: '',
      shippingAddress1: '',
      shippingAddress2: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: ''
    };
  }

  componentDidMount() {
    const { activeUser } = this.props;
    if (this.state.firstName !== activeUser.firstName) {
      this.setState({
        firstName: activeUser.firstName,
        lastName: activeUser.lastName,
        email: activeUser.email,
        shippingAddress1: activeUser.shippingAddress1,
        shippingAddress2: activeUser.shippingAddress2,
        shippingCity: activeUser.shippingCity,
        shippingState: activeUser.shippingState,
        shippingZip: activeUser.shippingZip
      });
    }
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  onClick = ev => {
    const {
      firstName,
      lastName,
      shippingAddress1,
      shippingAddress2,
      shippingCity,
      shippingState,
      shippingZip
    } = this.state;
    this.props.editUser(this.state);
  };

  render() {
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
                  value={this.state.email}
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
                    value={this.state.firstName}
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
                    value={this.state.lastName}
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
                  value={this.state.shippingAddress1}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="shippingAddress2"
                  name="shippingAddress2"
                  label="Apt. (optional)"
                  value={this.state.shippingAddress2}
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
                  value={this.state.shippingCity}
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
                  value={this.state.shippingState}
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
                  value={this.state.shippingZip}
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
                <Link to="/checkout2" onClick={this.onClick}>
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
