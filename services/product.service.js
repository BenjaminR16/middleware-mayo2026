import model from "../models/product.model.js";
import userModel from "../models/users.model.js"
import bcrypt from 'bcrypt'

export async function productViewService() {
    const productDb = model()

    const products = await productDb.find()

    return {
        status: 200,
        message: "Productos obtenidos correctamente",
        data: products
    }
}

export async function productUploadService(email, password, nombre, descripcion, precio) {
    try {
        const findUser = await userModel().findOne({ email })
        //verificar la contrasena tambien no solo el usuario
        if (!findUser) {
            return {
                status: 400,
                message: "usuario no encontrado"
            }
        }

        const comparePass = await bcrypt.compare(password, findUser.password)
        if (!comparePass) {
            return {
                status: 400,
                message: "Usuario o clave incorrectos"
            }
        }

        //comprueba el rol del usuario 
        if (findUser.rol !== 'admin') {
            return {
                status: 400,
                message: "No tienes privilegios de admin"
            }
        }

        await model().insertOne({ nombre, descripcion, precio })
        return {
            status: 200,
            message: "Producto creado"
        }
    } catch (error) {
        return {
            status: 400,
            message: "Error al crear el producto"
        }
    }
}

export async function productUpdateService(email, password, nombre, newNombre, newDescription, newPrice) {
    try {
        const findUser = await userModel().findOne({ email })
        //verificar la contrasena tambien no solo el usuario
        if (!findUser) {
            return {
                status: 400,
                message: "usuario no encontrado"
            }
        }

        const comparePass = await bcrypt.compare(password, findUser.password)
        if (!comparePass) {
            return {
                status: 400,
                message: "Usuario o clave incorrectos"
            }
        }

        //comprueba el rol del usuario 
        if (findUser.rol !== 'admin') {
            return {
                status: 400,
                message: "No tienes privilegios de admin"
            }
        }

        await model().updateOne({ nombre }, { descripcion: newDescription, precio: newPrice },)
        return {
            status: 200,
            message: "Producto actualizado actualizado"
        }

    } catch (error) {
        return {
            status: 400,
            message: "Error al crear el producto"
        }
    }
}

export async function productRemoveService(email, password, nombre) {
    try {
        const findUser = await userModel().findOne({ email })

        if (!findUser) {
            return {
                status: 400,
                message: "usuario no encontrado"
            }
        }

        const comparePass = await bcrypt.compare(password, findUser.password)
        if (!comparePass) {
            return {
                status: 400,
                message: "Usuario o clave incorrectos"
            }
        }

        //comprueba el rol del usuario 
        if (findUser.rol !== 'admin') {
            return {
                status: 400,
                message: "No tienes privilegios de admin"
            }
        }

        await model().deleteOne({ nombre })

    } catch (error) {
        return {
            status: 400,
            message: "Error al crear el producto"
        }
    }
}