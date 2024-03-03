const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
        userid:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:[true,'amount is required']
        },
        type:{
            type:String,
            required:[true,'type is require']
        },
        category:{
            type:String,
            required:[true,'category is require']
        },
        reference:{
            type:String
        },
        description:{
            type:String,
            required:[true,'desc is require']
        },
        date:{
            type:Date,
            required:[true,"date is require"]
        }
},{timestamps:true})

const transactionModel = mongoose.model('transactions',transactionSchema)
module.exports =transactionModel