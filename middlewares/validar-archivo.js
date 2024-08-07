import { request, response } from "express";


export const validarArchivoSubir = (req = request, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({
            msg: 'No Archivos en la peticion - validarArchivoSubir' 
        });
    }

    next();
}

