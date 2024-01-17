import { request, response } from "express";
import bcryptjs from "bcryptjs";

import Usuario from "../models/usuario.js";

import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

export const loginAuth = async( req = request, res = response) => {

    const { correo, password } = req.body;

    try {
      
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

};

export const googleSingIn = async(req = request, res = response) => {

    const { id_token } = req.body;

    try {
        
        const { correo, nombre, img } = await googleVerify( id_token );
        
        //referencia verificar si el correo existe en DB
        let usuario = await Usuario.findOne({ correo }); 
        
        if ( !usuario ) {
            //Tengo que crearlo 
            const data = {
                nombre, 
                correo, 
                password: '123456',
                img,
                rol: "USER_ROLE",
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        //si el usuario en DB estado: false
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });

    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es valido'
        });
    };

};
