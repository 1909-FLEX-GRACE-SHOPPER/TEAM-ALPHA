import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { fetchActiveOrder, removeItem } from '../redux/cart';
import { Link } from 'react-router-dom';

class CartTable extends Component {
  sumOrderTotal() {
    let orderTotal = 0;
    this.props.cart.items.map(item => (orderTotal += parseInt(item.unitPrice)));
    return orderTotal;
  }

  //works but page breaks b/c in nav bar check for cart.items.length
  onClickDelete(itemId) {
    this.props.deleteItem(itemId);
  }

  render() {
    console.log('props on cart page', this.props);
    return (
      <React.Fragment>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  Order Information
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell alight="left">Image</TableCell>
                <TableCell alight="left">Description</TableCell>
                <TableCell alight="right">Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Unit Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.cart.items.map(cartItem => (
                <TableRow key={cartItem.id}>
                  <TableCell>
                    <button
                      type="button"
                      id={cartItem.id}
                      onClick={() => this.onClickDelete(cartItem)}
                    >
                      X
                    </button>
                  </TableCell>
                  <TableCell>
                    <img src={cartItem.product.productListing.imageUrl} />
                  </TableCell>
                  <TableCell>
                    {cartItem.product.productListing.description}
                  </TableCell>
                  <TableCell>{cartItem.product.productListing.name}</TableCell>
                  <TableCell align="right">1</TableCell>
                  <TableCell align="right">{cartItem.unitPrice}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={5} />
                <TableCell colSpan={4}>Subtotal</TableCell>
                <TableCell align="right">${this.sumOrderTotal()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {this.props.cart.items.length !== 0 ? (
          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={() => this.handleClick()}
          >
            <Link to="/checkout">Proceed To Checkout</Link>
          </Button>
        ) : (
          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={() => this.handleClick()}
            disabled
          >
            Checkout
          </Button>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ orders, cart }) => ({ orders, cart });
const mapDispatchToProps = dispatch => ({
  fetchUpdatedOrder: activeOrderId => dispatch(fetchActiveOrder(activeOrderId)),
  deleteItem: itemObj => dispatch(removeItem(itemObj))
});
export default connect(mapStateToProps, mapDispatchToProps)(CartTable);
