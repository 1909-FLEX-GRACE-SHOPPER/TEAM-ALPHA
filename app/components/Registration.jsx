import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  Container,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { createUser } from '../redux/users';
// import { makeStyles } from '@material-ui/core/styles';

// need thunk to create the user
// might need to make that thunk in such a way as to transition items / cart
// need validations

const Copyright = () => {
  return (
    <Typography variant="h6" color="textSecondary" align="center">
      Copyright ©
      <Link to="/" style={{ textDecoration: 'none' }}>
        Alpha Ski Shop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

// use if we make with hooks
// const useStyles = makeStyles(() => ({
//   page: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
// }));

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '', // seems bad to store this in local state
      shippingAddress1: '',
      shippingAddress2: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: '',
      shippingIsBilling: true,
      billingAddress1: '',
      billingAddress2: '',
      billingCity: '',
      billingState: '',
      billingZip: '',

      //////

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
      zipErr: false,

      //////

      billingAddress1Helper: '',
      billingAddress1Err: false,
      billingCityHelper: '',
      billingCityErr: false,
      billingStateHelper: '',
      billingStateErr: false,
      billingZipHelper: '',
      billingZipErr: false
    };
  }

  componentDidMount() {
    const {
      authentication: { isLoggedIn }
    } = this.props;
    if (isLoggedIn) this.props.history.push('/');
  }

  handleChange = ({ target: { value, name } }) => {
    const {
      shippingAddress1,
      shippingAddress2,
      shippingCity,
      shippingState,
      shippingZip
    } = this.state;

    this.setState({
      [name]: value
    });

    if (this.state.shippingIsBilling) {
      this.setState({
        billingAddress1: shippingAddress1,
        billingAddress2: shippingAddress2,
        billingCity: shippingCity,
        billingState: shippingState,
        billingZip: shippingZip
      });
    }

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
    if (name === 'billingAddress1') {
      if (value.length > 0)
        this.setState({ billingAddress1Helper: '', billingAddress1Err: false });
      else
        this.setState({
          billingAddress1Helper: 'Address cannot be empty',
          billingAddress1Err: true
        });
    }
    if (name === 'billingCity') {
      if (value.length > 0)
        this.setState({ billingCityHelper: '', billingCityErr: false });
      else
        this.setState({
          billingCityHelper: 'City cannot be empty',
          billingCityErr: true
        });
    }
    if (name === 'billingState') {
      if (value.length > 0)
        this.setState({ billingStateHelper: '', billingStateErr: false });
      else
        this.setState({
          billingStateHelper: 'State cannot be empty',
          billingStateErr: true
        });
    }
    if (name === 'billingZip') {
      if (isNaN(Number(this.state.billingZip))) {
        this.setState({
          billingZipHelper: 'Zip code must be numeric',
          billingZipErr: true
        });
      } else if (value.length > 0 && !isNaN(Number(this.state.billingZip)))
        this.setState({ billingZipHelper: '', zipErr: false });
      else
        this.setState({
          billingZipHelper: 'Zip code cannot be empty',
          billingZipErr: true
        });
    }
  };

  handleSwitchChange = () => {
    const { shippingIsBilling } = this.state;
    const newShippingIsBilling = !shippingIsBilling;
    this.setState({
      shippingIsBilling: newShippingIsBilling
    });
  };

  onSubmit = ev => {
    ev.preventDefault();
    return this.props.createUser({
      ...this.state
      // thunk this.state...
      // deal with not passing shippingIsBilling
    });
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
              'billingAddress1Err',
              'billingAddress1Helper'
            )}
          </Grid>
          <Grid item xs={12}>
            {generateTextFields('billingAddress2', 'Address Line 2')}
          </Grid>
          <Grid item xs={12} sm={4}>
            {generateTextFields(
              'billingCity',
              'City',
              'billingCityErr',
              'billingCityHelper'
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            {generateTextFields(
              'billingState',
              'billingState',
              'billingStateErr',
              'billingStateHelper'
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            {generateTextFields(
              'billingZip',
              'billingZip',
              'billingZipErr',
              'billingZipHelper',
              {
                maxLength: 5
              }
            )}
          </Grid>
        </Grid>
      );
    }
  };

  // handle errors

  render() {
    const { shippingIsBilling } = this.state;
    const { generateTextFields } = this;
    return (
      <Container component="div" maxWidth="sm">
        <CssBaseline />
        <Typography variant="h3" color="textSecondary" align="center">
          Register!
        </Typography>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" color="textPrimary">
                Shipping Address
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              {generateTextFields(
                'firstName',
                'First Name',
                'firstNameErr',
                'firstNameHelper'
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {generateTextFields(
                'lastName',
                'Last Name',
                'lastNameErr',
                'lastNameHelper'
              )}
            </Grid>
            <Grid item xs={12}>
              {generateTextFields(
                'shippingAddress1',
                'Shipping Address 1',
                'address1Err',
                'address1Helper'
              )}
            </Grid>
            <Grid item xs={12}>
              {generateTextFields('shippingAddress2', 'Shipping Address 2')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {generateTextFields(
                'shippingCity',
                'City',
                'cityErr',
                'cityHelper'
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              {generateTextFields(
                'shippingState',
                'State',
                'stateErr',
                'stateHelper'
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              {generateTextFields(
                'shippingZip',
                'Zipcode',
                'zipErr',
                'zipHelper',
                {
                  maxLength: 5
                }
              )}
            </Grid>
            <Grid item xs={12}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={shippingIsBilling}
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {generateTextFields('email', 'Email', 'emailErr', 'emailHelper')}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="none"
                required
                fullWidth
                id="password"
                name="password"
                label="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            style={{
              marginTop: '6px'
            }}
            onClick={() => this.onSubmit(event)}
          >
            Register
          </Button>
          <Grid container justify="flex-end" style={{ margin: '6px' }}>
            <Grid item>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Do you have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication });
const mapDispatchToProps = dispatch => {
  return {
    createUser: user => dispatch(createUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
