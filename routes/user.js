import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

import { emailExiste, esRolValido, existeUsuarioPorId,  }from "../helpers/db-validators.js";

import { usuariosGet, 
         usuariosPut, 
         usuariosPost,
         usuariosDelete,
         usuariosPatch,} from "../controllers/user.js";

const router = Router(); 

router.get('/', usuariosGet );

router.put('/:id',[
    check('id').custom( existeUsuarioPorId ),
    check('id', 'No es un ID valido').isMongoId(),
    check('rol',).custom( esRolValido ),
    validarCampos,
], usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol',).custom( esRolValido ),
    validarCampos
], usuariosPost );

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch);

export default router;

