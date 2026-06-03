import express from 'express'
import { authMiddleware } from '../middleware/aunth.middleware.js'
import { productViewController } from '../controllers/product.controller.js'

const routes = express.Router()

routes.get('/view-products', productViewController)

export default routes