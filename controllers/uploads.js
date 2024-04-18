import { request, response } from "express";
import {subirArchivo }from "../helpers/subir-archivo.js";
import Usuario from "../models/usuario.js";
import Producto from "../models/producto.js";


    export const cargarArchivo = async( req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        res.status(400).json({
            msg: 'No Archivos en la peticion'})
        return;
    }

    try {

        //text, md 
        // const pathArchivo = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
        
        //Formato imageness
        const pathArchivo = await subirArchivo( req.files, undefined, 'imagenes' );
        
        res.json({
            nombre: pathArchivo
        })
        
    } catch (msg) {
        res.status(400).json({ msg });
    }
    

 }

    export const actualizarImagen = async( req = request, res = response ) => {

        const { id, coleccion } = req.params;

        let model;

        switch ( coleccion ) {
            case 'usuarios':
                model = await Usuario.findById( id );
                if ( !model ) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el id ${ id }`
                    })
                }


                break;
            case 'productos':
                model = await Producto.findById( id );
                if ( !model ) {
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${ id }`
                    })
                }
                

                break;

            default:
                return res.status(500).json({
                 msg: 'Se me olvido validar esto'
             })
            
        }

        const pathArchivo = await subirArchivo( req.files, undefined, coleccion );
        model.img = pathArchivo;

        await model.save();

        res.json( model )

 }