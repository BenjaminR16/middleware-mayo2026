import express from 'express'
import cors from 'cors'
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"
import 'dotenv/config'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/user', userRoutes)
app.use('/product', productRoutes)

app.listen(port, () => {
    console.log(`Se encuentra en la url: http://localhost:${port}`)
})