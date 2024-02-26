const mongoose = require('mongoose')

//schema design 

const userSchema = new mongoose.Schema({
        name :{
            type:String,
            required:[true,'name is require']
        },
        email:{
            type:Text,
            required:[true,'emailis require and should be unique'],
            unique:true
        },
        password :{
            type:String,
            required:[true,'password is require']
        },

}, {timestamps:true} //captures the date of records
)

//export

const userModel = mongoose.model('users',userSchema)

module.exports = userModel