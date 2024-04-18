import express from "express";
import cors from "cors";

import routerAuth from "../routes/auth.js";
import routerBuscar from "../routes/buscar.js";
import routerCategories from "../routes/categories.js";
import routerProductos from "../routes/productos.js";
import router from "../routes/user.js";

import { dbConection } from "../database/config.js";
import dotenv from 'dotenv';
import routerUploads from "../routes/uploads.js";
import fileUpload from "express-fileupload";

dotenv.config();

export class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;

        //Paths
        this.authPath =       '/api/auth';
        this.buscarPath =     '/api/buscar';
        this.categoriesPath = '/api/categories';
        this.productosPath =  '/api/productos';
        this.usuariosPath =   '/api/usuarios';
        this.uploadsPath =    '/api/uploads';

        //Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();

    }

    // Middlewares
    middlewares() {

        //CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio Publico
        this.app.use( express.static('public') );

        // Fileupload - carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true,
            
        }));


    }

    // METODOS
    async conectarDB() {
        await dbConection();
    }

    routes() {
        const usarRoutesAuth = routerAuth;
        const usarRoutesBuscar = routerBuscar;
        const usarRoutesCategories = routerCategories;
        const usarRoutes = router;
        const usarRoutesProductos = routerProductos;
        const usarRoutesUploads = routerUploads;

        this.app.use( this.authPath, usarRoutesAuth);
        this.app.use( this.buscarPath, usarRoutesBuscar );
        this.app.use( this.categoriesPath, usarRoutesCategories);
        this.app.use( this.productosPath, usarRoutesProductos);
        this.app.use( this.usuariosPath, usarRoutes);
        this.app.use( this.uploadsPath, usarRoutesUploads);

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el PUERTO: ${ this.port }`);
        });
    }
}