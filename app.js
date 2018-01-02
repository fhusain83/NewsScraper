var express = require('express');
var path = require('path');

var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var Note = require('./models/Note.js');
var Article = require('./models/Article.js');
var app = express();
var request=require('request');

var cheerio=require("cheerio");
var appRouter=require('./routes/routes.js')(express,Note,Article,request,cheerio);
app.use('/',appRouter);




var hbs=require('express-handlebars');



mongoose.Promise=Promise;
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect("mongodb://localhost/newsscraper")
var db=mongoose.connection;

db.on("error",function(error){
console.log("mongoose error ",error);
});

db.once("open",function(){console.log("Mongoose connection successful");});

app.listen(3000,function(){console.log("App running on port 3000!");});
