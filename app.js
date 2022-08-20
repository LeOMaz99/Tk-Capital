var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
const path = require('path');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


var app = express();
app.use(bodyParser.json());

var transporter =
nodemailer.createTransport(smtpTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'fordevelopment2022@gmail.com',
    pass: 'cbiovfjavfuinjdq',
  },
}));

// Enable CORS (More info: http://enable-cors.org/)
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post('/book', function(req, res) {
  var mailOptions = {
    from: 'fordevelopment2022@gmail.com',
    to: 'Tkcapital1@gmail.com',
    subject: 'New booking',
    text: 'New booking from: \n name: ' + req.body.firstName + ' ' + req.body.lastName + '\n mail: ' + req.body.mail + '\n phone: ' + req.body.number + '\n insta: https://www.instagram.com/' + req.body.insta,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).send({ 'error': error });
    } else {
      console.log('Message sent: ' + info.response);
      res.send({ 'message': 'Message sent! ' + info.response });
    }
  });
});

app.use(express.static(path.join(__dirname, "public")));


app.get('*', (req, res) => {
  //send index.html
  res.sendFile(__dirname + '/public/index.html');
})

var server = app.listen(process.env.PORT, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App running at http://%s:%s", host, port);
});
