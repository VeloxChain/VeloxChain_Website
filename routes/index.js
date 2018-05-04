var express = require('express');
var router = express.Router();
const models = require("../models");
const sgMail = require('@sendgrid/mail');

const appConfig = require('../configs/app.config');

sgMail.setApiKey(appConfig.mail_api_key);

router.get('/', function(req, res, next) {
  res.sendfile('./views/index.html');
});

router.get('/presale', function(req, res, next) {
  res.sendfile('./views/presale.html');
});

const successResponse = (res, data) => {
  return res.json({
    status: 'success',
    data
  })
}

const failResponse = (res, message) => {
  return res.json({
    status: 'fail',
    data: message
  })
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

router.post('/add_whitelist', function(req, res, next) {
  let emailToAdd = req.body.email;

  if(!validateEmail(emailToAdd)) {
    return failResponse(res, 'Invalid email');
  }

  models.whitelist.findOrCreate({
    where: {
      email: emailToAdd,
    },
    defaults: {
      created_at: new Date(),
      updated_at: new Date(),
    }
  }).spread(
    (data, created) => {
      if(!created){
        return failResponse(res, 'Email is added');
      }

      const msg = {
        to: emailToAdd,
        from: appConfig.email_sender_address,
        subject: 'Thank for Registering our whitelist',
        html: '<p>TBD</p>',
      };

      sgMail.send(msg);

      return successResponse(res, data);
    }
  ).catch((message) => {
    return failResponse(res, message);
  });
});

router.post('/action_presale', function(req, res, next) {
  let { full_name, email, is_investor, represent_type, desired_allocation, citizenship, sending_addr, note } = req.body;
  if(!validateEmail(email)) {
    return failResponse(res, 'Invalid email');
  }

  models.presale.create({
    email: email,
    full_name: full_name,
    email: email,
    is_investor: is_investor,
    represent_type: represent_type,
    desired_allocation: desired_allocation,
    citizenship: citizenship,
    sending_addr: sending_addr,
    note: note,
    created_at: new Date(),
    updated_at: new Date(),
  }).then(
    (data) => {
      const msg = {
        to: email,
        from: appConfig.email_sender_address,
        subject: 'Resale is successfully',
        html: '<p>TBD</p>',
      };
      sgMail.send(msg);
      return successResponse(res, data);
    }
  ).catch((message) => {
    return failResponse(res, message);
  });
});

module.exports = router;
