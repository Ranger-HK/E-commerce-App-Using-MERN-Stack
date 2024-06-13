const Order = require('../model/Orders')
const { response } = require('express')
const req = require('express/lib/request');
const res = require('express/lib/response');

const saveOrder = (req,res) => {

    const orderObj = new Order({
        userEmail:req.body.obj.userEmail,
        itemCode:req.body.obj.itemCode,
        itemName: req.body.obj.itemName,
        qty: req.body.obj.qty,
        amount: req.body.obj.amount
    })


    orderObj.save().then(()=>{
        res.status(201).json({message:"Saved"})
        }).catch((err)=>{
        res.status(500).json({message:"Saved Failed"})
    })
}

const getSelectOrder =  (req,res) =>{
    
    Order.find({userEmail:req.body.email})
    .then(orders => res.json(orders))

    .catch(err => res.json(err))

}

const getOrder = (req, res) => {
    Order.find({})
    .then(orders => res.json(orders))
    .catch(err => res.json(err))
 }

 const deleteOrder = (req,res) => { 
    const id = req.params.id;
    Order.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
}




module.exports = {saveOrder,getSelectOrder,getOrder,deleteOrder}