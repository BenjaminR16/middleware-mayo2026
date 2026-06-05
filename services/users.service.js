import model from "../models/user.supabase.model.js";
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
    const user = await verifyUser(email, password)
    console.log(user)
    if (!user) {
        return {
            status: 400,
            message: "No autorizado"
        };
    }

    const token = createToken(user.nombre, user.email, user.rol)
    return {
        status: 200,
        message: { status: "ok", message: "login correcto", token }
    }
}

export async function userProfileService(email) {
    return await model().findOne({ email })
}

export async function userUpdateService(email, password, newPassword) {
    const user = await verifyUser(email, password)
    if (!user) {
        return {
            status: 400,
            message: "No autorizado"
        };
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
    const user = await verifyUser(email, password)
    if (!user) {
        return {
            status: 400,
            message: "No autorizado"
        };
    }
    // console.log("Usuario eliminado:", email)
    await model().deleteOne({ email })

    return {
        status: 200,
        message: "Usuario eliminado"
    }

}

export async function verifyUser(email, password) {
    const findUser = await model().findOne({ email })
    //verificar la contrasena tambien no solo el usuario
    if (!findUser) {
        return {
            status: 400,
            message: "usuario no encontrado"
        }
    }
    return findUser
    // const comparePass = await bcrypt.compare(password, findUser.password)
    // if (!comparePass) {
    //     return {
    //         status: 400,
    //         message: "Usuario o clave incorrectos"
    //     }
    // }

    // //comprueba el rol del usuario 
    // if (findUser.rol !== 'admin') {
    //     return {
    //         status: 400,
    //         message: "No tienes privilegios de admin"
    //     }
    // }

}