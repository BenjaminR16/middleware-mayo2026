import { model } from "../models/product.model.js";
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