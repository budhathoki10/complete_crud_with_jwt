const mongoose= require("mongoose")
let jwtschema= mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    }
})
let jwtmodel= mongoose.model("jwtusers",jwtschema)
module.exports=jwtmodel