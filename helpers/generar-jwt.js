import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

//TODO UID identificador unico del usuario
export const generarJWT = ( uid = '' ) => {
    return new Promise((resolve, reject) => {
        
        const payload = { uid };
        const secretKey = process.env.SECRETORPRIVATEKEY;

        jwt.sign( payload, secretKey, {
            expiresIn: '4h',
        }, (err, token ) => {
            if ( err ) {
                console.log( err );
                reject( 'No se pudo generar el token' );
            } else {
                resolve( token );
            }
        });


    });
};