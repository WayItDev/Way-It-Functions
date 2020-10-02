'use strict'

Object.defineProperty(exports, '__esModule', {
    value: true,
})

var _authController = require('./authController')

Object.keys(_authController).forEach(function (key) {
    if (key === 'default' || key === '__esModule') return
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _authController[key]
        },
    })
})

var _userController = require('./userController')

Object.keys(_userController).forEach(function (key) {
    if (key === 'default' || key === '__esModule') return
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _userController[key]
        },
    })
})
