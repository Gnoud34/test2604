var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var toyRouter = require('./routes/toy');

var app = express();

var mongoose = require('mongoose');
var uri = "mongodb+srv://nguyenduongblue299:Koi12345678@cluster0.5whqr6w.mongodb.net/ToyStoreATN"
mongoose.connect(uri)
  .then(() => { console.log("Can connect to DB") })
  .catch(() => { console.log(err) });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/toy', toyRouter);

const port = process.env.PORT || 3002
app.listen(port, () => {
  console.log('Run Run Run')
})
module.exports = app;