const express= require('express')
const app =express();
const mongoose= require('mongoose')
const router= require('./router/router') 
const jwtroute= require("./authorization/authorizate")
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/todoapplication').then(()=>{
    console.log("connect to mongo")
}).catch(()=>{
    console.log("cannot connect to mongodb")
})
app.use('/api/task',jwtroute)
app.use('/api/user',router)


app.listen(5000,()=>{
    console.log("connect sucessfully")
})
