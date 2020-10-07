import express from 'express'
import { signUp, login, uploadImage } from '../controllers'

const indexRouter = express.Router()

indexRouter.post('/signup', signUp)
indexRouter.post('/login', login)
indexRouter.post('/user/image', uploadImage)

export default indexRouter
