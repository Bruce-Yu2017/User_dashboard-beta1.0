var express = require('express');
// var bcrypt=require("bcrypt-as-promised");
var bodyParser = require('body-parser');

//bcrypt here
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
//

var path = require('path')

var app = express();

app.use(express.static(path.join(__dirname,'./client/dist')));

app.use(bodyParser.urlencoded({extends: true}));

app.use(bodyParser.json());

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);



app.listen(8000,function(){
  console.log("App is running on port 8000!");
})
