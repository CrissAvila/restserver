import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";

import { googleSingIn, loginAuth } from "../controllers/auth.js";

const routerAuth = Router();

routerAuth.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], loginAuth );

routerAuth.post('/google', [
    check('id_token', 'id_token de google es necesario').not().isEmpty(),
    validarCampos
], googleSingIn );

export default routerAuth;



