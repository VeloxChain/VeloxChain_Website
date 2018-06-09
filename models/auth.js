/**
 * Configuration.
 */

var models = require("../models")

var config = {
  tokens: [],
}


/*
 * Get access token.
 */

var getAccessToken = function(bearerToken, callback) {

  var tokens = config.tokens.filter(function(token) {
    return token.accessToken === bearerToken
  })

  return callback(false, tokens[0])
}

/**
 * Get client.
 */

var getClient = function(clientId, clientSecret, callback) {
  var clients = models.clients.find({
    where: {
      clientId: clientId,
      clientSecret: clientSecret
    }
  }, {
    raw: true
  })
  clients.then(function(clients) {
    callback(false, clients)
  })
  // callback(false, clients[0]);
}

/**
 * Grant type allowed.
 */

var grantTypeAllowed = function(clientId, grantType, callback) {

  callback(false, grantType === "password")
}

/**
 * Save token.
 */

var saveAccessToken = function(accessToken, clientId, expires,
  user, callback) {
  config.tokens.push({
    accessToken: accessToken,
    expires: expires,
    clientId: clientId,
    user: user
  })

  callback(false)
}

/*
 * Get user.
 */

var getUser = function(username, password, callback) {
  var user = models.user.find({
    where: {
      username: username,
      password: password
    }
  }, {
    raw: true
  })
  user.then(function(user) {
    callback(false, user)
  })
}

/**
 * Export model definition object.
 */

module.exports = {
  getAccessToken: getAccessToken,
  getClient: getClient,
  grantTypeAllowed: grantTypeAllowed,
  saveAccessToken: saveAccessToken,
  getUser: getUser
}