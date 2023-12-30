import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

export const esRolValido = async ( rol = '' ) => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta registrado en la DB`)
    }
};

export const emailExiste = async( correo = ' ') => {
    
    const validacionCorreo = await Usuario.findOne({ correo });
    if ( validacionCorreo ) {
       throw new Error (`El correo ${ correo }, ya esta registrado`);
    };

}

