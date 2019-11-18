var express = require("express");
var router  = express.Router();
var passport= require("../config/passport");
var Post     = require("../models/Post");
var util     = require("../util");

// Pinstagram
router.get("/", function(req, res){
  res.render("home/welcome");
});
router.get("/about", function(req, res){
  res.render("home/about");
});

// show
/*router.get("/:id", function(req, res){
  Post.findOne({_id:req.params.id})
  .populate("author")
  .exec(function(err, post){
    if(err) return res.json(err);
    res.render("posts/show", {post:post});
  });
});*/

// Login
router.get("/login", function (req,res) {
  var username = req.flash("username")[0];
  var errors = req.flash("errors")[0] || {};
  res.render("home/login", {
    username:username,
    errors:errors
  });
});

// Post Login
router.post("/login",
  function(req,res,next){
    var errors = {};
    var isValid = true;

    if(!req.body.username){
      isValid = false;
      errors.username = "Username is required!";
    }
    if(!req.body.password){
      isValid = false;
      errors.password = "Password is required!";
    }

    if(isValid){
      next();
    } else {
      req.flash("errors",errors);
      res.redirect("/login");
    }
  },
  passport.authenticate("local-login", {
    successRedirect : "/posts",
    failureRedirect : "/login"
  }
));

// Logout
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
