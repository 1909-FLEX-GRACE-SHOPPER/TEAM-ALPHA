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
      shippingZip: '',

      //validation handling
      firstNameHelper: '',
      firstNameErr: false,
      lastNameHelper: '',
      lastNameErr: false,
      emailHelper: '',
      emailErr: false,
      address1Helper: '',
      address1Err: false,
      // errShippingAddress2: '',
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

  // eslint-disable-next-line complexity
  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });

    if (name === 'email') {
      if (value.length > 0) this.setState({ emailHelper: '', emailErr: false });
      else
        this.setState({
          emailHelper: 'Email cannot be empty',
          emailErr: true
        });
    }
    if (name === 'firstName') {
      if (value.length > 0)
        this.setState({ firstNameHelper: '', firstNameErr: false });
      else
        this.setState({
          firstNameHelper: 'First name cannot be empty',
          firstNameErr: true
        });
    }
    if (name === 'lastName') {
      if (value.length > 0)
        this.setState({ lastNameHelper: '', lastNameErr: false });
      else
        this.setState({
          lastNameHelper: 'Last name cannot be empty',
          lastNameErr: true
        });
    }
    if (name === 'shippingAddress1') {
      if (value.length > 0)
        this.setState({ address1Helper: '', address1Err: false });
      else
        this.setState({
          address1Helper: 'Address cannot be empty',
          address1Err: true
        });
    }
    if (name === 'shippingCity') {
      if (value.length > 0) this.setState({ cityHelper: '', cityErr: false });
      else
        this.setState({
          cityHelper: 'City cannot be empty',
          cityErr: true
        });
    }
    if (name === 'shippingState') {
      if (value.length > 0) this.setState({ stateHelper: '', stateErr: false });
      else
        this.setState({
          stateHelper: 'State cannot be empty',
          stateErr: true
        });
    }
    if (name === 'shippingZip') {
      if (isNaN(Number(this.state.shippingZip))) {
        this.setState({ zipHelper: 'Zip code must be numeric', zipErr: true });
      } else if (value.length > 0 && !isNaN(Number(this.state.shippingZip)))
        this.setState({ zipHelper: '', zipErr: false });
      else
        this.setState({
          zipHelper: 'Zip code cannot be empty',
          zipErr: true
        });
    }
  };

  generateTextFields = (id, label, err, helper, inputProps) => {
    return (
      <TextField
        inputProps={inputProps || ''}
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

  toCheckout2() {
    this.props.history.push('/checkout2');
  }

  // onClick = ev => {
  //   const {
  //     firstName,
  //     lastName,
  //     shippingAddress1,
  //     shippingAddress2,
  //     shippingCity,
  //     shippingState,
  //     shippingZip
  //   } = this.state;
  //   this.props.editUser(this.state);
  // };

  // eslint-disable-next-line complexity
  render() {
    const {
      firstName,
      lastName,
      email,
      shippingAddress1,
      shippingAddress2,
      shippingCity,
      shippingState,
      shippingZip
    } = this.state;
    const { generateTextFields } = this;
    // console.log('updated');

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
                {this.props.authentication.isLoggedIn ? null : (
                  <Link to="/login">Already a user?</Link>
                )}
              </div>
            </Grid>
            <Grid container item>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  error={this.state.emailErr}
                  helperText={this.state.emailHelper}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid container item>
                <Grid item xs={6}>
                  {generateTextFields(
                    'firstName',
                    'First Name',
                    'firstNameErr',
                    'firstNameHelper'
                  )}
                </Grid>
                <Grid item xs={6}>
                  {generateTextFields(
                    'lastName',
                    'Last Name',
                    'lastNameErr',
                    'lastNameHelper'
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid container item>
              <Grid item xs={9}>
                {generateTextFields(
                  'shippingAddress1',
                  'Address',
                  'address1Err',
                  'address1Helper'
                )}
              </Grid>
              <Grid item xs={3}>
                {generateTextFields('shippingAddress2', 'Apt. (optional)')}
              </Grid>
            </Grid>

            <Grid container item>
              <Grid item xs={4}>
                {generateTextFields(
                  'shippingCity',
                  'City',
                  'cityErr',
                  'cityHelper'
                )}
              </Grid>
              <Grid item xs={4}>
                {generateTextFields(
                  'shippingState',
                  'State',
                  'stateErr',
                  'stateHelper'
                )}
              </Grid>
              <Grid item xs={4}>
                {generateTextFields(
                  'shippingZip',
                  'Zip Code',
                  'zipErr',
                  'zipHelper',
                  { maxLength: 5 }
                )}
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
                {!firstName ||
                !lastName ||
                !email ||
                !shippingAddress1 ||
                !shippingCity ||
                !shippingState ||
                !shippingZip ? (
                  <Button disabled color="primary">
                    Next
                  </Button>
                ) : (
                  <Button color="primary" onClick={() => this.toCheckout2()}>
                    Next
                  </Button>
                )}
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

const mapStateToProps = ({ activeUser, cart, authentication }) => ({
  activeUser,
  cart,
  authentication
});

const mapDispatchToProps = dispatch => {
  return {
    editUser: edits => dispatch(modifyUser(edits))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestAddressForm);
