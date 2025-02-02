const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/mongodb');

dotenv.config();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.send("Server is up")
})

app.get("/test",(req,res)=>{
    res.send("Server is up")
})




const student = require('./routes/studentRoutes')

app.use('/api/student',student);


app.listen(PORT,()=>{
    console.log(`Server is up at http://localhost:${PORT}`)
})