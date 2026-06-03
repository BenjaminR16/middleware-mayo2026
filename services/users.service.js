import { model } from "../models/users.model.js";
import bcrypt, { hash } from 'bcrypt'

export function userService() {
    return model
}

export async function userRegisterService(nombre, password, email) {
    try {
        const emailExist = await model().findOne({ email })
        if (emailExist) {
            return {
                status: 409,
                message: "correo duplicado",
            }
        }

        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)

        await model().insertOne({ nombre, password: hash, email })
        return {
            status: 201,
            message: "usuario creado"
        }

    } catch (e) {
        return {
            status: 400,
            message: "error creando usuario",
        }
    }
    return await model().insertOne({ nombre, password, email })
}

export async function userProfileService(email) {
    return await model().findOne({ email })
}