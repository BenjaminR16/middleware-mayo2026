import { productViewService, productUploadService, productRemoveService, productUpdateService } from "../services/product.service.js";

/**
 * cambiar estados 
 */

export async function productViewController(req, res) {
    try {
        const result = await productViewService();
        res.status(result.status).send(result);

    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: "Error al obtener productos",
            error: error.message
        });
    }
}

export async function uploadProductController(req, res) {
    try {
        const { email, password, nombre, descripcion, precio } = req.body
        const upload = await productUploadService(email, password, nombre, descripcion, precio)
        res.status(upload.status).send(upload)

    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: "Error al obtener productos",
            error: error.message
        });
    }
}

export async function productUpdateController(req, res) {
    try {
        const { email, password, nombre, newNombre, newDescription, newPrice } = req.body
        const uodateProduct = await productUpdateService(email, password, nombre, newNombre, newDescription, newPrice)
        res.status(uodateProduct.status).send(uodateProduct)
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: "Error al obtener productos",
            error: error.message
        });
    }
}

export async function productRemoveController(req, res) {
    try {
        const { email, password, nombre } = req.body
        const removeProduct = await productRemoveService(email, password, nombre)

    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: "Error al obtener productos",
            error: error.message
        });
    }
}