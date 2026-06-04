import express from 'express'
import { authMiddleware, adminMiddleware } from '../middleware/aunth.middleware.js'
import { profileController, loginController, registerController, updateController, deleteController } from '../controllers/users.controller.js'

const routes = express.Router()

routes.post('/profile', authMiddleware, adminMiddleware, profileController)
routes.post('/login', loginController)
routes.post('/register', registerController)
routes.post('/update', authMiddleware, adminMiddleware, updateController)
routes.post('/delete', authMiddleware, adminMiddleware, deleteController)

export default routes

