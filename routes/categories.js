import { Router, request, response } from "express";
import { check } from "express-validator";

import { esAdminRole } from "../middlewares/validar-roles.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {  crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria} from "../controllers/categories.js";

import { existeCategoriaPorId } from "../helpers/db-validators.js";


const routerCategories = Router();

/**
 * {{url}}/api/categories
 */

// Obtener todas las categorias - publico 
routerCategories.get('/', obtenerCategorias );

// Obetener una categoria por id - publico 
routerCategories.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], obtenerCategoria );

// Crear Categoria - privado - cualqueir rol
routerCategories.post('/', [ 
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
        validarCampos,
    ], crearCategoria );

// Actualizar - privado - cualquiera con tokn valido
routerCategories.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('id').custom( existeCategoriaPorId ),
        validarCampos,
    ], actualizarCategoria);

// Borrar una categoria - Admin
routerCategories.delete('/:id', [
        validarJWT,
        esAdminRole,
        check('id', 'No es un id de Mongo valido').isMongoId(),
        check('id').custom( existeCategoriaPorId ),
        validarCampos,
    ], borrarCategoria );

export default routerCategories;

