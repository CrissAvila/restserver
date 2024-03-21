import mongoose from "mongoose";
import Role from "../models/role.js";
import Usuario from "../models/usuario.js";
import Categoria from "../models/categoria.js";
import Producto from "../models/producto.js";

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
        const existeCategoria = await Usuario.findById(id);

        if ( !existeCategoria ) {
                throw new Error(`El usuario con ID: '${id}' no existe en la DB`);
            }
        
    } 
};

// estos son validadores personalizados sobre categorias 
export const existeCategoriaPorId = async ( id ) => {
    
    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria ) {
            throw new Error(`El id no existe ${ id }`);
    }
};

// estos son validadores personalizados sobre productos
export const existeProductoPorId = async ( id ) => {
    
    const existeProducto = await Producto.findById( id );
    if ( !existeProducto ) {
            throw new Error(`El id no existe ${ id }`);
    }
};




