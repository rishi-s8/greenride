//importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const route = require('./routes/route');
// const auth = require('./authentication/auth');



const app = express();

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rideList');

//on Connection
mongoose.connection.on('connected', ()=>{
  console.log("Database Connection Established");
});
mongoose.connection.on('err', ()=>{
  if(err){
    console.log("Database Connection Failed");
  }
});



const port = 3000;

app.use(cors());
app.use(bodyparser.json());

//routes
app.use('/api', route);

//template
app.use(express.static(path.join(__dirname, 'templates')));

//testing server
app.get('/', (req,res)=>{
  res.send("You got to the root");
});


app.listen(port, ()=> {
  console.log("Connection established.");
});
