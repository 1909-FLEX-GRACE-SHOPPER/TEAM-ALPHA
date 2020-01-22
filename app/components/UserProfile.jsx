import React from 'react';
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
const user = {
  firstName: 'elham',
  lastName: 'amini',
  email: 'elhamfarvid@gmail.com',
  shippingAddress: '99 battrey place,apt 8M'
};

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  //after getting user.id we should comment them in

  //   componentDidMount() {
  //     this.props.getSingelUser(this.props.match.params.id);
  //   }
  render() {
    //   const {user}=props

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
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="h10" component="h4">
            {user.shippingAddress}
          </Typography>
          <Typography color="textSecondary">{user.email}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    );
  }
}

// const mapStateToProps = ({ user } = { user });
// const mapDispatchToProps = dispatch => {
//   return {
//     getSingelUser: id => dispatch(fetchSingelUser(id))
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
export default UserProfile;
