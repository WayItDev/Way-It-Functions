'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
    value: true,
})
exports.login = exports.signUp = void 0

var _firebase = _interopRequireDefault(require('firebase'))

var _admin = require('../util/admin')

var _validators = require('../lib/validators')

var signUp = function signUp(req, res) {
    var newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        username: req.body.username,
    }

    var _validateSignupData = (0, _validators.validateSignupData)(newUser),
        valid = _validateSignupData.valid,
        errors = _validateSignupData.errors

    if (!valid) return res.status(400).json(errors)
    var token
    var userId

    _admin.db
        .doc('/users/'.concat(newUser.username))
        .get()
        .then(function (doc) {
            if (doc.exists) {
                return res.status(400).json({
                    username: 'this username is already taken',
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
                username: newUser.username,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId: userId,
            }
            return _admin.db
                .doc('/users/'.concat(newUser.username))
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

    var _validateLoginData = (0, _validators.validateLoginData)(user),
        valid = _validateLoginData.valid,
        errors = _validateLoginData.errors

    if (!valid) return res.status(400).json(errors)

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
