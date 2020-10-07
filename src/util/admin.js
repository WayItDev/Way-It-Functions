import admin from 'firebase-admin'
import serviceAccount from '../../serviceAccountKey.json'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
})

const db = admin.firestore()

export { admin, db }
