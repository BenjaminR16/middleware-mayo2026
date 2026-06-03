import { productViewService } from "../services/product.service.js";

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