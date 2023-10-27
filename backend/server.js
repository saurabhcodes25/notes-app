require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const nodeRouter = require('./routes/nodeRouter')
const path = require('path')


const app = express();

app.use(express.json())
app.use(cors())

//Routes
app.use('/user',userRouter)
app.use('/api/notes',nodeRouter)


//connection
const URI = process.env.DATABASE
mongoose.connect(URI,err=>{
    if(err) throw err;
    console.log('connected to mongodb')

})


//listen server
const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`server is listening on port ${PORT}` ))


