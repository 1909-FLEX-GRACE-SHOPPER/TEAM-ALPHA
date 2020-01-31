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
import { updateOrder, submitOrder, createOrder } from '../redux/orders';
import { createUser } from '../redux/users';
import { uuidv4 } from '../utils';
import { postItemsToCartForGuestUser } from '../redux/cart';
// user and order will remove later
// const user = {
//   id: '7f48a8c6-37b8-470c-b17a-645544a0af28',
//   firstName: 'elham',
//   lastName: 'amini',
//   email: 'elhamfarvid@gmail.com',
//   shippingAddress: '99 battrey place,apt 8M'
// };

// const order = {
//   id: 777776665555555,
//   totalCost: 50
// };
class Success extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if (this.props.authentication.isLoggedIn === false) {
      console.log('in if in success cdu', this.props);
      const {
        activeUser,
        createOrder,
        createUser,
        orders,
        cart,
        postGuestItems
      } = this.props;
      // post the guest user
      activeUser.userTypes = 'guest';
      const userId = uuidv4();
      activeUser.id = userId;
      createUser(activeUser);
      // Associate the order with the user and post the order
      const { activeOrder } = orders;
      activeOrder.userId = userId;
      createOrder(activeOrder);
      // associate the cart items with the order and post it
      // (recall that order already has its own id)
      const { items } = cart;
      items.forEach(item => {
        item.orderId = activeOrder.id;
        // might have to delete some info (like the product)
      });
      return postGuestItems(items);
    }

    // this.props.getSingelUser(this.props.match.params.id);
    // if (this.props.orders.activeOrder.id !== prevProps.orders.activeOrder.id) {
    // console.log('hello!!!!');
    // console.log('this props', this.props);
    // console.log('prev props', prevProps);
    const { orders, submitOrder } = this.props;
    const { activeOrder } = orders;
    console.log('activeOrder in cdu on success: ', activeOrder);
    submitOrder(activeOrder);
    // }
  }

  render() {
    // const { user } = this.props.user;
    const { orders, activeUser } = this.props;
    const { activeOrder } = orders;
    // console.log('active order on render of success', activeOrder);
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
            A copy of your reciept has been sent to: {activeUser.email}
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
                    {activeUser.firstName} {activeUser.lastName}
                  </Typography>

                  <Divider style={{ marginBottom: '2rem' }} />

                  <Grid item xs>
                    <Typography gutterBottom variant="h6">
                      Address
                    </Typography>
                    <Typography variant="subtitle1">
                      {activeUser.shippingAddress1}{' '}
                      {activeUser.shippingAddress2}
                    </Typography>
                  </Grid>
                  <Divider style={{ marginBottom: '2rem' }} />
                  <Grid item xs>
                    <Typography gutterBottom variant="h6">
                      Order total:{'  '} $ {activeOrder.totalCost}.00
                    </Typography>
                    <Typography gutterBottom variant="h6">
                      Order no#{activeOrder.id}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs style={{ paddingLeft: '9rem' }}>
                <Typography gutterBottom variant="h6">
                  Billing Address
                </Typography>
                <Typography variant="subtitle1">
                  {activeUser.billingAddress1}
                  {activeUser.billingAddress2}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = ({ orders, activeUser, authentication, cart }) => ({
  orders,
  activeUser,
  authentication,
  cart
});

const mapDispatchToProps = dispatch => {
  return {
    submitOrder: order => dispatch(submitOrder(order)),
    createUser: user => createUser(user),
    createOrder: order => createOrder(order),
    postGuestItems: items => postItemsToCartForGuestUser(items)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Success);
// export default Success;
