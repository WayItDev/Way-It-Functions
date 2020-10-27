import logger from 'morgan'
import express from 'express'
import firebase from 'firebase'
import 'firebase/performance'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'

import {
    login,
    signUp,
    uploadImage,
    getAuthenticatedUser,
    getAllUsers,
    getUserDetails,
    addUserDetails,
    getAllRoutes,
    addRoute,
    getRoute,
    deleteRoute,
    addSettings,
    updateSettings,
    getSettings
} from './controllers'
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
app.disable('x-powered-by')

// Auth Routes
app.post('/signup', signUp)
app.post('/login', login)

// User Routes
app.post('/user/image', FBAuth, uploadImage)
app.post('/user/:username', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)
app.get('/users', FBAuth, getAllUsers)
app.get('/user/:username', FBAuth, getUserDetails)

// Routes Routes
app.get('/routes', getAllRoutes)
app.post('/route', FBAuth, addRoute)
app.get('/route/:id', getRoute)
app.delete('/route/:id', FBAuth, deleteRoute)

// Setting Routes
app.post('/settings/:username', FBAuth, addSettings)
app.put('/settings/:username', FBAuth, updateSettings)
app.get('/settings/:username', FBAuth, getSettings)

export default app
