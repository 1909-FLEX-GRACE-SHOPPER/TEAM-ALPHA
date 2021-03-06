import React from 'react';
import { connect } from 'react-redux';
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

class Success extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { orders, authentication } = this.props;
    const { activeOrder } = orders;
    const orderId = this.props.match.params.id;

    // this is not ideal, but I think it will work
    const totalCost = JSON.parse(localStorage.getItem('ORDER_COST'));
    const costToShow = totalCost;
    // const costToShow = authentication.isLoggedIn
    //   ? activeOrder.totalCost
    //   : totalCost;

    let activeUser = {};
    activeUser = JSON.parse(localStorage.getItem('ACTIVE_USER'));
    setTimeout(() => {
      localStorage.removeItem('ACTIVE_USER');
      localStorage.removeItem('ORDER_COST');
    }, 3000);
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
                      Order total:{'  '} $ {costToShow}
                    </Typography>
                    <Typography gutterBottom variant="h6">
                      Order no#{orderId}
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

export default connect(mapStateToProps)(Success);
