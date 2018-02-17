const express = require('express');
const router = express.Router();
const leave = require('../models/leave');
const user = require('../models/user');
const property = require('../models/property');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const passport = require('passport');

Promise.promisifyAll(mongoose);

function Property(name_owner, name_apartment, type, rent, address) {
  this.name_owner = name_owner;
  this.name_apartment = name_apartment;
  this.type = type;
  this.rent = rent;
  this.address = address;
}

router.get('/', (req, res) => {
  res.setHeader('content-type', 'application/json');
  property.find({}, (err, data) => {
    if (err) {
      res.status(400).json({data: '', message: err});
    } else {
      res.status(200).json({data: data, message: 'Success'});
    }
  });
});

router.post('/', (req, res) => {
  res.setHeader('content-type', 'application/json');
  let name_owner = req.body.name_owner;
  let name_apartment = req.body.name_apartment;
  let type = req.body.type;
  let rent = req.body.rent;
  let address = req.body.address;
  let newProperty = new Property(name_owner, name_apartment, type, rent, address);
  property.create(
    newProperty, (err, data) => {
      if (err) {
        res.status(400).json({inserted: '', message: err});
      } else {
        res.status(200).json({inserted: data, message: 'Success' });
      }
    }
  );
});

module.exports = router;
