const express= require("express")
const jwt= require('jsonwebtoken')
const bcrypt= require("bcryptjs")
const jwtroute= express.Router()
const jwtmodel= require('../schemas/jwtschema')
require("dotenv").config()


jwtroute.post("/register",async(req,res)=>{
    try {
        const {email,password}= req.body
    const checkemail= await jwtmodel.findOne({email})
    if(!email.endsWith("Heraldcollege.edu.np")){
       return  res.status(404).json({message:"please include herald college email"})
    }
    if(checkemail){
         res.status(404).json({message:"this mail is already taken"})
    }
    const bcryptpassword= await bcrypt.hash(password,10)
    const newuser= new jwtmodel({
        email,
        password:bcryptpassword
    })
        await newuser.save()
         res.status(200).json({message:"User registered sucessfully"})
    } catch (error) {
          res.status(404).json({message:"failed to register"})
    }
        
})


jwtroute.post("/login",async(req,res)=>{
    try {
        const {email,password}= req.body
    const checkemail= await jwtmodel.findOne({email})
    if(!checkemail){
        res.status(404).json({message:"email is not found"})
    }
    const encpassword= await bcrypt.compare(password,checkemail.password)
    if(!encpassword){
           res.status(404).json({message:"incorrect password"})
    }
    const token= jwt.sign({id:checkemail._id},process.env.SECERET_KEY,{
        expiresIn:"10h"
    })
         res.status(200).json({message:"User login sucessfully", token:token})
    } catch (error) {
          res.status(404).json({message:"failed to register"})
    }
        
})
module.exports= jwtroute