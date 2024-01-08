import { request, response } from "express";


//para forzar a que sea administrador
export const esAdminRole = (req = request, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: "se quiere verificar el role sin validar el token primero",
        })
    }

    const { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - no puedo hacer esto`,
        })
    }

    next();

}

//se usa operador Rest para unificar los argumentos que se envien en un arrglo
// este middlewares se usa para tener varios tipos de rol que puedan hacer cambios
export const tieneRole = ( ...restoRoles ) => {

    return (req = request, res = response, next) => {
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: "se quiere verificar el role sin validar el token primero",
            });
        };

        if (!restoRoles.includes( req.usuario.rol )) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ restoRoles }`
            });
        };


        next();
    }

}