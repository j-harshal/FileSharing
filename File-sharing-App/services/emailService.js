const nodemailer = require('nodemailer');

 async function sendMail({from, to, subject, text, html}){
  // we are using smtp host which is most common 
  //the transporter object is basically a mta mail tranport agent which is a software which transfers mail between sender and recipient 
  //the createTransport method does that job 

   let transporter = nodemailer.createTransport({
    //here we put all the values in the .env bcoz we don't to share them with anyone bcoz it is our server specific 
    //host is the email hosting service name
    host:  process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth : {
      // aurthentication at sendin blue mailing service
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
   });

   // this method sends the mail with the details specified
   let info = await transporter.sendMail({
    from: ` inshare <${from}>`,
    to: to,
    subject: subject,
    text: text,
    html: html,
});
}


module.exports = sendMail;