var express = require('express');
var app = express(),
    path = require('path'),
    models = require('./models.js'),
    slug = require('slug');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

app.get('/', function(req, res){
  models.VideoModel.find().sort({date: -1})
  .exec(function(err, videos){
    res.render('index', {
      title: 'Explicando código - CodeCafe.tv',
      first: videos.shift(),
      videos: videos
    });
  });
});

app.get('/video/upload', function(req, res){
  res.render('video-upload', {title: 'Subir video - CodeCafe.tv'});
});

app.post('/video/upload', function(req, res){
  console.log(req.body.title);
  new models.VideoModel({
    title: req.body.title,
    slug: slug(req.body.title),
    youtube_id: req.body.youtube_id,
    description: req.body.description
  }).save(function(err, video){
    if(err) return;
    res.redirect('/video/' + video.slug);
  });
});

app.get('/video/:slug', function(req, res){
  console.log(req.params.slug);
  models.VideoModel.findOne({slug: req.params.slug}, function(err, video){
    res.render('video', {
      title: video.title + ' - CodeCafe.tv',
      video: video
    });
  });
});



app.get('/sugerir', function(req, res){
  res.render('suggest', {title:'Explicando código - CodeCafe.tv'});
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port %s', process.env.PORT || 3000);
