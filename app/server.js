var express = require('express');
var app = express(),
    path = require('path');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index', {title:'Explicando código - CodeCafe.tv'});
});

app.get('/video', function(req, res){
  res.render('video', {title:'Explicando código - CodeCafe.tv'});
});

app.get('/sugerir', function(req, res){
  res.render('suggest', {title:'Explicando código - CodeCafe.tv'});
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port %s', process.env.PORT || 3000);