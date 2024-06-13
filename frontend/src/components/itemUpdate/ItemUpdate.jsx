import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useParams} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './itemUpdate.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function FormPropsTextFields() {

      const {id} = useParams()
      const [itemCode, setItemCode] = useState()
      const [itemName, setItemName] = useState()
      const [itemPrice, setItemPrice] = useState()
      const [qtyOnHand, setQtyOnHand] = useState()
      const navigate = useNavigate();
    
      useEffect(() => {
          axios.get("http://localhost:3500/api/v1/getItem/"+id)
            .then(res => {console.log(res)
                setItemCode(res.data.itemCode)
                setItemName(res.data.itemName)
                setItemPrice(res.data.itemPrice)
                setQtyOnHand(res.data.qtyOnHand)
            })
            .catch(err => console.log(err))
        }, [])


        const Update = (e) => {
            e.preventDefault();
            axios.put("http://localhost:3500/api/v1/updateItem/"+id, { itemCode, itemName, itemPrice, qtyOnHand })
            .then(res => {
              // location.reload()
              alert("Updated");
              navigate('/admindash')
      
            })
            .catch(err => {
              console.log(err)
              alert("Failed");
            })
        }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={Update}
    >
      <div>
        <TextField
          required
          id="outlined-required"
          //label="Item-code"
          placeholder="item code"
          value={itemCode}
          onChange={(e) => setItemCode(e.target.value)}
        />
        <TextField
         required
         id="outlined-required"
         //label="Item-name"
         placeholder="item name"
         value={itemName}
         onChange={(e) => setItemName(e.target.value)}
        />
        <TextField
         required
         id="outlined-required"
         //label="Item-price"
         placeholder="item price"
         value={itemPrice}
         onChange={(e) => setItemPrice(e.target.value)}
        />
        <TextField
         required
         id="outlined-required"
         //label="Qty-on-hand"
         placeholder="qty on hand"
         value={qtyOnHand}
         onChange={(e) => setQtyOnHand(e.target.value)}
        />
      </div>
      
      <Button type="submit" variant="contained">Update</Button>
    </Box>
  );
}