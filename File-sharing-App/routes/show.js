//this file deals with the display and output of the uploaded file basically providing with the link of the file or error message if it showsup



const router = require('express').Router();


//requiring the file type from file model
const File = require('../models/file');


//we want to get data from the server basically the download link etc hence a get request 
//the first parameter having colon means jo bhi :var ki value hogi that would be the route url

//the async keyword makes a function return a promise which is basically an action 
router.get('/:uuid', async (req, res) => {
  //the try block tries the block of code if it runs then cool if not then catch block handles the error generated in the try block.
  try {
      //the findone method is a mongoose method which finds the collections satisfying the condition inside the parenthesis which for us is 'uuid:' in the file model should be the request url parameter which is named uuid

      //the await key word can only be used inside an async function, the async function definitely returns a promise..the await function returns the promise..inside the async function....


      const file = await File.findOne({ uuid: req.params.uuid });

      //if findone function doesn't return a file with given uuid then render the download page with th var 'error' that equals the given string.
      if (!file) {
        return res.render('download', { error: 'link has been expired.' });
      }

      return res.render('download',{
        //the first arguement of the redner function specifies which doc to provide with the data in form of strings that we specify in the object in the second arguement
        uuid: file.uuid,
        fileName: file.filename,
        fileSize: file.filesize,
        downloadLink: process.env.APP_BASE_URL + '/files/download/' + file.uuid
        //prototype link
        //http://localhost:3000/files/download/ajshdawkjuiasdj-akjsdakjda
      } )

  } catch(err){
    return res.render('download', {error: 'something went wrong'});
  }



})


module.exports = router;