import express from 'express'
import { profileController, loginController, registerController } from '../controllers/users.controller.js'

const routes = express.Router()

routes.post('/profile', profileController)
routes.post('/login', loginController)
routes.post('/register', registerController)

export default routes