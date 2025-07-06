
const express= require('express')
const route= express.Router()
const {createss, readss,update, deletes}= require('../controller/control')
const auth= require("../middleware/verify")
route.post('/create',auth,createss)
route.get('/read',auth,readss)
route.put('/update/:id',auth,update)
route.delete('/delete/:id',auth,deletes)

module.exports= route;