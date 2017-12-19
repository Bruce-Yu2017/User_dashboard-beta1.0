var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  email: {type: String, required: true, index: {unique: true}},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  password: {type: String, required: true},
  user_level: {type: Number, required: true},
  description: {type: String},
  _post_messages: [{type: Schema.Types.ObjectId, ref:"Message"}],
  _receive_messages: [{type: Schema.Types.ObjectId, ref:"Message"}],
  _post_comments: [{type: Schema.Types.ObjectId, ref:"Comment"}],
  _reveive_comments: [{type: Schema.Types.ObjectId, ref:"Comment"}]
}, {timestamps: true})
var User = mongoose.model("User", UserSchema);

var MessageSchema = new mongoose.Schema({
  content: {type: String},
  _comments: [{type: Schema.Types.ObjectId, ref:"Comment"}],
  _poster: {type: Schema.Types.ObjectId, ref:"User"},
  _receiver: {type: Schema.Types.ObjectId, ref:"User"}
}, {timestamps: true})
var Message = mongoose.model("Message", MessageSchema);

var CommentSchema = new mongoose.Schema({
  content: {type:String},
  _message: {type: Schema.Types.ObjectId, ref:"Message"},
  _poster: {type: Schema.Types.ObjectId, ref:"User"},
  _receiver: {type: Schema.Types.ObjectId, ref:"User"}
}, {timestamps: true})
var Comment = mongoose.model("Comment", CommentSchema);







