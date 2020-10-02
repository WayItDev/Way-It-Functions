'use strict'

Object.defineProperty(exports, '__esModule', {
    value: true,
})
exports.validateLoginData = exports.validateSignupData = void 0

var _helperFunctions = require('./helperFunctions')

var validateSignupData = function validateSignupData(data) {
    var errors = {}

    if ((0, _helperFunctions.isEmpty)(data.email)) {
        errors.email = 'Must not be empty'
    } else if (!(0, _helperFunctions.isEmail)(data.email)) {
        errors.email = 'Must be a valid email address'
    }

    if ((0, _helperFunctions.isEmpty)(data.password))
        errors.password = 'Must not be empty'
    if (data.password !== data.confirmPassword)
        errors.confirmPassword = 'Passwords must match'
    if ((0, _helperFunctions.isEmpty)(data.username))
        errors.username = 'Must not be empty'
    return {
        errors: errors,
        valid: Object.keys(errors).length === 0,
    }
}

exports.validateSignupData = validateSignupData

var validateLoginData = function validateLoginData(data) {
    var errors = {}
    if ((0, _helperFunctions.isEmpty)(data.email))
        errors.email = 'Must not be empty'
    if ((0, _helperFunctions.isEmpty)(data.password))
        errors.password = 'Must not be empty'
    return {
        errors: errors,
        valid: Object.keys(errors).length === 0,
    }
}

exports.validateLoginData = validateLoginData
