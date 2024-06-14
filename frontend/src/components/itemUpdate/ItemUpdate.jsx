import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import './itemUpdate.css'
import Button from '@mui/material/Button';

export default function FormPropsTextFields() {

    const {id} = useParams()
    const [itemCode, setItemCode] = useState()
    const [itemName, setItemName] = useState()
    const [itemPrice, setItemPrice] = useState()
    const [qtyOnHand, setQtyOnHand] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3500/api/v1/getItem/" + id)
            .then(res => {
                console.log(res)
                setItemCode(res.data.itemCode)
                setItemName(res.data.itemName)
                setItemPrice(res.data.itemPrice)
                setQtyOnHand(res.data.qtyOnHand)
            })
            .catch(err => console.log(err))
    }, [])


    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3500/api/v1/updateItem/" + id, {itemCode, itemName, itemPrice, qtyOnHand})
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
                '& .MuiTextField-root': {m: 10, width: '20ch'},
            }}
            noValidate
            autoComplete="off"
            onSubmit={Update}
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Item Code"
                    defaultValue="Hello World"
                    value={itemCode}
                    onChange={(e) => setItemCode(e.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Item Name"
                    defaultValue="Hello World"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Item Price"
                    defaultValue="Hello World"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="QTY On Hand"
                    defaultValue="Hello World"
                    value={qtyOnHand}
                    onChange={(e) => setQtyOnHand(e.target.value)}
                />
            </div>

            <Button type="submit" color="success" variant="contained">Update</Button>
        </Box>
    );
}