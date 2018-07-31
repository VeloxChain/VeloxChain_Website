var express = require('express');
var router = express.Router();
const models = require("../models");
const sgMail = require('@sendgrid/mail');
const _ = require('lodash');
var Sequelize = require("sequelize");

var moment = require("moment");
const responseRouter= require("./response");
const appConfig = require('../configs/app.config');

const Op = Sequelize.Op

sgMail.setApiKey(appConfig.mail_api_key);

router.get('/', function(req, res, next) {
  res.sendfile('./views/index.html');
});

router.get('/admin', function(req, res, next) {
  res.sendfile('./views/admin.html');
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
      res.cookie('is_added_newsletter', 'true');
      
      if(!created){
        return failResponse(res, 'Email is added');
      }
      
      const msg = {
        to: emailToAdd,
        from: appConfig.email_sender_address,
        templateId: "691924c8-b40b-4867-afdf-3e4241d150c6"
      };

      sgMail.send(msg);
      return successResponse(res, data);
    }
  ).catch((message) => {
    return failResponse(res, message);
  });
});

router.post('/action_presale', function(req, res, next) {
  let { first_name, last_name, email, phone_number, is_investor, represent_type, desired_allocation, citizenship, postal_code , sending_addr, note, currency } = req.body;

  if(
    _.isNull(first_name) ||
    _.isNull(last_name) ||
    _.isNull(email) ||
    _.isNull(phone_number) ||
    _.isNull(desired_allocation) ||
    _.isNull(postal_code)
  ) {
    return failResponse(res, 'Bad request');
  }

  if(!validateEmail(email)) {
    return failResponse(res, 'Invalid email');
  }

  models.presale.findOrCreate({
    where: {
      email: email,
    },
    defaults: {
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      is_investor: is_investor,
      represent_type: represent_type,
      desired_allocation: desired_allocation,
      currency: currency,
      citizenship: citizenship,
      postal_code: postal_code,
      sending_addr: sending_addr,
      note: note,
      created_at: new Date(),
      updated_at: new Date(),
    }
  }).spread(
    (data, created) => {
      if (!created) {
        return failResponse(res, 'Email is added');
      }

      const msg = {
        to: email,
        from: appConfig.email_sender_address,
        subject: 'Resale is successfully',
        templateId: "811addca-9f9d-4980-a81e-29ecfa3a4cc8",
        substitutions: {
          first_name: `${_.isEmpty(first_name)? "": first_name}`,
          last_name: `${_.isEmpty(last_name)? "": last_name}`,
        }
      };

      switch (represent_type) {
        case "1": 
          represent_type = "Individual";
          break;
        case "2":
          represent_type = "Syndicate";
          break;
        case "3": 
          represent_type = "Professional Fund";
          break;
        default: 
          represent_type = "Individual";
      }

      const msg_quang = {
        to: "quang@bikecoin.network",
        from: appConfig.email_sender_address,
        subject: 'You got a new lead from Pre-Sale',
        templateId: "935df2d5-0bec-4c5f-b3e2-7b71dffcfcb2",
        substitutions: {
          first_name: `${_.isEmpty(first_name)? "": first_name}`,
          last_name: `${_.isEmpty(last_name)? "": last_name}`,
          email: `${_.isEmpty(email)? "": email}`,
          phone_number: `${_.isEmpty(phone_number)? "": phone_number}`,
          is_investor: `${(is_investor == 1)? "Yes": "No"}`,
          represent_type: `${_.isEmpty(represent_type)? "": represent_type}`,
          desired_allocation: `${_.isEmpty(desired_allocation)? "": desired_allocation}`,
          currency: `${_.isEmpty(currency)? "": currency}`,
          citizenship: `${_.isEmpty(citizenship)? "": citizenship}`,
          postal_code: `${_.isEmpty(postal_code)? "": postal_code}`,
          sending_addr: `${_.isEmpty(sending_addr)? "": sending_addr}`,
          note: `${_.isEmpty(note)? "": note}`,
        }
      };

      sgMail.send(msg);
      sgMail.send(msg_quang);
      return successResponse(res, data);
    }
  ).catch((message) => {
    return responseRouter.fail(res, message.name)
  })
});

