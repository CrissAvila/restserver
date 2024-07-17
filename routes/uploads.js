import { Router } from "express";
import { check } from "express-validator";

import { validarArchivoSubir } from "../middlewares/validar-archivo.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";


const routerUploads = Router();

routerUploads.post('/', validarArchivoSubir, cargarArchivo);

routerUploads.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios', 'productos'])),
    validarCampos,
], actualizarImagenCloudinary )

routerUploads.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios', 'productos'])),
    validarCampos,
], mostrarImagen )


export default routerUploads;



