import model from "../models/users.model.js";
import bcrypt from 'bcrypt'
import { createToken } from "./token.service.js";

export function userService() {
    return model
}

export async function userRegisterService(nombre, password, email, rol) {
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

        await model().insertOne({ nombre, password: hash, email, rol })
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
    // return await model().insertOne({ nombre, password, email })
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

    const token = createToken(findUser.nombre, findUser.email, findUser.rol)
    return {
        status: 200,
        message: { status: "ok", message: "login correcto", token }
    }
}

export async function userProfileService(email) {
    return await model().findOne({ email })
}

export async function userUpdateService(email, password, newPassword) {
    const findUser = await model().findOne({ email })

    if (!findUser) {
        return {
            status: 400, //buscar codigo de usuario no encontrado
            message: "Usuario no encontrado"
        }
    }

    const hasPass = await bcrypt.compare(password, findUser.password)

    if (!hasPass) {
        return {
            status: 400,
            message: "Clave incorrectos"
        }
    }

    // console.log(password, "nueva: " + newPassword)
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const newHash = bcrypt.hashSync(newPassword, salt)

    await model().updateOne({ email }, { password: newHash })

    return {
        status: 200,
        message: "Contrasena actualizada"
    }
}

export async function userDeleteService(email, password) {
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
    // console.log("Usuario eliminado:", email)
    await model().deleteOne({ email })

    return {
        status: 200,
        message: "Usuario eliminado"
    }

}

