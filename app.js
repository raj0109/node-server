const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');


// create directory if does not exist
const dir = './logs';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

fs.appendFileSync('./logs/1.txt', "")

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/workItemGenerated', function(req, res) {
  let data = req.body;
  console.log(req.body);
  if (data instanceof Object && data.Number) {
    const data =  JSON.stringify(req.body);
    fs.appendFileSync('./logs/1.txt', data + ',')
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
