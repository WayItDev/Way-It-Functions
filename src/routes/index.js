import express from 'express'
import { signUp, login } from '../controllers'

const indexRouter = express.Router()

indexRouter.post('/signup', signUp)
indexRouter.post('/login', login)

export default indexRouter
