import { Router, request, response } from "express";
import { check } from "express-validator";

import { esAdminRole } from "../middlewares/validar-roles.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {  crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto} from "../controllers/productos.js";

import { existeCategoriaPorId, existeProductoPorId } from "../helpers/db-validators.js";


const routerProductos = Router();

/**
 * {{url}}/api/productos
 */

// Obtener todos los productos - publico 
routerProductos.get('/', obtenerProductos );

// Obetener un Producto por id - publico 
routerProductos.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], obtenerProducto );

// Crear producto - privado - cualqueir rol
routerProductos.post('/', [ 
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
        check('categoria', 'No es un id de MongoDB').isMongoId(),
        check('categoria').custom( existeCategoriaPorId ), 
        validarCampos,
    ], crearProducto );

// Actualizar producto - privado - cualquiera con tokn valido
routerProductos.put('/:id', [
        validarJWT,
        // check('categoria', 'No es un id de MongoDB').isMongoId(),
        check('id').custom( existeProductoPorId ),
        validarCampos,
    ], actualizarProducto );

// Borrar un producto - Admin
routerProductos.delete('/:id', [
        validarJWT,
        esAdminRole,
        check('id', 'No es un id de Mongo valido').isMongoId(),
        check('id').custom( existeProductoPorId ),
        validarCampos,
    ], borrarProducto );

export default routerProductos;

