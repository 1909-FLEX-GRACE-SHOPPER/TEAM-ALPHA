import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

class CartTable extends Component {
  render() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                Order Information
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*
            Should we make quanitity field a input or dropdown?
            Ignore for now until I can test if the reducer is working properly.
            {cart.map(cartItem => (
              <TableRow key={cartItem.id}>
                <TableCell>{cartItem.name}</TableCell>
                <TableCell align="right">{cartItem.quantity}</TableCell>
                <TableCell align="right">{cartItem.unitPrice}</TableCell>
                <TableCell align="right">{cartItem.totalPrice}</TableCell>
              </TableRow>
            ))}
            */}
            <TableRow className='TESTING'>
                <TableCell><button>x</button></TableCell>
                <TableCell><img src='test.jpg' /></TableCell>
                <TableCell>DUMMYTEST</TableCell>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">1</TableCell>
              </TableRow>

            <TableRow>
              <TableCell rowSpan={5} />
              <TableCell colSpan={4}>Subtotal</TableCell>
              <TableCell align="right">$0.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default CartTable;
