const router = require('express').Router();

const multer = require('multer');
 
const path = require('path');

//these consts that we require in the be  ginning of a file basicaly help store the imported files
const File = require('../models/file');

const {v4: uuid4} = require('uuid');


let storage = multer.diskStorage({

  //the different field names in the multer  diskstorage basically are objects specified in the multer module which definde how the uploaded files would be stored in our local system 
  destination: (req, file, cb) => cb(null,'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + ' - ' + Math.round(Math.random()* 1E9) + ' ' + path.extname(file.originalname) ;
    cb(null, uniqueName);

    // 
  }

})


//
let upload = multer({
  storage,
  limit: {fileSize: 1000000 * 100},
}).single('myfile');

router.post('/', (req, res) => {

    //store file
    
    upload(req, res, async (err) => {

      //validate request
      if(!req.file){
        return res.json({ error : 'All fields are required.'});
    }
      if(err){
        return res.status(500).send({error: err.message})
      }

      //upload to data base 
      const file = new File({
        filename: req.file.filename,
        uuid: uuid4(),
        //the multer uses the filename and the destination objects to calcuate the path for us similarly the size
        path: req.file.path,
        size: req.file.size
      });

      const response = await file.save();
      return res.json({file: process.env.APP_BASE_URL + '/files/' + response.uuid});
  
      //http://localhost:3000/files/askdba1asdjh-asjhdga331

    })

      



    //response -> link 
});

router.post('/send', async (req, res) => {
  //this is called object destructuring 
  const {uuid, emailTo, emailFrom} = req.body;


    //validate req
    if(!uuid || !emailTo || !emailFrom){
      return res.status(422).send({ error: "all fields are required"});
    }

    //get data from the database

    const file = await File.findOne({uuid: uuid});
    if(file.sender){
      return res.status(422).send({ error: "email already sent"});
    }

    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();

    //send email
    const sendMail = require('../services/emailService');
    sendMail({
      from: emailFrom,
      to: emailTo,
      subject: 'inshare file sharing',
      text: `${emailFrom} shared a file with you.`,
      html: require('../services/emailTemplate')({
        emailFrom: emailFrom, 
        downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
        size: parseInt(file.size/1000) + 'KB',
        expires: '24 hours'
      })
    });

    return res.send({success: true});



});


module.exports = router;