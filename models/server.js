import express from "express";
import cors from "cors";

import routerAuth from "../routes/auth.js";
import routerCategories from "../routes/categories.js";
import routerProductos from "../routes/productos.js";
import router from "../routes/user.js";

import { dbConection } from "../database/config.js";
import dotenv from 'dotenv';

dotenv.config();

export class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;

        //Paths
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categoriesPath = '/api/categories'
        this.productosPath = '/api/productos'

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
    }

    // METODOS
    async conectarDB() {
        await dbConection();
    }

    routes() {
        const usarRoutes = router;
        const usarRoutesAuth = routerAuth;
        const usarRoutesCategories = routerCategories;
        const usarRoutesProductos = routerProductos;

        this.app.use( this.authPath, usarRoutesAuth);
        this.app.use( this.usuariosPath, usarRoutes);
        this.app.use( this.categoriesPath, usarRoutesCategories);
        this.app.use( this.productosPath, usarRoutesProductos);

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el PUERTO: ${ this.port }`);
        });
    }
}