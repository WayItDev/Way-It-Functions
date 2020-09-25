'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.FBAuth = void 0

var _admin = require('../util/admin')

/* eslint consistent-return: "off" */
var FBAuth = function FBAuth(req, res, next) {
  var idToken

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    /* eslint prefer-destructuring: "off" */
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else {
    return res.status(403).json({
      error: 'Unauthorized',
    })
  }

  _admin.admin
    .auth()
    .verifyIdToken(idToken)
    .then(function (decodedToken) {
      req.user = decodedToken
      return _admin.db
        .collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get()
    })
    .then(function (data) {
      req.user.userName = data.docs[0].data().userName
      return next()
    })
    ['catch'](function (err) {
      return res.status(403).json(err)
    })
}

exports.FBAuth = FBAuth
