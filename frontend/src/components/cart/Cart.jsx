import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './cart.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export default function Cart() {

    const [items, setItems] = useState([]);
    const [qty, setQty] = useState(1)

    const [itemCode, setItemCode] = useState()
    const [itemName, setItemName] = useState()
    const [itemPrice, setItemPrice] = useState()
    const [qtyOnHand, setQtyOnHand] = useState()
    
    
    const handleQty = (e) => {
      setQty(e.target.value);
    }

    const handleAddToCart = (itemCode,itemName,itemPrice,qtyOnHand) => {
      var array = new Array();
      // localStorage.clear();
      array.push({
          itemCode,
          itemName,
          qty,
          amount:qty*itemPrice
      });
      alert("Add to cart success");

      localStorage.setItem("myValue", JSON.stringify(array));
    }

      useEffect(() => {
        // Fetch data from the backend API
        axios.get('http://localhost:3500/api/v1/getItem')
          .then(response => {
            setItems(response.data);
           
            // window.location.reload()
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

  return (
    <>
    <Link to={"/order"}>
     <Button  variant="outlined" color="secondary" style={{marginTop:10}}>My-Orders</Button>
     </Link>

    <Card sx={{display:'flex', flexDirection:'row', gap:5, padding:8}}>
        {items.map(item => (
      <CardActionArea key={item._id}>
        <CardMedia
          component="img"
          height="140"
          image="https://cdn.xxl.thumbs.canstockphoto.com/composition-with-grocery-products-in-shopping-basket-stock-photo_csp11922927.jpg"
          alt="products"
        />
        <CardContent style={{ border:1}}>
          <Typography gutterBottom variant="h5" component="div" value={itemCode}
          onChange={(e) => setItemCode(e.target.value)}>
          {item.itemCode}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" value={itemName}
          onChange={(e) => setItemName(e.target.value)}>
          {item.itemName}
          </Typography>
          <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onChange={handleQty}>
            
              {Array.from(Array(item.qtyOnHand), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
          
          <Typography gutterBottom variant="h5" component="div" value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}>
          Price: {item.itemPrice}/-
          </Typography>
          <Typography gutterBottom variant="h5" component="div" value={qtyOnHand}
          onChange={(e) => setQtyOnHand(e.target.value)}>
          Quantity: {item.qtyOnHand}
          </Typography>
          <hr></hr>
          
          <Button type="submit" variant="contained" onClick={()=>{
            let itemCode=item.itemCode;
            let itemName=item.itemName;
            let itemPrice=item.itemPrice;
            let qtyOnHand=item.qtyOnHand;
            // let qty=qty;
            setItemCode(itemCode);
            setItemName(itemName);
            setItemPrice(itemPrice);
            setQtyOnHand(qtyOnHand);
            
            handleAddToCart(itemCode,itemName,itemPrice,qtyOnHand)
          }}> Add to cart </Button>
     
        </CardContent>
      </CardActionArea>
      ))}
    </Card>
    </>
  );
};