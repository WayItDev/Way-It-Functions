import admin from 'firebase-admin'
import serviceAccount from '../../serviceAccountKey.json'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://way-it-d7235.firebaseio.com',
})

const db = admin.firestore()

export { admin, db }
