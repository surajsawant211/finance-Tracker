const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./Config/connectDb');


// config dotenv file

dotenv.config()

//databse config

connectDb()

// rest object

const app = express()

//middlewares

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes

// app.get('/',(req,res)=>{
//     res.send('<h1>hello from server</h1>')
// })

//user Routes
app.use("/api/v1/users", require("./Routes/userRoutes"));

//transaction routes

app.use("/api/v1/transactions",require('./Routes/transactionRoutes'))

//port
const PORT = 8080 || process.env.PORT

//listen server

app.listen(PORT,()=>{
    console.log(`server listening the port ${PORT}`)
})