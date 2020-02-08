import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  CardContent,
  CardActions,
  Card,
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchSingelUser } from '../redux/singleUser';
//we should comment out this part after we are getting singel user id,line below is just for the test

export const setUserAddress = user => {
  return `${user.shippingAddress1} ${user.shippingAddress2} ${user.shippingCity} ${user.shippingState} ${user.shippingZip}`;
};

export const setBillingAddress = user => {
  return `${user.billingAddress1} ${user.billingAddress2} ${user.billingCity} ${user.billingState} ${user.billingZip}`;
};

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activeUser } = this.props;
    console.log(activeUser.orderHistory);

    return (
      <Card
        style={{
          marginLeft: '28rem',
          width: '20rem',
          paddingLeft: '1rem'
        }}
      >
        <CardContent>
          <Typography variant="h6" component="h2">
            {activeUser.firstName} {activeUser.lastName}
          </Typography>
          <Typography variant="h6" component="h4">
            Shipping address:
          </Typography>
          <Typography variant="6" component="h4">
            {setUserAddress(activeUser)}
          </Typography>
          <Typography variant="h6" component="h4">
            Billing address:
          </Typography>
          <Typography variant="6" component="h4">
            {setBillingAddress(activeUser)}
          </Typography>
          <Typography variant="h6" component="h4">
            Email address:
          </Typography>
          <Typography color="textSecondary">{activeUser.email}</Typography>
        </CardContent>
        <CardActions>
          <Link to="/editprofile">
            <Button size="small">Edit</Button>
          </Link>
          {/* <Link to="/api/github/login">
            Login to your github
          </Link> */}
          <a href="/api/github/login">Connect to github</a>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = ({ activeUser }) => ({ activeUser });
export default connect(mapStateToProps)(UserProfile);
// export default UserProfile;
