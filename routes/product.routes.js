import express from 'express'
import { authMiddleware, adminMiddleware } from '../middleware/aunth.middleware.js'
import { productViewController, uploadProductController } from '../controllers/product.controller.js'

const routes = express.Router()

routes.get('/view-products', productViewController)
routes.post('/new-product', uploadProductController)

export default routes