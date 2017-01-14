var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);


var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

var auth = require('./sessionAuth')
app.use(auth);

var  dishRouter = require('./dishRouter');
app.use('/dishes',dishRouter);

var  leaderRouter = require('./leaderRouter');
app.use('/leadership',leaderRouter);

var  promoRouter = require('./promoRouter');
app.use('/promotions',promoRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
