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
// import { makeStyles } from '@material-ui/core/styles';

// need thunk to create the user
// might need to make that thunk in such a way as to transition items / cart
// need validations

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
    };
  }

  componentDidMount() {
    const { authentication: { isLoggedIn } } = this.props;
    if (isLoggedIn) this.props.history.push('/');
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSwitchChange = () => {
    const { shippingIsBilling } = this.state;
    const newShippingIsBilling = !shippingIsBilling
    this.setState({
      shippingIsBilling: newShippingIsBilling
    });
  }

  onSubmit = ev => {
    ev.preventDefault();
    const { shippingIsBilling } = this.state;
    if (shippingIsBilling) {
      const {
        shippingAddress1,
        shippingAddress2,
        shippingCity,
        shippingState,
        shippingZip,
      } = this.state;
      if (this.state.billingAddress1 !== this.state.shippingAddress1) {
        this.setState({
          billingAddress1: shippingAddress1,
          billingAddress2: shippingAddress2,
          billingCity: shippingCity,
          billingState: shippingState,
          billingZip: shippingZip,
        })
      }
      // thunk this.state...
    }
    else {
      // thunk this.state!
      return null; // delete when thunks are put in
    }

  }

  billingFields = () => {
    const { shippingIsBilling } = this.state;
    if (shippingIsBilling) {
      return null;
    }
    else {
      return (
        <Grid container spacing={3}>
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
                value={this.state.billingAddress1}
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
                value={this.state.billingAddress2}
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
                value={this.state.billingCity}
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
                value={this.state.billingState}
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
                value={this.state.billingZip}
                onChange={this.handleChange}
                />
            </Grid>
          </Grid>
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
        </Typography>
        <form style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant='h6' color='textPrimary'>
                Shipping Address
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='firstName'
                name='firstName'
                label='First Name'
                value={this.state.firstName}
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
                value={this.state.lastName}
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
                value={this.state.shippingAddress1}
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
                value={this.state.shippingAddress2}
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
                value={this.state.shippingCity}
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
                value={this.state.shippingState}
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
                value={this.state.shippingZip}
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
          </Grid>
          { this.billingFields() }
          <Grid container spacing={3}>
          <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='email'
                name='email'
                label='email'
                type='email'
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='password'
                name='password'
                label='password'
                type='password'
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            variant='contained'
            type='submit'
            color='primary'
            fullWidth
            style={{
              marginTop: '6px'
            }}
            onClick={() => this.onSubmit(event)}
            >
              Register
          </Button>
          <Grid container justify='flex-end' style={{margin: '6px'}}>
            <Grid item>
              <Link to='/login' style={{textDecoration: 'none'}}>
                Do you have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication });

export default connect(mapStateToProps)(Registration);
