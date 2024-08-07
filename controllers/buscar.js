import { request, response } from "express";
import { isValidObjectId } from "mongoose";
import Usuario from "../models/usuario.js";
import Categoria from "../models/categoria.js";
import Producto from "../models/producto.js";


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
        });
    }

    const regex = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]

    });

    res.json( { 
        results: usuarios
    });

};

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoID = isValidObjectId( termino ); //true
    
    if ( esMongoID ) {
        const categoria = Categoria.findById( termino );
        res.json({ 
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const categorias = await Categoria.find ({ nombre: regex, estado: true });

    res.json( { 
        results: categorias
    });

};

const buscarProducto = async( termino = '', res = response ) => {

    const esMongoID = isValidObjectId( termino ); //true
    
    if ( esMongoID ) {
        const producto = Producto.findById( termino );
        res.json({ 
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const productos = await Producto.find ({ nombre: regex, estado: true })
                .populate('categoria', 'nombre')

    res.json( { 
        results: productos
    });

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
            buscarCategorias( termino, res );
            break;
        case 'productos':
            buscarProducto( termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }

};