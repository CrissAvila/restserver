import { request, response } from "express";
import { isValidObjectId } from "mongoose";
import Usuario from "../models/usuario.js";

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = isValidObjectId( termino ); //true
    
    if ( esMongoID ) {
        const usuario = await Usuario.findById( termino );
        res.json({ 
            results: ( usuario ) ? [ usuario ] : []
        })
    }
};

export const buscar = ( req = request, res = response ) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion )) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${ coleccionesPermitidas }`
        })
    }

    switch ( coleccion ) {
        case 'usuarios':
            buscarUsuarios( termino, res);
            break;
        case 'categorias':

            break;
        case 'productos':
            
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }

};