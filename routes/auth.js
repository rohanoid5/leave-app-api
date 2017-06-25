const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	res.setHeader('content-type', 'application/json');
	res.json("location is root.")
});

router.post('/register', (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
				role: req.body.role
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ status: "failed", message: "couldn't save new user." });
        } else {
            res.json({ status: "sucess", message: "user has  been registered." });
        }
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.setHeader('content-type', 'application/json');
	res.json({user: req.user, message: "you are in the profile route."});
});

// router.post('/login', passport.authenticate('local'), (req, res) => {
// 	res.setHeader('content-type', 'application/json');
// 	res.json({"status": "ok"});
// });

router.post('/authenticate', (req, res, next) => {
  res.setHeader('content-type', 'application/json');
	let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, "My app secret", {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

router.get('/logout', (req, res) => {
	req.logout();
	res.setHeader('content-type', 'application/json');
  res.json({"status": "Logged out"});
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  console.log("Not logged in");
  res.setHeader('content-type', 'application/json');
  res.json({"status": "Not logged in"});
};

module.exports = router;
