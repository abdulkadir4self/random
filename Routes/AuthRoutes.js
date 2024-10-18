const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminSchema = require('../Schema/AdminSchema');
const router = express.Router();

const JWT_SECRET_KEY = 'fca19bc66b61d46afa52d0b5b0408352e95aa5ee42e78741c62753730ae700a2' 

router.post('/register' ,async function(req,res){
    try {
        const checkAdmin = await adminSchema.findOne({email: req.body.email})
        if(checkAdmin){
            res.json({
                status:0,
                message:'admin exists',
                data:null
            })
            return
        }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password , salt);
    const admin = await adminSchema.create({
        ...req.body,
        password: hashedPassword
    })
    res.json({
        status:1,
        message:'register successfull',
        data: admin
    })
    } 
    catch (error) {
        res.json({
            status:0,
            message:'register failed',
            data:null
        })
    }
})





router.post('/login' , async (req , res)=>{
    try {
        const {email , password} = req.body;
        const adminDoc = await adminSchema.findOne({email});
        if(adminDoc){
            const hashedPassword= adminDoc.password;
            const passwordStatus = await bcrypt.compare(password , hashedPassword)//

            if(passwordStatus){
                jwt.sign({_e: adminDoc.email} , JWT_SECRET_KEY , function(error , token){
                    if(error)
                    {
                        return res.json({
                            status:0,
                            message: 'failed to login. pls try again'
                        })
                    }
                    else{
                        return res.json({
                            status: 1,
                            message: 'login successful',
                            token
                        })
                    }
                })
            }
            else{
                res.json({
                    status:0,
                    message: 'password incorrect'
                })
            }
        }
        else{
            res.json({
                status:0,
                message:'email incorrect'
            })
        }
    }
    
     catch (error) {
        console.log(error);
    }
 })



module.exports = router;