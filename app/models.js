var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mongoUri = process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL ||
               'mongodb://localhost/codecafe';

var connection = mongoose.connect(mongoUri);

var VideoSchema = new Schema({
  title: {type: String},
  slug: {type: String},
  youtube_id: {type: String},
  description: {type: String},
  date: {type: Date, default: Date.now}
});

var SuggestionSchema = new Schema({
  author: String,
  suggestion: String
});

exports.VideoModel = mongoose.model('Video', VideoSchema);
exports.SuggestionModel = mongoose.model('Suggestion', SuggestionSchema);
