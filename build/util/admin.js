'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
Object.defineProperty(exports, 'admin', {
  enumerable: true,
  get: function get() {
    return _firebaseAdmin['default']
  },
})
exports.db = void 0

var _firebaseAdmin = _interopRequireDefault(require('firebase-admin'))

var _serviceAccountKey = _interopRequireDefault(
  require('../../serviceAccountKey.json')
)

var databaseURL

if (process.env.ENV === 'TEST') {
  databaseURL = 'http://localhost:8080'
} else {
  databaseURL = 'https://way-it-d7235.firebaseio.com'
}

_firebaseAdmin['default'].initializeApp({
  credential: _firebaseAdmin['default'].credential.cert(
    _serviceAccountKey['default']
  ),
  databaseURL: databaseURL,
})

var db = _firebaseAdmin['default'].firestore()

exports.db = db
