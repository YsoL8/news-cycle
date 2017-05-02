var port = 8080;

//core
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//services
var filesService = require('./services/files');

//add dependencies
var dependencies = require('./dependencies');

//routes
var index = require('./routes/index');
var users = require('./routes/users');
var files = require('./routes/files');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var socket = require('socket.io-client')('http://localhost:'+port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/files', files);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


//sockets
io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log('monitoring started');
        client.emit('join','monitoring started'); //client.emit is two arguments not one, which keys the emit to a client handler
    });

    var fs = require('fs');
    var path = require('path');

    fs.watch(path.join(__dirname, 'public/example.txt'), function() {

      client.emit('messages', 'the file changed');
    });

});


server.listen(port, function () { //note to self, sockets isn't part of express
  console.log('Example app listening on port '+port+'!')
});

module.exports = app;
