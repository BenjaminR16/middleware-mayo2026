import model from "../models/product.model.js";
import userModel from "../models/users.model.js"
import { verifyUser } from "./users.service.js";
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

        const user = await verifyUser(email, password)
        if (!user) {
            return {
                status: 400,
                message: "No autorizado"
            };
        }

        await model().insertOne({ nombre, descripcion, precio })
        return {
            status: 200,
            message: "Producto creado"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Error al crear el producto",
            error: error.message
        }
    }
}

export async function productUpdateService(email, password, nombre, newNombre, newDescription, newPrice) {
    try {
        const user = await verifyUser(email, password)
        if (!user) {
            return {
                status: 400,
                message: "No autorizado"
            };
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
        const user = await verifyUser(email, password)
        if (!user) {
            return {
                status: 400,
                message: "No autorizado"
            };
        }

        await model().deleteOne({ nombre })

    } catch (error) {
        return {
            status: 400,
            message: "Error al crear el producto"
        }
    }
}