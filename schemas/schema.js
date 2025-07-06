const mongoose= require('mongoose')
const userschema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true
    },
    status:{
        type:String,
         required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const models= mongoose.model('applications',userschema)
module.exports= models