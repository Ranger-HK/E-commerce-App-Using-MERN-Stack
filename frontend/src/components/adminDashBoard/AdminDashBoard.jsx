import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './adminDashBoard.css'
import { useState } from 'react';
import { Link} from 'react-router-dom';
import { useEffect } from 'react';


export default function AdminDashBoard() {

  const [itemCode, setItemCode] = useState()
  const [itemName, setItemName] = useState()
  const [itemPrice, setItemPrice] = useState()
  const [qtyOnHand, setQtyOnHand] = useState()


  const [items, setItems] = useState([])

  useEffect(() => {
    fetchDataFromServer();
  }, [])

  const fetchDataFromServer = () => {
    // Your code to fetch data from the server goes here
    axios.get('http://localhost:3500/api/v1/getItem')
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3500/api/v1/item", { itemCode, itemName, itemPrice, qtyOnHand })
      .then(res => {
        setItems([...items, res.data]);
        console.log(items)
        fetchDataFromServer();
        alert("Saved");

      })
      .catch(err => {
        console.log(err)
        alert("Failed");
      })
  }

  const handleDeleteItem = (id) => {
    axios.delete('http://localhost:3500/api/v1/deleteItem/'+id)
    .then(res => {console.log(res)
      window.location.reload()
    })
    .catch(err => console.log(err))
  }



  return (
    <>

      <Typography variant="h4" gutterBottom sx={{marginTop:5}}>
        ADMIN PANEL
      </Typography>

      <Box
        component="form" onSubmit={handleItemSubmit}
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="itemCode" label="ItemCode" variant="outlined" onChange={(e) => setItemCode(e.target.value)}
        />
        <TextField
          name="itemName" label="ItemName" variant="outlined" onChange={(e) => setItemName(e.target.value)}
        />
        <TextField
          name="itemPrice" label="ItemPrice" variant="outlined" onChange={(e) => setItemPrice(e.target.value)}
        />
        <TextField
          name="qtyOnHand" label="QTYOnHand" variant="outlined" onChange={(e) => setQtyOnHand(e.target.value)}
        />
        
          <Button type="submit" variant="contained" color="success">
            SAVE ITEM
          </Button>
          


      </Box>


      <TableContainer component={Paper} className='item-table'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='item-tableH'>ItemCode</TableCell>
              <TableCell className='item-tableH' align="right">ItemName</TableCell>
              <TableCell className='item-tableH' align="right">ItemPrice</TableCell>
              <TableCell className='item-tableH' align="right">QTYOnHand</TableCell>
              <TableCell className='item-tableH' align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='item-body'>
            {items.map((item) => {
              return <TableRow
                key={item}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.itemCode}
                </TableCell>
                <TableCell align="right">{item.itemName}</TableCell>
                <TableCell align="right">{item.itemPrice}</TableCell>
                <TableCell align="right">{item.qtyOnHand}</TableCell>
                <TableCell align="right">
                  <Link to={`/itemUpdate/${item._id}`}><Button variant="contained" color="success">Update</Button></Link>
                  <Button variant="contained" color="error"
                  onClick={(e) => handleDeleteItem(item._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            })}
          </TableBody>


        </Table>
      </TableContainer>


    </>


  );
}

