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
  let { full_name, email, is_investor, represent_type, desired_allocation, citizenship, sending_addr, note, currency } = req.body;

  if(
    _.isNull(full_name) ||
    _.isNull(email) ||
    _.isNull(desired_allocation)
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
      email: email,
      full_name: full_name,
      email: email,
      is_investor: is_investor,
      represent_type: represent_type,
      desired_allocation: desired_allocation,
      currency: currency,
      citizenship: citizenship,
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
          name: `${_.isEmpty(full_name)? "": full_name}`
        }
      };
      sgMail.send(msg);
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
          full_name: {
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

router.put('/admin/pre_sale/:presale_id', function(req, res, next) {
  let presale = req.body;

  if (!req.params.presale_id || !presale) {
    return responseRouter.fail(res, {
      message: "Bad request"
    }, 400)
  }

 

  if(
    _.isNull(presale.full_name) ||
    _.isNull(presale.email) ||
    _.isNull(presale.desired_allocation)
  ) {
    return failResponse(res, 'Bad request');
  }

  models.presale.update({
    full_name: presale.full_name,
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
});

module.exports = router;
