const express=require('express')
const userRoutes=require('./routes/userRoutes')
const cors = require('cors');
require("dotenv").config()
const db=require('./config/database')
PORT=process.env.PORT || 6000
const app=express()
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    next();
  })
  app.use(cors());
app.use(express.json())
db();
app.get("/",(req,res)=>{
    res.status(200).send({
        message:"hello"
    })
})

app.use('/api/v1',userRoutes)
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})