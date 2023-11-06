//to use the dotenv lib to use the contents of the .env file
require('dotenv').config(); 


const mongoose = require('mongoose');

function connectDB(){
  //database connection 
  //the url is provided by mongo db and others are default configuration variables, 
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser: true,  useUnifiedTopology: true});

  //stored the connection in the variable we want to call some methods on the conneciton 
  const connection = mongoose.connection;


  //works like a event listener when once the connection opens it call the callback func

  //catch is also a method on the variable connection which catches the error response 
  connection.once('open', () => {
    console.log("Database connected.");
  }).on('err', (err)=>  {
     console.log('connection failed');
  })
}

//this part suggests node as to which part of the file other files are allowed to import
module.exports = connectDB;