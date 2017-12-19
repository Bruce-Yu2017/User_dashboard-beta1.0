var mongoose = require("mongoose");
var path = require("path");
var User = mongoose.model("User");
var Message = mongoose.model("Message");
var Comment = mongoose.model("Comment");


module.exports = {
  register: function(req, res) {
    User.find({}, function(err, users) {
      if(err) {
        console.log("from controller register findall: ", err);
      }
      else {
        if(users.length == 0) {
          var admin = new User(req.body);
          admin.user_level = 9;
          admin.save(function(err) {
            if(err) {
              console.log("from controller register save admin: ", err);
            }
            else {
              res.json({success: "success", user: admin});
            }
          })
        }
        else {
          User.findOne({email: req.body.email}, function(err, user) {
            if(err) {
              console.log("from register controller: register normal user error");
            }
            else {
              if(user == null) {
                var user = new User(req.body);
                user.user_level = 0;
                user.save(function(err) {
                  if(err) {
                    console.log("from register controller: save normal user error");
                  }
                  else {
                    res.json({success: "success", user: user});
                  }
                })
              }
              else {
                res.json("from register controller res: email existed")
              }
            }
          })
        }
      }
    })
  },

  login: function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if(err) {
        console.log("error from login controller: ", err);
      }
      else {
        if(user == null) {
          res.json({error: "email invalid"})
        }
        else {
          if(user.password == req.body.password) {
            res.json(user)
          }
          else {
            res.json({error: "password is not correct"})
          }
        }
      }
    })
  },

  retrieveAllUsers: function(req, res) {
    User.find({}).exec(function(err, users) {
      if(err) {
        console.log("err from controller retrieveAllUsers: ", err);
      }
      else {
        // console.log("retrieveAllUsers from controller: ", users);
        res.json(users);
      }
    })
  },

  //update info by user-self and by admin by this function
  update: function(req, res) {
    console.log("from controller update id: ", req.params.id);
    console.log("from controller update: ", req.body);
    User.findOne({email: req.body.email}, function(err, user) {
      if(err) {
        console.log("err from controller update finding email: ", err);
      }
      else {
        if(user == null) {
          User.findOne({_id: req.params.id}, function(err, user) {
            if(err) {
              console.log("from controller update find id: ", err);
            }
            else {
              user.email = req.body.email;
              user.first_name = req.body.first_name;
              user.last_name = req.body.last_name;
              user.save(function(err) {
                if(err) {
                  console.log("from controller update: ", err);
                }
                else {
                  // console.log("fron controller after err: ", user);
                  res.json({success: "success", user: user})
                }
              })
            }
          })
        }
        else {
          res.json("from register controller update: email existed")
        }
      }
    })

  },

  updatepassword: function(req, res) {
    console.log("from controller updatepassword: ", req.body.password);
    User.findOne({_id: req.params.id}, function(err, user) {
      if(err) {
        console.log("from controller updatepassword: ", err);
      }
      else {
        user.password = req.body.password;
        user.save(function(err) {
          if(err) {
            console.log("from controller updatepassword after save: ", err);
          }
          else {
            res.json(user);
          }
        })
      }
    })
  },

  add_des: function(req, res) {
    console.log("from controller add des: ", req.body.des);
    User.findOne({_id: req.params.id}, function(err, user) {
      if(err) {
        console.log("from controller add des: ", err);
      }
      else {
        user.description = req.body.des;
        user.save(function(err) {
          if(err) {
            console.log("from controller add des after save: ", err);
          }
          else {
            res.json(user);
          }
        })
      }
    })
  },

  delete_user: function(req, res) {
    User.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log("delete_user from controller err: ", err);
      }
      else {
        res.json("delete user from controller success")
      }
    })
  },

  //use nested populate to query data
  //sample: https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose 
  retrieveOneUser: function(req, res) {
    User.findOne({_id: req.params.id}).populate({path: "_receive_messages", populate: {path: "_poster"}}).exec(function(err, user) {
      var options = {
        path: "_receive_messages._comments",
        model: "Comment"
      };
      if(err) {
        console.log("err from retrieveAllMessage: ", err);
      }
      else {
        User.populate(user, options, function(err, user2) {
          var option2 = {
            path: "_receive_messages._comments._poster",
            model: "User"
          }
          User.populate(user2, option2, function(err, user3) {
            // console.log("user3", user3._receive_messages[0]._comments[0]);
            console.log("this,", user3._receive_messages[0]._comments[0]);
            res.json(user3);
          })
        })



      }
    })
  },

  create_message: function(req, res) {
    var target_id = req.params.target_id;
    var user_id = req.params.user_id;
    var message = new Message(req.body);
    //add message into receiver as his _receive_messages
    User.findOne({_id: target_id}, function(err, target_user) {
      message._receiver = target_user._id;
      message.save(function(err) {
        if(err) {
          console.log("create_message for receiver err before save");
        }
        else {
          target_user._receive_messages.push(message);
          target_user.save(function(err) {
            if(err) {
              console.log("target_user save error");
            }
            else {
              console.log("add message into target_user success");
              res.json("create message success")
            }
          })
        }
      })
    })
    //add message into poster as his _post_messages
    User.findOne({_id: user_id}, function(err, poster) {
      message._poster = poster._id;
      message.save(function(err) {
        if(err) {
          console.log("create_message for poster err before save");
        }
        else {
          poster._post_messages.push(message);
          poster.save(function(err) {
            if(err) {
              console.log("poster save error");
            }
            else {
              console.log("add message into poster success");
            }
          })
        }
      })
    })
  },


  create_comment: function(req, res) {
    var msg_id = req.params.msg_id;
    var current_user = req.params.user_id;
    var comment = new Comment(req.body);
    Message.findOne({_id: msg_id}, function(err, message) {
      comment._message = message._id;
      comment.save(function(err) {
        if(err) {
          console.log("save comment err: ");
        }
        else {
          message._comments.push(comment);
          message.save(function(err) {
            if(err) {
              console.log("save message err when create comment");
            }
          })
        }
      })

    })

    User.findOne({_id: current_user}, function(err, comment_poster) {
      comment._poster = comment_poster._id;
      comment.save(function(err) {
        if(err) {
          console.log("save comment err with comment poster");
        }
        else {
          comment_poster._post_comments.push(comment);
          comment_poster.save(function(err) {
            if(err) {
              console.log("save comment poster err with comment");
            }
            else {
              console.log("create comment success");
            }
          })
        }
      })
    })
  },

  delete_message: function(req, res) {
    Message.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log("delete message err: ", err);
      }
      else {
        res.json("delete message success")
      }
    })
  },

  delete_comment: function(req, res) {
    Comment.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log("delete comment err: ", err);
      }
      else {
        res.json("delete comment success")
      }
    })
  }























}
