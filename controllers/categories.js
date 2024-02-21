import { request, response } from "express";
import Categoria from "../models/categoria.js";

//Obtener Categorias - paginado - total - populate 
export const ObtenerCategorias = async( req = request, res = response ) => {

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

//ObtenerCategoria - populate 

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

// Borrar Categoria - estado : false 
