import { db, Firebase } from '../util/firebaseConfig'
import { isEmail, isEmpty } from '../helperFunctions'

export const signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
  }

  const errors = {}

  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty'
  } else if (!isEmail(newUser.email)) {
    errors.email = 'Must be a valid email address'
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty'
  if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Passwords must match'
  if (isEmpty(newUser.username)) errors.username = 'Must not be empty'

  if (Object.keys(errors).length > 0) res.status(400).json(errors)

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
      return Firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
      )
    })
    .then((data) => {
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then((tokenId) => {
      token = tokenId
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
        return res.status(400).json({ email: 'Email is already in use' })
      }
      return res.status(500).json({ error: err.code })
    })
}

export const login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  }

  const errors = {}

  if (isEmpty(user.email)) errors.email = 'Must not be empty'
  if (isEmpty(user.password)) errors.password = 'Must not be empty'

  if (Object.keys(errors).length > 0) res.status(400).json(errors)

  Firebase.auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => data.user.getIdToken())
    .then((token) => res.json({ token }))
    .catch((err) => {
      if (err.code === 'auth/wrong-password') {
        res.status(403).json({ general: 'Wrong credentials, please try again' })
      }
      res.status(500).json({ error: err.code })
    })
}
