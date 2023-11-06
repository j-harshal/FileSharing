const mongoose = require('mongoose');

const Schema = mongoose.Schema;



//const fileSchema is an object which is of type Schema present in the mongoose module in which u can set different objects and their fields for the schema to have
const fileSchema = new Schema({
   filename: {type: String, required: true},
   path: {type: String, required : true},
   size: {type: String, required : true},
   uuid: {type: String, required : true},
   sender: {type: String, required : false},
   receiver: {type: String, required : false},

},{ timestamps: true});

//the mongoose.model method is saying which schema is to be imported by the files.js the first arguement sets the name of the model and the second arguement defines the schema of the model

//the name that we specified File is basically the kind of data type that we made here containing these fields it's like defniing a class here and including this class file in some other js file and then using that class type there for example 'node'.
module.exports = mongoose.model('File', fileSchema);
