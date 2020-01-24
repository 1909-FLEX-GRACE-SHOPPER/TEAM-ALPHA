import React from 'react';
import { connect } from 'react-redux';
import { fetchSingelUser } from '../redux/singleUser';
import {
  Container,
  Card,
  Typography,
  IconButton,
  CardContent,
  Divider,
  Grid
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// user and order will remove later
const user = {
  id: '7f48a8c6-37b8-470c-b17a-645544a0af28',
  firstName: 'elham',
  lastName: 'amini',
  email: 'elhamfarvid@gmail.com',
  shippingAddress: '99 battrey place,apt 8M'
};

const order = {
  id: 777776665555555,
  totalCost: 50
};
class Success extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.props.getSingelUser(this.props.match.params.id);
  }
  render() {
    // const { user } = this.props.user;
    const { orders } = this.props;
    console.log('orders,', orders);
    // const order = orders
    //   .filter(order => order.userId === this.props.match.params.id)
    //   .filter(order => order.orderDate === Date());
    return (
      <Card
        style={{
          width: '35rem',
          marginLeft: '24rem',
          border: 'solid 2px darkGrey'
        }}
      >
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <CheckCircleOutlineIcon
            fontSize="large"
            style={{ color: green[500] }}
          />
          <Typography variant="h5" style={{ color: green[500] }}>
            We've recieved your order
          </Typography>
          <Typography variant="overline">
            A copy of your reciept has been sent to: {user.email}
          </Typography>

          <h1>...................................</h1>
          <Typography variant="h6">Delivery details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6">
                    Delivery for
                  </Typography>
                  <Typography variant="subtitle1">
                    {user.firstName} {user.lastName}
                  </Typography>

                  <Divider style={{ marginBottom: '2rem' }} />

                  <Grid item xs>
                    <Typography gutterBottom variant="h6">
                      Address
                    </Typography>
                    <Typography variant="subtitle1">
                      {user.shippingAddress}
                    </Typography>
                  </Grid>
                  <Divider style={{ marginBottom: '2rem' }} />
                  <Grid item xs>
                    <Typography gutterBottom variant="h6">
                      Order total:{'  '} $ {order.totalCost}.00
                    </Typography>
                    <Typography gutterBottom variant="h6">
                      Order no#{order.id}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs style={{ paddingLeft: '9rem' }}>
                <Typography gutterBottom variant="h6">
                  Billing Address
                </Typography>
                <Typography variant="subtitle1">
                  {user.shippingAddress}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
//will use below lines after we get user
// const mapStateToProps = ({ orders,user }) => ({ orders,user });
// const mapDispatchToProps = dispatch => {
//   return {
//     getSingelUser: id => dispatch(fetchSingelUser(id))
//   };
// };
// export default connect(mapStateToProps)(Success);
export default Success;
