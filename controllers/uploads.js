import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
cloudinary.config( process.env.CLOUDINARY_URL ); 

import { request, response } from "express";
import {subirArchivo }from "../helpers/subir-archivo.js";

import Usuario from "../models/usuario.js";
import Producto from "../models/producto.js";

// Convertir la URL del módulo en una ruta de archivo
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo
const __dirname = path.dirname( __filename );

    export const cargarArchivo = async( req = request, res = response) => {

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

//     export const actualizarImagen = async( req = request, res = response ) => {
        
//         const { id, coleccion } = req.params;

//         let model;

//         switch ( coleccion ) {
//             case 'usuarios':
//                 model = await Usuario.findById( id );
//                 if ( !model ) {
//                     return res.status(400).json({
//                         msg: `No existe un usuario con el id ${ id }`
//                     })
//                 }


//                 break;

//             case 'productos':
//                 model = await Producto.findById( id );
//                 if ( !model ) {
//                     return res.status(400).json({
//                         msg: `No existe un producto con el id ${ id }`
//                     })
//                 }
                

//                 break;

//             default:
//                 return res.status(500).json({
//                  msg: 'Se me olvido validar esto'
//              })
            
//         }

//         //limpiar imagenes previas
//         if ( model.img ) {
//             // Hay que borrar la imagen del servidor
//             const pathImagen = path.join( __dirname, '../uploads', coleccion, model.img );
//             if ( fs.existsSync( pathImagen ) ) {
//                 fs.unlinkSync( pathImagen );
//             }
//         }

//         const pathArchivo = await subirArchivo( req.files, undefined, coleccion );
//         model.img = pathArchivo;

//         await model.save();

//         res.json( model )

//  }
    
export const actualizarImagenCloudinary = async( req = request, res = response ) => {
        
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

    //limpiar imagenes previas
    if ( model.img ) {
        const nombreArr = model.img.split('/');
        const nombre = nombreArr[ nombreArr.length - 1 ];   
        const [ public_id ] = nombre.split('.');

        cloudinary.uploader.destroy( public_id );

    }

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    model.img = secure_url;

    await model.save();

    res.json( model );

}

    export const mostrarImagen = async( req = request, res = response ) => {
         
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

        //limpiar imagenes previas
        if ( model.img ) {
            // Hay que borrar la imagen del servidor
            const pathImagen = path.join( __dirname, '../uploads', coleccion, model.img );
            if ( fs.existsSync( pathImagen ) ) {
                return res.sendFile( pathImagen );
            }
        }

        //Si no existe imagen, regresamos por defecto 
        const pathImagenDefault = path.join( __dirname, '../assets/no-image.jpg');
        res.sendFile( pathImagenDefault );

    }