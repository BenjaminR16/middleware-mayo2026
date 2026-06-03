import jwt from 'jsonwebtoken'
import 'dotenv/config'

//creamos el token
export function createToken(nombre, email) {
    const token = jwt.sign({ nombre, email }, process.env.tokenKey)
    return token
}