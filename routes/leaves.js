const express = require('express');
const router = express.Router();
const leave = require('../models/leave');
const user = require('../models/user');
const Promise = require('bluebird');
const mongoose = require('mongoose');

Promise.promisifyAll(mongoose);

function Leave(reason, start_date, end_date, requested_by, leave_type) {
    this.reason = reason;
    this.start_date = start_date;
    this.end_date = end_date;
    this.requested_by = requested_by;
    this.leave_type = leave_type;
}

router.get('/', (req, res) => {
    res.setHeader('content-type', 'application/json');
    leave.find({}, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ leaves: data });
        }
    });
});

router.put('/:id', isLoggedIn, (req, res) => {
    res.setHeader('content-type', 'application/json');
    if (req.user.role == 'MNG') {
      leave.findById(req.params.id, (err, data) => {
          if (err) {
            res.json({status:500, leaves: 'null', message: err });
          } else {
              data.update({approval_status: req.body.approval_status},
                (err, data) => {
                  if(err) {
                    res.json({status:500, leave: 'null', message: err });
                  } else {
                    res.json({status:200, leave: data, message: "Successfully saved." });
                  }
              });
          }
      });
    } else res.json({status:404, leaves: 'null', message: 'You are not authorized' });
});

router.post('/', isLoggedIn, (req, res) => {
    res.setHeader('content-type', 'application/json');
    const reason = req.body.reason;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const leave_type = req.body.leave_type;
    let requested_by = {
        id: req.user._id,
        username: req.user.username
    };
    let newLeave = new Leave(reason, start_date, end_date, requested_by, leave_type);
    leave.create(
        newLeave, (err, data) => {
            if (err) {
                res.json({ inserted: 'NULL', message: err });
            } else {
                res.json({ inserted: data, message: 'Success' });
            }
        }
    );
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.setHeader('content-type', 'application/json');
    if (req.user.role == 'EMP') {
      leave.find({ 'requested_by.username': req.user.username }, (err, cData) => {
          if (err) {
              res.json({ err: err });
          } else {
              res.json({ leaves: cData });
          }
      });
    } else if (req.user.role == 'MNG') {
      leave.find({}, (err, data) => {
          if (err) {
              res.json({ err: err });
          } else {
              res.json({ leaves: data });
          }
      });
    }
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("Not logged in");
    res.setHeader('content-type', 'application/json');
    res.json({ "status": "Not logged in" });
};

module.exports = router;
