import { request, response } from "express";

export const cargarArchivo = ( req = request, res = response) => {

    res.json({
        msg: "Validacion respuesta cargarArchivos"
    })


}