'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
    value: true,
})
exports['default'] = void 0

var _express = _interopRequireDefault(require('express'))

var _controllers = require('../controllers')

var indexRouter = _express['default'].Router()

indexRouter.post('/signup', _controllers.signUp)
indexRouter.post('/login', _controllers.login)
var _default = indexRouter
exports['default'] = _default
