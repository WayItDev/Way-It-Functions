import admin from 'firebase-admin'
import firebase from 'firebase'
import config from './config'
import serviceAccount from '../../serviceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://way-it-d7235.firebaseio.com',
})

const Firebase = firebase.initializeApp(config)

const db = admin.firestore()

export { admin, db, Firebase }
