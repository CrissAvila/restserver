import { request, response } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";


export const usuariosGet = (req = request , res = response) => {
    
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit,
    })
}

export const usuariosPut = (req = request , res = response) => {
    
    const { id } = req.params;

    res.json({
        msg: 'put API - controlador',
        id,
    })
}

export const usuariosPost = async (req = request , res = response) => {

    const { nombre, correo, password, rol } = req.body;
    //creacion de la instancia 
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptar la contraseña (HASH)
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt );

    //grabar registro
    await usuario.save();

    res.json({
        usuario,
    })
}

export const usuariosDelete = (req = request , res = response) => {
    
    res.json({
        msg: 'delete API - controlador',
    })
}

export const usuariosPatch = (req = request , res = response) => {
    
    res.json({
        msg: 'patch API - controlador',
    })
}


