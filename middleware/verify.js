const express= require('express')
const jwt= require("jsonwebtoken")
require("dotenv").config()
const auth= (req,res,next)=>{
try {
        const head= req.headers.authorization
        if(!head){
            res.status(404).json({message:"cannot get header"})
        }
        const token= head.split(" ")[1]
        const verify= jwt.verify(token, process.env.SECERET_KEY)
        if(!verify){
            res.status(400).json({message:"invalid token"})
        }
        req.user= verify
        next()
} catch (error) {
     res.this.status(404).json({message:"get error in header"})
}
}
module.exports=auth