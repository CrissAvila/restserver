import { request, response } from "express";
import bcryptjs from "bcryptjs";

import Usuario from "../models/usuario.js";


export const usuariosGet = async (req = request , res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const estadoQuery = { estado: true }
   
    //Coleccion de promesas, para ejecutar promesas de forma simultanea 
    const [ totalUsuarios, usuarios ] = await Promise.all([
        Usuario.countDocuments( estadoQuery ),
        Usuario.find( estadoQuery )
        .skip( desde )
        .limit( limite ),
    ]);

    res.json({
        totalUsuarios,
        usuarios
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

export const usuariosPut = async(req = request , res = response) => {
    
    const id = req.params.id;
    const { _id ,password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if ( password ) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto, { new: true});

    res.json(usuario)
}


export const usuariosDelete = async(req = request , res = response) => {
    
    const { id } = req.params;

    //Borrar fisicamente un Usuario en DB
    //TODO const borrarUsuario = await Usuario.findByIdAndDelete(id);

    //Borrar usuario cambiando el estado en DB
    const borrarUsuario = await Usuario.findByIdAndUpdate( id, { estado: false });
 
    res.json({
        msg: `Se Elimino el usuario correctamente(estado:false)`, 
        borrarUsuario,
    })
}

export const usuariosPatch = (req = request , res = response) => {
    
    res.json({
        msg: 'patch API - controlador',
    })
}


