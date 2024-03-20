import { request, response } from "express";
import Categoria from "../models/categoria.js";

//Obtener Categorias - paginado - total - populate 
export const obtenerCategorias = async( req = request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const estadoQuery = { estado: true }
   
    //Coleccion de promesas, para ejecutar promesas de forma simultanea 
    const [ totalUsuarios, categorias ] = await Promise.all([
        Categoria.countDocuments( estadoQuery ),
        Categoria.find( estadoQuery )
            .populate('usuario', 'nombre')
            .skip( desde )
            .limit( limite )
    ]);

    res.json({
        totalUsuarios,
        usuarios: categorias
    })
}

//ObtenerCategoria - populate}
export const obtenerCategoria = async( req = request, res = response ) => {
    const { id } = req.params;
    const categoria = await Categoria.findById( id )
                                    .populate('usuario', 'nombre');

    res.json( categoria );
} 


// Crear Categoria
export const crearCategoria = async( req = request, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })

    }

    //generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoriaNueva = new Categoria( data );
    
    //Guardar categoria en DB
    await categoriaNueva.save();

    res.status(201).json( categoriaNueva );
};

// Actualizar Categoria 
export const actualizarCategoria = async( req = request, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data  } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true });

    res.json ( categoria );
};

// Borrar Categoria - estado : false 

export const borrarCategoria = async( req = request, res = response ) => {
    
    const { id } = req.params;
    const borrarCategoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true });

    res.json( borrarCategoria );
}