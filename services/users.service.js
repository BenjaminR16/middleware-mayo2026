import { model } from "../models/users.model.js";
import bcrypt, { hash } from 'bcrypt'
import { createToken } from "./token.service.js";

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

        //salt dice las veces que se encripta y hash es donde encriptamos 
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

export async function userLoginService(password, email) {
    const findUser = await model().findOne({ email })

    if (!findUser) {
        return {
            status: 400,
            message: "Clave o correo incorrectos"
        }
    }

    const hasPass = await bcrypt.compare(password, findUser.password)

    if (!hasPass) {
        return {
            status: 400,
            message: "Clave o correo incorrectos"
        }
    }

    const token = createToken(findUser.nombre, findUser.email)
    return {
        status: 400,
        message: { status: "ok", message: "login correcto", token }
    }
}

export async function userProfileService(email) {
    return await model().findOne({ email })
}