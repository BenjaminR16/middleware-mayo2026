import express from 'express'
import { authMiddleware } from '../middleware/aunth.middleware.js'
import { profileController, loginController, registerController, updateController, deleteController } from '../controllers/users.controller.js'

const routes = express.Router()

routes.post('/profile', authMiddleware, profileController)
routes.post('/login', loginController)
routes.post('/register', registerController)
routes.post('/update', authMiddleware, updateController)
routes.post('/delete', authMiddleware, deleteController)

export default routes

