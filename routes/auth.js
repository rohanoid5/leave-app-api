const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../models/user');

router.get('/', (req, res) => {
	res.setHeader('content-type', 'application/json');
	res.json("location is root.")
});

router.post('/register', (req, res) => {
	res.setHeader('content-type', 'application/json');
	let newUser = new user({
		email: req.body.email,
		username: req.body.username,
		name: req.body.name,
		role: req.body.role,
	});
	user.register(newUser, req.body.password, (err, userData) => {
		if(err) {
			console.log(err);
      res.json({err: err});
		} else {
				passport.authenticate('local')(req, res, () => {
				res.json({user: userData});
			});
		}
	});
});

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.setHeader('content-type', 'application/json');
	res.json({"status": "ok"});
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
