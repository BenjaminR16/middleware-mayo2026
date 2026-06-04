import jwt from 'jsonwebtoken'
import 'dotenv/config'

//creamos el token y anadi el rol 
export function createToken(nombre, email, rol) {
    const token = jwt.sign({ nombre, email, rol }, process.env.tokenKey, { expiresIn: '1d' })
    return token
}

export function validateToken(token) {
    const tokenValidated = jwt.verify(token, process.env.tokenKey)
    console.log(tokenValidated)
    return tokenValidated
}