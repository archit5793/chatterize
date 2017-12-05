var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

mongoose.connect('mongodb://localhost:4500');

app.set('views',__dirname + '/views');
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.use(session({
	secret:'socketer',
	resave: false,
	saveUninitialized: false,
	cookie: {}
}));

app.use(bodyParser.urlencoded({extended:true}));

app.use(require('./routes')(io,express));

server.listen(3000);