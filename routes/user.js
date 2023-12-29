import { Router } from "express";
import { usuariosGet, 
         usuariosPut, 
         usuariosPost,
         usuariosDelete,
         usuariosPatch,} from "../controllers/user.js";
import { check } from "express-validator";


const router = Router();

router.get('/', usuariosGet );

router.put('/:id', usuariosPut);

router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
], usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

export default router;

