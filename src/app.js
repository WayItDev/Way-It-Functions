import logger from 'morgan'
import express from 'express'
import firebase from 'firebase'
import 'firebase/performance'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'

import { login, signUp, uploadImage, addUserDetails } from './controllers'
import config from './util/config'
import { FBAuth } from './middleware/fbAuth'

firebase.initializeApp(config)

const app = express()

app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Auth Routes
app.post('/signup', signUp)
app.post('/login', login)

// User Routes
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)

export default app
