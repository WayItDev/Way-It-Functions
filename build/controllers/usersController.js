'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.login = exports.signUp = void 0

var _firebase = _interopRequireDefault(require('firebase'))

var _config = _interopRequireDefault(require('../util/config'))

var _admin = require('../util/admin')

_firebase['default'].initializeApp(_config['default'])

var isEmail = function isEmail(email) {
  var regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(regEx)) return true
  return false
}

var isEmpty = function isEmpty(string) {
  if (string.trim() === '') return true
  return false
}

var signUp = function signUp(req, res) {
  var newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    userName: req.body.userName,
  }
  var errors = {}

  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty'
  } else if (!isEmail(newUser.email)) {
    errors.email = 'Must be a valid email address'
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty'
  if (newUser.password !== newUser.confirmPassword)
    errors.confirmPassword = 'Passwords must match'
  if (isEmpty(newUser.userName)) errors.userName = 'Must not be empty'
  if (Object.keys(errors).length > 0) res.status(400).json(errors)
  var token
  var userId

  _admin.db
    .doc('/users/'.concat(newUser.userName))
    .get()
    .then(function (doc) {
      if (doc.exists) {
        return res.status(400).json({
          userName: 'this username is already taken',
        })
      }

      return _firebase['default']
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
    })
    .then(function (data) {
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then(function (tokenId) {
      token = tokenId
      var userCredentials = {
        userName: newUser.userName,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId: userId,
      }
      return _admin.db
        .doc('/users/'.concat(newUser.userName))
        .set(userCredentials)
    })
    .then(function () {
      return res.status(201).json({
        token: token,
      })
    })
    ['catch'](function (err) {
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({
          email: 'Email is already in use',
        })
      }

      return res.status(500).json({
        error: err.code,
      })
    })
}

exports.signUp = signUp

var login = function login(req, res) {
  var user = {
    email: req.body.email,
    password: req.body.password,
  }
  var errors = {}
  if (isEmpty(user.email)) errors.email = 'Must not be empty'
  if (isEmpty(user.password)) errors.password = 'Must not be empty'
  if (Object.keys(errors).length > 0) res.status(400).json(errors)

  _firebase['default']
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(function (data) {
      return data.user.getIdToken()
    })
    .then(function (token) {
      return res.json({
        token: token,
      })
    })
    ['catch'](function (err) {
      if (err.code === 'auth/wrong-password') {
        res.status(403).json({
          general: 'Wrong credentials, please try again',
        })
      }

      res.status(500).json({
        error: err.code,
      })
    })
}

exports.login = login
