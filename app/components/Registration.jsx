import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button,
  CssBaseline,
  TextField,
  Container,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// change to .jsx
// need thunk to create the user
// might need to make that thunk in such a way as to transition items / cart

const Copyright = () => {
  return (
    <Typography variant='h6' color='textSecondary' align='center'>
      Copyright ©
      <Link to='/' style={{textDecoration: 'none'}}>
        Alpha Ski Shop
      </Link>
      { ' ' }
      { new Date().getFullYear() }
      { '.' }
    </Typography>
  )
};

// use if we make with hooks
const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

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
    };
  }

  componentDidMount() {
    const { authentication: { isLoggedIn } } = this.props;
    if (isLoggedIn) this.props.history.push('/');
  }

  handleChange = ({ target: { value, name } }) => {
    // console.log('value is: ', value);
    // console.log('name is: ', name);
    console.log(this.state);
    this.setState({
      [name]: value,
    });
  }

  handleSwitchChange = () => {
    const { shippingIsBilling } = this.state;
    const newShippingIsBilling = !shippingIsBilling
    console.log(newShippingIsBilling);
    this.setState({
      shippingIsBilling: newShippingIsBilling
    });
  }

  onSubmit = ev => {
    ev.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      shippingAddress1,
      shippingAddress2,
      shippingCity,
      shippingState,
      shippingZip,
      billingAddress1,
      billingAddress2,
      billingCity,
      billingState,
      billingZip,
    } = this.state;
    // thunk them!
  }

  billingFields = () => {
    const { shippingIsBilling } = this.state;
    if (shippingIsBilling) {
      const {
        shippingAddress1,
        shippingAddress2,
        shippingCity,
        shippingState,
        shippingZip,
      } = this.state;
      this.setState = {
        billingAddress1: shippingAddress1,
        billingAddress2: shippingAddress2,
        billingCity: shippingCity,
        billingState: shippingState,
        billingZip: shippingZip,
      }
    }
    else {
      return (
        <div>
          <Grid item xs={12}>
            <Typography variant='h6' color='textPrimary'>
              Billing Address
            </Typography>
          </Grid>
          <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='billingAddress1'
                name='billingAddress1'
                label='Address Line 1'
                onChange={this.handleChange}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='billingAddress2'
                name='billingAddress2'
                label='Address Line 2'
                onChange={this.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='billingCity'
                name='billingCity'
                label='City'
                onChange={this.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='billingState'
                name='billingState'
                label='State'
                onChange={this.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='billingZip'
                name='billingZip'
                label='Zip'
                onChange={this.handleChange}
                />
            </Grid>
          </div>
      )
    }
  }

  // handle errors

  render() {
    const { shippingIsBilling } = this.state;
    return (
      <Container component='div' maxWidth = 'sm'>
        <CssBaseline />
        <Typography variant='h3' color='textSecondary' align='center'>
          Register!
          {/* (might put this inside the flexbox) */}
        </Typography>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='firstName'
                name='firstName'
                label='First Name'
                onChange={this.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='lastName'
                name='lastName'
                label='Last Name'
                onChange={this.handleChange}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='shippingAddress1'
                name='shippingAddress1'
                label='Address Line 1'
                onChange={this.handleChange}
                />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='shippingAddress2'
                name='shippingAddress2'
                label='Address Line 2'
                onChange={this.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='shippingCity'
                name='shippingCity'
                label='City'
                onChange={this.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='shippingState'
                name='shippingState'
                label='State'
                onChange={this.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='shippingZip'
                name='shippingZip'
                label='Zip'
                onChange={this.handleChange}
                />
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
                  label='Billing Address is Same as Shipping'
                />
              </FormGroup>
            </Grid>
            { this.billingFields() }
          </Grid>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication });

export default connect(mapStateToProps)(Registration);