router.getPresale = function(req, res, next) {
  let option = {
    limit: appConfig.paginate_limit_item
  }

  if (!_.isEmpty(req.query._sort) && !_.isEmpty(req.query._order)) {
    option["order"] = [
      [
        req.query._sort,
        req.query._order
      ]
    ]
  }

  if (!_.isEmpty(req.query.search)) {
    option["where"] = {
      [Op.or]: [
        {
          email: {
            [Op.like]: `%${req.query.search}%`
          }
        },
        {
          first_name: {
            [Op.like]: `%${req.query.search}%`
          }
        },
        {
          last_name: {
            [Op.like]: `%${req.query.search}%`
          }
        }
      ]
    }
  }

  if (!_.isEmpty(req.query._start) && _.isNumber(_.toNumber(req.query._start))) {
    option["offset"] = _.toNumber(req.query._start)
  }

  models.presale.findAndCountAll(option)
    .then(
      (data) => {
        res.set("X-Total-Count", data.count)
        return res.json(data.rows)
      }
    ).catch((message) => {
      return responseRouter.fail(res, message.name)
    })
};

const processDataForGetOverviewInformation = (listPreSale, req) => {
  let dataResponse = {
    reSale: {},
  }

  if (!_.isEmpty(req.query.to_day)) {
    dataResponse.reSale["today"] = _.filter(listPreSale, data => moment(data.created_at).format("MM-DD-YYYY") == moment().format("MM-DD-YYYY")).length
  }

  dataResponse.reSale["week"] = _.filter(listPreSale, data => moment(data.created_at).format("WW-MM-YYYY") == moment().format("WW-MM-YYYY")).length

  dataResponse.reSale["month"] = _.filter(listPreSale, data => moment(data.created_at).format("MM-YYYY") == moment().format("MM-YYYY")).length

  dataResponse.reSale["year"] = _.filter(listPreSale, data => moment(data.created_at).format("YYYY") == moment().format("YYYY")).length

  dataResponse.reSale["total"] = listPreSale.length

  return dataResponse
}

router.getOverviewInformation = function(req, res, next) {
  let queryOption = {}

  queryOption["attributes"] = ["id", "created_at"]

  let listPreSale = []

  models.presale.findAll(queryOption).then(data => {
    listPreSale = data
    return responseRouter.success(res, processDataForGetOverviewInformation(listPreSale, req))
  })
};

router.updatePreSale = function(req, res, next) {
  let presale = req.body;

  if (!req.params.presale_id || !presale) {
    return responseRouter.fail(res, {
      message: "Bad request"
    }, 400)
  }

  if(
    _.isNull(presale.first_name) ||
    _.isNull(presale.last_name) ||
    _.isNull(presale.email) ||
    _.isNull(presale.desired_allocation)
  ) {
    return failResponse(res, 'Bad request');
  }

  models.presale.update({
    first_name: presale.first_name,
    last_name: presale.last_name,
    email: presale.email,
    citizenship: presale.citizenship,
    desired_allocation: presale.desired_allocation,
    currency: presale.currency
  }, {
    where: {
      id: req.params.presale_id
    }
  }).then(() => {
    return responseRouter.success(res, {
      message: "success"
    }, 200)
  }).catch((error) => {
    return responseRouter.fail(res, {
      message: error.name
    })
  })
}

router.getWhitelist = function(req, res, next) {
  let option = {
    limit: appConfig.paginate_limit_item
  }

  if (!_.isEmpty(req.query._sort) && !_.isEmpty(req.query._order)) {
    option["order"] = [
      [
        req.query._sort,
        req.query._order
      ]
    ]
  }

  if (!_.isEmpty(req.query.search)) {
    option["where"] = {
      email: {
        [Op.like]: `%${req.query.search}%`
      }
    }
  }

  if (!_.isEmpty(req.query._start) && _.isNumber(_.toNumber(req.query._start))) {
    option["offset"] = _.toNumber(req.query._start)
  }

  models.whitelist.findAndCountAll(option)
    .then(
      (data) => {
        res.set("X-Total-Count", data.count)
        return res.json(data.rows)
      }
    ).catch((message) => {
      return responseRouter.fail(res, message.name)
    })
};

module.exports = router;
