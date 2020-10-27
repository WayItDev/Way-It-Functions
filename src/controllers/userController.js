import BusBoy from 'busboy'
import path from 'path'
import os from 'os'
import fs from 'fs'

import { admin, db } from '../util/admin'
import config from '../util/config'

export const getAuthenticatedUser = (req, res) => {
    const userData = {}
    db.doc(`/users/${req.user.username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                userData.credentials = doc.data()
            }
            return res.json(userData)
        })
        .catch((err) => res.status(500).json({ error: err.code }))
}

export const addUserDetails = (req, res) => {
    const user = {
        gender: req.body.gender,
        waypoints: req.body.waypoints,
        calorie: req.body.calorie,
        calorieWeek: req.body.calorieWeek,
    }
    const userDetails = {}
    if (user.gender.trim() !== '') userDetails.gender = user.gender
    if (user.waypoints !== null) userDetails.waypoints = user.waypoints
    if (user.calorie !== null) userDetails.calorie = user.calorie
    if (user.calorieWeek !== null) userDetails.calorieWeek = user.calorieWeek
    db.doc(`/users/${req.params.username}`)
        .update(userDetails)
        .then(() => {
            res.status(200).json({ message: 'Details added succesfully' })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}

export const getAllUsers = (req, res) => {
    db.collection('users')
        .get()
        .then((querySnapshot) => {
            const docs = []
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() })
            })
            res.json({ docs })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}

export const getUserDetails = (req, res) => {
    const userData = {}
    db.doc(`/users/${req.params.username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                userData.user = doc.data()
                return db
                    .collection('routes')
                    .where('username', '==', req.params.username)
                    .get()
            } res.status(404).json({ error: 'User not found' })
        })
        .then((data) => {
            userData.routes = []
            data.forEach((doc) => {
                userData.routes.push(doc.data())
            })
            return db
                .collection('settings')
                .where('username', '==', req.params.username)
                .get()
        })
        .then((data) => {
            userData.settings = []
            data.forEach((doc) => {
                userData.settings.push({
                    theme: doc.data().theme,
                    metrics: doc.data().metrics,
                    id: doc.id
                })
            })
        })
        .then(() => {
            res.status(200).json(userData)
        })
        .catch((err) => res.status(500).json({ error: err }))
}

export const uploadImage = (req, res) => {
    const busboy = new BusBoy({ headers: req.headers })
    let imageToBeUploaded = {}
    let imageFileName
    req.pipe(busboy)
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if (
            mimetype !== 'image/jpeg'
            && mimetype !== 'image/jpg'
            && mimetype !== 'image/png'
        ) {
            return res.status(400).json({ error: 'Wrong file type submitted' })
        }
        const imageExtension = filename.split('.')[
            filename.split('.').length - 1
        ]
        imageFileName = `${Math.round(
            Math.random() * 1000000000000000
        ).toString()}.${imageExtension}`
        const filepath = path.join(os.tmpdir(), imageFileName)
        imageToBeUploaded = { filepath, mimetype }
        file.pipe(fs.createWriteStream(filepath))
    })
    busboy.on('finish', () => {
        admin
            .storage()
            .bucket()
            .upload(imageToBeUploaded.filepath, {
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToBeUploaded.mimetype,
                    },
                },
            })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
                return db
                    .doc(`/users/${req.user.username}`)
                    .update({ imageUrl })
            })
            .then(() => res.json({ message: 'image uploaded succesfully' }))
            .catch(() => res.status(500).json({ error: 'something went wrong' }))
    })
}
