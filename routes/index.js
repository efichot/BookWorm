var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET /register
router.get('/register', function(req, res, next) {
  return res.render('register', { title: 'Register' });
});

//POST /register
router.post('/register', function(req, res, next) {
  if (req.body.name && req.body.email && req.body.favoriteBook && req.body.password && req.body.confirmPassword) {     
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error('Password do not match.');
      err.status = 400;
      return next(err);
    }
    
    // Create a document object
    var documentModel = {
      email: req.body.email,      
      name: req.body.name,
      favoriteBook: req.body.favoriteBook,
      password: req.body.password
    };
         

    // use schema's 'create' method to insert document into mongo
    User.create(documentModel, function(err, user) {  
      if (err) {
        return next(err);
      } else {
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
