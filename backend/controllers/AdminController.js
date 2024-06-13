const Admin = require('../model/Admin')
const { response } = require('express')
const req = require('express/lib/request');
const res = require('express/lib/response');

const getAdmin = (req, res) => {
    const email = req.body.signinEmail;
    const password = req.body.signinPassword;

    Admin.findOne({adminEmail:email,adminPassword:password})
        .then((response)=>{
            console.log("response: "+response);

            if(response == null){
                res.status(409).json({message:"admin name or password incorrect.!"})
            }else{
                res.status(201).json({message:"Logged", data:response})
            }
        })
        .catch((err)=>{
            res.status(500).json({message:"Internal Server Error..!"})
        })
}


module.exports = {getAdmin}
