import express from 'express'
import {
    signUp,
    login,
    uploadImage,
    getAuthenticatedUser,
} from '../controllers'

const indexRouter = express.Router()

indexRouter.post('/signup', signUp)
indexRouter.post('/login', login)
indexRouter.post('/user/image', uploadImage)
indexRouter.get('/user', getAuthenticatedUser)

export default indexRouter
