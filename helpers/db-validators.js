import mongoose from "mongoose";
import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

export const esRolValido = async ( rol = '' ) => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta registrado en la DB`)
    }
};

export const emailExiste = async(correo = '') => {
    
    const validacionCorreo = await Usuario.findOne({ correo });
    if ( validacionCorreo ) {
       throw new Error (`El correo ${ correo }, ya esta registrado`);
    };

}

export const existeUsuarioPorId = async (id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
            const existeUsuario = await Usuario.findById(id);

        if ( !existeUsuario ) {
                throw new Error(`El usuario con ID: '${id}' no existe en la DB`);
            }
        
        } 
};

