import express from 'express'
import cors from 'cors'
import userRoutes from "./routes/user.routes.js"
import 'dotenv/config'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/')

app.use('/user', userRoutes)

app.listen(port, () => {
    console.log(`Se encuentra en la url: http://localhost:${port}`)
})