import firebase from 'firebase'

import { db } from '../util/admin'
import { validateSignupData, validateLoginData } from '../lib/validators'

export const signUp = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        username: req.body.username,
    }

    const { valid, errors } = validateSignupData(newUser)

    if (!valid) return res.status(400).json(errors)

    let token
    let userId
    db.doc(`/users/${newUser.username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res
                    .status(400)
                    .json({ username: 'this username is already taken' })
            }
            return firebase
                .auth()
                .createUserWithEmailAndPassword(newUser.email, newUser.password)
        })
        .then((data) => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then((idToken) => {
            token = idToken
            const userCredentials = {
                username: newUser.username,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
            }
            return db.doc(`/users/${newUser.username}`).set(userCredentials)
        })
        .then(() => res.status(201).json({ token }))
        .catch((err) => {
            if (err.code === 'auth/email-already-in-use') {
                return res
                    .status(400)
                    .json({ email: 'Email is already is use' })
            }
            return res
                .status(500)
                .json({ general: 'Something went wrong, please try again' })
        })
}

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    const { valid, errors } = validateLoginData(user)

    if (!valid) return res.status(400).json(errors)

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => data.user.getIdToken())
        .then((token) => res.json({ token }))
        .catch(() => res
            .status(403)
            .json({ general: 'Wrong credentials, please try again' }))
}
