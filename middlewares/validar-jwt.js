import { request, response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

import Usuario from "../models/usuario.js";

dotenv.config();


export const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    const secretOrPrivateKey = process.env.SECRETORPRIVATEKEY;

    if (!token) {
       return res.status(401).json({
            msg: "No existe un token en la peticion"
       }); 
    }

    try {

        const { uid } = jwt.verify( token, secretOrPrivateKey );

        //leer el usuario que corresponde al uid0
        const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status(401).json({
                msg: "Token no valido - usuario no existe en DB"
            });
        }

        // Verificar si el uid tiene estado true
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: "Token no valido - usuario con estado: false"
            })
        }
        
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token ingresado no es valido"
        });
    };



}