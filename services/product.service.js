import { model } from "../models/product.supabase.model.js";
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
        const findUser = await model().findOne({ email })

        if (!findUser) {
            return {
                status: 400,
                message: "usuario no encontrado"
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