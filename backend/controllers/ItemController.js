const Item = require('../model/Item')
const { response } = require('express')
const req = require('express/lib/request');
const res = require('express/lib/response');

const saveItem = (req,res) => {

    const itemObj = new Item({
        itemCode:req.body.itemCode,
        itemName:req.body.itemName,
        itemPrice: req.body.itemPrice,
        qtyOnHand: req.body.qtyOnHand,
    })

    // console.log(itemObj);

    Item.findOne({itemCode: req.body.itemCode})
        .then(response =>{
            if(response === null){
                //no exist item
                itemObj.save().then(()=>{
                    res.status(201).json({message:"Saved"})
                }).catch((err)=>{
                    res.status(500).json({message:"Saved Failed"})
                })
            }else{
                res.status(409).json({message:"Item already entered"})
            }
        
        }).catch((err)=>{
            res.status(500).json({message:"Internal server error"})
        })
}

const getItem = (req, res) => {
   Item.find({})
   .then(items => res.json(items))
   .catch(err => res.json(err))
}

const getSelectItem = (req,res) =>{
    const id = req.params.id;
    Item.findById({_id:id})
    .then(items => res.json(items))
    .catch(err => res.json(err))
}

const updateItem = (req,res) =>{
    const id = req.params.id;
    Item.findByIdAndUpdate({_id: id}, {
    itemCode:req.body.itemCode, 
    itemName:req.body.itemName, 
    itemPrice:req.body.itemPrice, 
    qtyOnHand:req.body.qtyOnHand})

    .then(items => res.json(items))
    .catch(err => res.json(err))
}


const deleteItem = (req,res) => { 
    const id = req.params.id;
    Item.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
}


module.exports = {saveItem,getItem,getSelectItem,updateItem,deleteItem}