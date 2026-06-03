import { validateToken } from "../services/token.service.js";

export function authMiddleware(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send("token invalido")
        }

        const token = req.headers.authorization.replace("Bearer ", "")
        const verifiedToken = validateToken(token)

        req.user = verifiedToken

        next()
    } catch (e) {
        return res.status(401).send("token invalido2")
    }
}