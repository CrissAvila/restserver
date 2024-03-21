import { request, response } from "express";
import Producto from "../models/producto.js";

//Obtener Productos- paginado - total - populate 
export const obtenerProductos = async( req = request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const estadoQuery = { estado: true }
   
    //Coleccion de promesas, para ejecutar promesas de forma simultanea 
    const [ totalUsuarios, productos ] = await Promise.all([
        Producto.countDocuments( estadoQuery ),
        Producto.find( estadoQuery )
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip( desde )
            .limit( limite )
    ]);

    res.json({
        totalUsuarios,
        productos
    })
}

//ObtenerProducto - populate}
export const obtenerProducto = async( req = request, res = response ) => {
    
    const { id } = req.params;
    const producto = await Producto.findById( id )
                                    .populate('usuario', 'nombre')
                                    .populate('categoria', 'nombre');

    res.json( producto );
} 

// Crear Producto
export const crearProducto = async( req = request, res = response ) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        })

    }

    //generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const productoNuevo = new Producto( data );
    
    //Guardar categoria en DB
    await productoNuevo.save();

    res.status(201).json( productoNuevo );
};

// Actualizar Producto
export const actualizarProducto = async( req = request, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data  } = req.body;
    
    if( data.nombre ){ 
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true });

    res.json ( producto );
};

// Borrar Producto - estado : false 

export const borrarProducto = async( req = request, res = response ) => {
    
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true });

    res.json( productoBorrado );
}