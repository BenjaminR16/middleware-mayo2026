import { userRegisterService, userProfileService, userLoginService, userUpdateService, userDeleteService } from "../services/users.service.js";

export async function usersController(req, res) {
    res.status(200).send(userRegisterService());
}

export async function registerController(req, res) {
    const { nombre, password, email } = req.body;

    //  Agregado el await
    const newUser = await userRegisterService(nombre, password, email);

    res.status(newUser.status).send(newUser.message);
}

export async function loginController(req, res) {
    try {
        const { password, email } = req.body;

        //  Agregado el await
        const newUser = await userLoginService(password, email);

        res.status(201).send(newUser);
    } catch (error) {
        // Es buena práctica manejar el error (por ejemplo, si el email ya existe)
        res.status(400).send({ error: error.message });
    }
}

export async function profileController(req, res) {
    res.send(await userProfileService(req.body.email));
}

export async function updateController(req, res) {
    const { password, newPassword } = req.body
    const email = req.user.email

    const update = await userUpdateService(email, password, newPassword)

    res.status(update.status).send(update)
}

export async function deleteController(req, res) {
    const { password } = req.body
    const email = req.user.email
    const deleteUser = await userDeleteService(email, password)
    res.status(deleteUser.status).send(deleteUser)
}

