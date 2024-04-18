import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";
import { actualizarImagen, cargarArchivo } from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";


const routerUploads = Router();

routerUploads.post('/', cargarArchivo);

routerUploads.put('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios', 'productos'])),
    validarCampos,
], actualizarImagen )



export default routerUploads;



