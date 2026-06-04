import { validateToken } from "../services/token.service.js";


export function authMiddleware(req, res, next) {
    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).send("token requerido")
        }

        const token = req.headers.authorization.replace("Bearer ", "")
        const verifiedToken = validateToken(token)

        next()
    } catch (e) {
        res.status(401).send("token invalido")
    }
}

export function adminMiddleware(req, res, next) {
    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).send("token requerido")
        }

        const token = req.headers.authorization.replace("Bearer ", "")
        const verifiedToken = validateToken(token)

        console.log("verificar", verifiedToken)
        if (verifiedToken.rol === "admin") {
            next()
        } else {
            res.status(401).send("Usuario invalido")
        }
    } catch (e) {
        res.status(401).send("token invalido")
    }
}