import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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

export default function Checkout() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const customerEmail = queryParams.get('email');

    const [orders, setOrders] = useState([])

    const getTotalPrice = () => {
      const totalPrice = orders.reduce((sum, order) => sum + order.amount, 0);
      return totalPrice;
    };

    console.log(customerEmail);

    useEffect( () => {
     
     loadAll();
    }, []);


      const loadAll = async () =>{
        console.log(customerEmail)
        let email=customerEmail;

       
        try{

           
         await axios
        .post("http://localhost:3500/api/v1/getSelectOrder",{
            email
            
        })
        .then((res)=>{
          
        console.log(res.data)
        setOrders(res.data);
           
        }).catch(err=>console.log("err"))
    }catch(err){
        alert("Email or password incorrect.!")
    }

      }

    const handleDeleteOrder = (id) => {
        axios.delete('http://localhost:3500/api/v1/deleteOrder/'+id)
        .then(res => {console.log(res)
          window.location.reload()
        })
        .catch(err => console.log(err))
      }


  return (
    <>
    <Typography
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              margingTop:20,
              fontSize:50
            }}
          >
            CHECKOUT
          </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item Code</StyledTableCell>
            <StyledTableCell align="right">Item Name</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order}>
              <StyledTableCell component="th" scope="row">
                {order.itemCode}
              </StyledTableCell>
              <StyledTableCell align="right">{order.itemName}</StyledTableCell>
              <StyledTableCell align="right">{order.qty}</StyledTableCell>
              <StyledTableCell align="right">{order.amount}</StyledTableCell>
              <StyledTableCell align="right">        
                  <Button variant="outlined" color="error" 
                  onClick={(e) => handleDeleteOrder(order._id)}>
                    Delete
                  </Button>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {orders.length > 0 && (
        <div>
          <h2 className='fs-2'>Total Price: {getTotalPrice()}</h2>
        </div>
    )}
    <Link to={"/payments"}>
     <Button  variant="outlined" style={{marginTop:10}}>Payments</Button>
     </Link>
    </>
  );
  
}