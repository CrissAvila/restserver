import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";
import { emailExiste, esRolValido,  }from "../helpers/db-validators.js";

import { usuariosGet, 
         usuariosPut, 
         usuariosPost,
         usuariosDelete,
         usuariosPatch,} from "../controllers/user.js";

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol',).custom( esRolValido ),
    validarCampos
], usuariosPost );

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

export default router;

