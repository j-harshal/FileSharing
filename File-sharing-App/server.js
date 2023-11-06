const express = require('express');

const app = express();

//the inbuilt node module which helps with working with directories and file paths using it's methods like path.join
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
//.json method is a middleware of express which helps our server parse the json data
app.use(express.json());

const connectDB = require('./config/db');

connectDB();

//TEMPLATE ENGINE 

//the views folder contains all the html files or the visual files so
//the app.set method sets all the views from the url of the path joined by the dir name of our root folder followed by the /views folder.
app.set('views', path.join(__dirname, '/views'));

app.set('view engine', 'ejs');



//routes

//tells our app object to use the route in the first parameter from the routes folder
//we are creating the routes here for our server to use... 
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


app.listen(PORT, () => {
  console.log("listening on " + PORT);
})