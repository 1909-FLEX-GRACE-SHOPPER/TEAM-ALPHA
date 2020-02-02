import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderSummary from './OrderSummary';
import { FormHelperText } from '@material-ui/core';
import { Button, TextField, Grid, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { modifyUser } from '../redux/activeUser';
class EditUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      shippingAddress1: '',
      shippingAddress2: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: '',
      billingAddress1: '',
      billingAddress2: '',
      billingCity: '',
      billingState: '',
      billingZip: '',
      password: '',
      error: false,
      errorText: ''
    };
  }

  componentDidMount() {
    const { activeUser } = this.props;
    console.log('activeUser', activeUser);
    this.setState({
      firstName: activeUser.firstName,
      lastName: activeUser.lastName,
      password: activeUser.password,
      email: activeUser.email,
      shippingAddress1: activeUser.shippingAddress1,
      shippingAddress2: activeUser.shippingAddress2,
      shippingCity: activeUser.shippingCity,
      shippingState: activeUser.shippingState,
      shippingZip: activeUser.shippingZip,
      billingAddress1: activeUser.billingAddress1,
      billingAddress2: activeUser.billingAddress2,
      billingCity: activeUser.billingCity,
      billingState: activeUser.billingState,
      billingZip: activeUser.billingZip
    });
  }
  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  onClickHandler = () => {
    this.props.editUser(this.state);
    const {
      firstName,
      lastName,
      email,
      shippingAddress1,
      shippingAddress2,
      shippingCity,
      shippingState,
      shippingZip,
      billingAddress1,
      billingAddress2,
      billingCity,
      billingState,
      billingZip
    } = this.state;
    if (firstName === '') {
      this.state.error = true;
      this.setState({ errorText: 'First Name' });
    }
    if (lastName === '') {
      this.state.error = true;
      this.setState({ errorText: 'Last Name' });
    }
    if (email === '') {
      this.state.error = true;
      this.setState({ errorText: 'Email' });
    }
    if (shippingAddress1 === '') {
      this.state.error = true;
      this.setState({ errorText: 'Shipping address' });
    }
    if (shippingCity === '') {
      this.state.error = true;
      this.setState({ errorText: 'Shipping city' });
    }
    if (shippingState === '') {
      this.state.error = true;
      this.setState({ errorText: 'Shipping state' });
    }
    if (shippingZip === '') {
      this.state.error = true;
      this.setState({ errorText: 'Shipping zip code' });
    }
    if (billingAddress1 === '') {
      this.state.error = true;
      this.setState({ errorText: 'Billing address' });
    }
    if (billingCity === '') {
      this.state.error = true;
      this.setState({ errorText: 'Billing city' });
    }
    if (billingState === '') {
      this.state.error = true;
      this.setState({ errorText: 'Billing state' });
    }
    if (billingZip === '') {
      this.state.error = true;
      this.setState({ errorText: 'Billing zip code' });
    }
    if (password === '') {
      this.state.error = true;
      this.setState({ errorText: 'Password' });
    }

    if (this.state.error === false) {
      this.props.history.push('/myaccount');
    }
  };

  render() {
    return (
      <form
        onSubmit={ev => ev.preventDefault()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '3rem 2rem 3rem 2rem',
          borderBottom: 'solid 2px darkGrey',
          paddingBottom: '2rem'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ marginLeft: '28rem' }}>
            <Typography variant="h5" color="textPrimary">
              Edit your Profile here
            </Typography>
          </Grid>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Grid>
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
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Shipping address
            </Typography>
          </Grid>
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
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Billing address
            </Typography>
          </Grid>
          <Grid item xs={9}>
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
          <Grid item xs={3}>
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

          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: '34rem', size: 'medium' }}
              onClick={this.onClickHandler}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
        {this.state.error ? (
          <FormHelperText
            id="component-error-text"
            style={{
              fontSize: '1.5rem',
              color: 'red',
              marigRight: '5rem'
            }}
          >
            {this.state.errorText} is required!
          </FormHelperText>
        ) : null}
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfile);
