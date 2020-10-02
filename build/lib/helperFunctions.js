'use strict'

Object.defineProperty(exports, '__esModule', {
    value: true,
})
exports.isEmpty = exports.isEmail = void 0

var isEmail = function isEmail(email) {
    var regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.match(regEx)) return true
    return false
}

exports.isEmail = isEmail

var isEmpty = function isEmpty(string) {
    if (string.trim() === '') return true
    return false
}

exports.isEmpty = isEmpty
