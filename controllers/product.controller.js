import { productViewService, productUploadService } from "../services/product.service.js";


export async function productViewController(req, res) {
    try {
        const result = await productViewService();

        return res.status(result.status).send(result);

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