import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  table: {
    width: 300
  },
  tableContainer: {
    width: 300,
    padding: '4rem',
    marginLeft: '26rem'
  }
});
const userOrders = [{ id: 1, date: 4, totalCost: 5 }];
export const OrderHistory = props => {
  //wee need below lines later after we add orders to the reducer and passing the id of the user
  //   const userOrders = this.props.orders.filter(
  //     order => order.id === this.porps.match.params.id
  //   );
  const classes = useStyles();
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="simple table" size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{order.date}</TableCell>
              <TableCell align="right">{order.totalCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = ({ orders }) => ({ orders });

export default connect(mapStateToProps)(OrderHistory);
