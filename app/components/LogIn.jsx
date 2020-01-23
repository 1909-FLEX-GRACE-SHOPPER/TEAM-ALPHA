import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// also need all the redux authentication stuff

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

// const useStyles = makeStyles(() => ({
//   page: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   form: {
//     width: '100%',
//     padding: '1rem',
//   },
// }));

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidUpdate() {
    const {
      authentication: { isLoggedIn }
    } = this.props;
    if (isLoggedIn) this.props.history.push('/');
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
    const {
      authentication: { logInError }
    } = this.props;
    // need to change log in error status
    // need a function/thunk to do this as well
  };

  onSubmit = ev => {
    ev.preventDefault();
    const { email, password } = this.state;
    // thunk to sign in
  };

  logInError = () => {
    const {
      authentication: { logInError }
    } = this.props;
    if (logInError) {
      return <h6>Your email or password is incorrect</h6>;
    } else return null;
  };

  render() {
    return (
      <Container component="div" maxWidth="xs">
        <CssBaseline />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <form
            style={{
              width: '100%',
              padding: '1rem'
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              onClick={() => this.onSubmit(event)}
            >
              Log In
            </Button>
          </form>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            Need an account? Register!
          </Link>
          {this.logInError()}
        </div>
        <Box>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication });

// mapDispatchToProps

export default connect(mapStateToProps)(Login);
