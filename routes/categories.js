import { Router, request, response } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { ObtenerCategorias,
         crearCategoria } from "../controllers/categories.js";


const routerCategories = Router();

/**
 * {{url}}/api/categories
 */

// Obtener todas las categorias - publico 
routerCategories.get('/', ObtenerCategorias
);

// Obetener una categoria por id - publico 
routerCategories.get('/:id', (req = request , res = response ) => {
    res.json('get - categoria por id');
});

// Crear Categoria - privado - cualqueir rol
routerCategories.post('/', [ 
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
        validarCampos,
    ], crearCategoria );

// Actualizar - privado - cualquiera con tokn valido
routerCategories.put('/:id', (req = request , res = response ) => {
    res.json('put - actualizar categoria');
});

// Borrar una categoria - Admin
routerCategories.delete('/:id', (req = request , res = response ) => {
    res.json(' delete - borrar categoria');
});

export default routerCategories;

