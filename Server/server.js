const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT;


app.get('/',(req,res)=>{
    res.send("Server is up")
})

app.get("/test",(req,res)=>{
    res.send("Server is up")
})




const admin = require('./routes/adminRoutes')
const student = require('./routes/studentRoutes')

app.use('/api/admin',admin);
app.use('/api/student',student);


app.listen(PORT,()=>{
    console.log(`Server is up at http://localhost:${PORT}`)
})