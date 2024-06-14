import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Payments() {
  const getTotalPrice = () => {
    const totalPrice = orders.reduce((sum, order) => sum + order.amount, 0);
    return totalPrice;
  };

  
  const [orders, setOrders] = useState([])
 

    useEffect(() => {
        fetchOrderDataFromServer();
      }, [])
    
      const fetchOrderDataFromServer = () => {
        
        axios.get('http://localhost:3500/api/v1/getOrder')
          .then((res) => {
            setOrders(res.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

  return (
    <>
    <Typography
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              margingTop:15,
              fontSize:50
            }}
          >
            PAYMENTS
          </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{bgcolor:'gray'}}>
          <TableRow>
            <StyledTableCell>User Email</StyledTableCell>
            <StyledTableCell align="right">Item Code</StyledTableCell>
            <StyledTableCell align="right">Item Name</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order}>
              <StyledTableCell component="th" scope="row">
                {order.userEmail}
              </StyledTableCell>
              <StyledTableCell align="right">{order.itemCode}</StyledTableCell>
              <StyledTableCell align="right">{order.itemName}</StyledTableCell>
              <StyledTableCell align="right">{order.qty}</StyledTableCell>
              <StyledTableCell align="right">{order.amount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {orders.length > 0 && (
        <div style={{display:'flex' , justifyContent:'center'}}>
          <h2 className='fs-2'>Total Price : </h2> <h2 style={{color:"crimson"}}>{getTotalPrice()}/=</h2>
        </div>
    )}
    </>
  );
}