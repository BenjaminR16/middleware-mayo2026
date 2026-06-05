import express, { Router } from 'express'
import { authMiddleware, adminMiddleware } from '../middleware/aunth.middleware.js'
import { productViewController, uploadProductController, productUpdateController, productRemoveController } from '../controllers/product.controller.js'

const routes = express.Router()

routes.get('/view-products', productViewController)
routes.post('/new-product', authMiddleware, adminMiddleware, uploadProductController,)
routes.post('/update-product', authMiddleware, adminMiddleware, productUpdateController)
routes.post('/remove-product', authMiddleware, adminMiddleware, productRemoveController)

export default routes