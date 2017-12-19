var dashboard = require('../controller/dashboard_controller.js');
var path = require('path');

module.exports = function(app){
  //register
  app.post("/register", function(req, res) {
    dashboard.register(req, res);
  })
  //login
  app.post("/login", function(req, res) {
    dashboard.login(req, res);
  })

  //retrieve All User
  app.get("/users", function(req, res) {
    dashboard.retrieveAllUsers(req, res);
  })

  //update user info
  app.put("/user/:id", function(req, res) {
    dashboard.update(req, res);
  })

  //update password
  app.put("/password/:id", function(req, res) {
    dashboard.updatepassword(req, res);
  })

  //add description
  app.put("/des/:id", function(req, res) {
    dashboard.add_des(req, res);
  })

  //delete user from dashboard
  app.delete("/user/:id", function(req, res) {
    dashboard.delete_user(req, res);
  })

  //retrieve one user
  app.get("/user/:id", function(req, res) {
    dashboard.retrieveOneUser(req, res);
  })

  //create new message
  app.post("/message/:target_id/:user_id", function(req, res) {
    dashboard.create_message(req, res);
  })

  //create comment
  app.post("/comment/:msg_id/:user_id", function(req, res) {
    dashboard.create_comment(req, res);
  })

  //delete message
  app.delete("/message/:id", function(req, res) {
    dashboard.delete_message(req, res);
  })

  //delete comment
  app.delete("/comment/:id", function(req, res) {
    dashboard.delete_comment(req, res);
  })




  app.all("*",function(req,res){
    res.sendFile('index.html', { root: './client/dist' });
  })






}
