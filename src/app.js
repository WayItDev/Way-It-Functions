import logger from 'morgan'
import express from 'express'
import firebase from 'firebase'
import 'firebase/performance'
import cookieParser from 'cookie-parser'

import config from './util/config'
import indexRouter from './routes/index'

firebase.initializeApp(config)

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/v1', indexRouter)

export default app
