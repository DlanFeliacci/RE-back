var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

var biensRouter = require('./routes/biens');

var app = express();
dotenv.config();

var dir = path.join(__dirname, 'public');

app.use(express.static(dir));

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/biens', biensRouter);

mongoose.connect(process.env.DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

conn = mongoose.connection;

conn.on('open', () => {
  console.log('Database is Ready.');

  app.listen(5000, () => {
    console.log('Holly Molly, Yes zadooom');
  })
})

module.exports = app;
